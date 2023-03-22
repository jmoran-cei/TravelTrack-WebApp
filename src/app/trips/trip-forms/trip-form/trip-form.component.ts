import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, map, Observable, Subscription, take } from 'rxjs';
import { datesInOrderValidator } from 'src/app/forms';
import { DestinationsService } from 'src/app/forms/autocomplete/service/destinations.service';
import { NavigationService, Trip } from 'src/app/shared';
import { TripService } from '../../shared';
import { NewTripComponent } from '../../.';
import { AuthService, User, UserService } from 'src/app/shared';
import { UsernameValidator } from 'src/app/forms/validators/userExists.validator';
import { Member } from 'src/app/shared';

@Component({
  selector: 'app-trip-form',
  templateUrl: 'trip-form.component.html',
  styleUrls: ['trip-form.component.css'],
})
export class TripFormComponent implements OnInit, OnDestroy {
  // props in/out of parent component
  @Input() pageTitle!: string;
  @Output() changeTitle = new EventEmitter();
  pageTitleDefault!: string;
  @Input() isEditing!: boolean;
  @Input() existingTrip!: Trip;

  // component props
  submittedTrip!: Trip;
  tripForm!: FormGroup;
  title?: FormControl;
  details?: FormControl;
  startDate?: FormControl;
  endDate?: FormControl;
  datesGroup?: AbstractControl;
  formStatusSubscription?: Subscription;
  titleChangesSusbscription?: Subscription;
  destinationChangesSubscription?: Subscription;

  // varying destination alert message
  destinationAlertText?: string;

  // get destinations array
  get destinations(): FormArray {
    return <FormArray>this.tripForm.get('destinations');
  }
  // get members array
  get members(): FormArray {
    return <FormArray>this.tripForm.get('members');
  }

  constructor(
    private fb: FormBuilder,
    private tripComponent: NewTripComponent,
    private tripService: TripService,
    private destinationsService: DestinationsService,
    private auth: AuthService,
    private userService: UserService,
    public nav: NavigationService
  ) {}

  ngOnInit() {
    this.destinationsService.clearAllDestinations();
    this.pageTitleDefault = this.pageTitle;
    this.createFormControls();
    this.createForm();
    this.submittedTrip = this.initializeTrip();
    // if editing a trip, update form values according
    if (this.isEditing) this.setExistingTripValues();

    // when the user has changed the value of any field . .
    this.formStatusSubscription = this.tripForm.statusChanges.subscribe((v) => {
      // mark create-trip component as dirty for canDeactivate route guard (checkDirtyState) when form is first changed
      this.tripComponent.isDirty = this.tripForm.dirty;
    });

    // destination alerts
    this.destinationAlertText = 'Destination(s) is required.';
    this.destinationChangesSubscription =
      this.destinations.statusChanges.subscribe(() => {
        // set datesOrder validation alert message depending on whether there is a valid destination already added or not
        if (this.destinations.length < 2) {
          this.destinationAlertText = 'Destination(s) is required.';
        } else {
          this.destinationAlertText =
            'Destination is blank. Either provide a valid destination or remove it.';
        }
      });

    // when the user has changed the value of their trip title,
    // send the value to the parent component so it can be used to change the page title
    this.titleChangesSusbscription = this.title?.valueChanges.subscribe((v) =>
      this.changeTitle.emit(v)
    );
  }

  AfterViewInit() {
    if (this.isEditing) {
      // adjusting styling for existing destinations & members after DOM loads
      for (let i in this.existingTrip.destinations) {
        this.styleDivUnchangeable('destinations', parseInt(i));
      }
      for (let i in this.existingTrip.members) {
        this.styleDivUnchangeable('members', parseInt(i));
      }
    }
  }

  ngOnDestroy() {
    this.formStatusSubscription?.unsubscribe();
    this.titleChangesSusbscription?.unsubscribe();
    this.destinationChangesSubscription?.unsubscribe();
    this.destinationsService.clearAllDestinations();
  }

  // initialize non-duplicate controls
  createFormControls() {
    (this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])),
      (this.startDate = new FormControl(new Date(''), [
        Validators.required,
        Validators.pattern(
          '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))'
        ),
      ])),
      (this.endDate = new FormControl(new Date(''), [
        Validators.required,
        Validators.pattern(
          '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))'
        ),
      ])),
      (this.details = new FormControl(''));
  }

  // create intialization of entire form
  createForm() {
    this.tripForm = this.fb.group({
      title: this.title,
      details: this.details,
      datesGroup: this.fb.group(
        {
          startDate: this.startDate as FormControl,
          endDate: this.endDate as FormControl,
        },
        { validators: datesInOrderValidator }
      ),
      destinations: this.fb.array(
        [new FormControl('', Validators.required)],
        [Validators.required]
      ),
      members: this.fb.array([
        new FormControl(
          '',
          [],
          [UsernameValidator.createValidator(this.userService, false)]
        ),
      ]),
    });

    // set datesGroup short-hand prop
    this.datesGroup = this.tripForm.get('datesGroup')!;
  }

  // intialize new trip
  initializeTrip(): Trip {
    let id: number;

    // if edit form, set to pre-existing id, else let backend set Id
    if (this.isEditing) id = this.existingTrip.id;
    else id = 0;

    return {
      id: id,
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      destinations: [],
      members: [],
      details: '',
      imgURL: 'assets/images/trips/default.jpg',
      toDo: [],
      photos: []
    };
  }

  // populate form data for edit trip form
  setExistingTripValues() {
    this.title?.patchValue(this.existingTrip.title);
    this.startDate?.patchValue(this.formatDate(this.existingTrip.startDate));
    this.endDate?.patchValue(this.formatDate(this.existingTrip.endDate));
    this.updateExistingDestinations();
    this.updateExistingMembers();
    this.details?.patchValue(this.existingTrip.details);
  }

  // format date for setting pre-existing date values for edit trip
  formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  // adds the destination values to edit form
  updateExistingDestinations() {
    // remove first intitialized destination
    if (this.existingTrip.destinations.length > 0) {
      this.destinations.removeAt(0);
    }

    let i = 0;
    let lastDestination = this.existingTrip.destinations.length - 1;
    // for each existing destination, append it to the trip form's destinations form array
    for (let dest of this.existingTrip.destinations) {
      // set value as string
      let value =
        dest.country === 'United States'
          ? `${dest.city}, ${dest.region}, USA`
          : `${dest.city}, ${dest.country}`;

      // create form control, and append to destinations form array
      let destination = new FormControl(value, Validators.required);
      this.destinations.push(destination);

      // add destination to saved destination objects array to keep it updated as well
      this.destinationsService.addTempDestination(dest);
      // save all destinations except for the last one, it gets checked on submit
      if (i === lastDestination) continue;
      else this.destinationsService.saveDestination();
      i++;
    }
  }

  // adds the member values to edit form
  updateExistingMembers() {
    // remove first intitialized destination
    if (this.existingTrip.members.length > 0) {
      this.members.removeAt(0);
    }

    for (let member of this.existingTrip.members) {
      // create form control, and append to destinations form array
      let mem = new FormControl(member.username, Validators.required);
      this.members.push(mem);
    }
  }

  // I understand that this function has bad practice: manipulating DOM directly
  // It's tricky because it's manipulating styling of the form array duplicate inputs and duplicate surrounding div
  // I'll try to fix this implementation in the near future
  styleDivUnchangeable(fieldName: string, i: number) {
    // make input DISABLED and remove bottom border
    const fieldInput = document.getElementById(fieldName + i)!;
    fieldInput.setAttribute('disabled', 'disabled');
    fieldInput.style.borderBottomColor = 'transparent';

    // change div background and border of field
    let field = document.getElementById(fieldName + 'Field' + i)!;
    field.style.backgroundColor = '#e4e4f4';
    field.style.borderRadius = '10px';
  }

  // if user entered valid location but forgot to hit "add", add it for them on submit (to saved destinations objects [])
  checkLastDestination() {
    if (
      this.destinations.length >
      this.destinationsService.savedDestinations.length
    ) {
      this.destinationsService.saveDestination();
    }
  }

  // submit method
  onSubmit() {
    this.tripForm.markAllAsTouched();
    // members is optional , but still has validation per member
    // make sure all required and provided fields are valid
    if (this.tripForm.invalid && this.members.controls[0].value !== '') return;

    // double check that blank form array values aren't submitted,
    // and valid but not 'added' values are still added
    this.checkLastDestination();

    // assign values from user to new trip object
    this.setSubmittedTripValues();
  }

  // add trip on submit of NEW trip form
  addTrip() {
    // new trip post request
    this.tripService.createTrip(this.submittedTrip).subscribe((addedTrip) => {
      // deactivate route guard
      this.tripComponent.isDirty = false;
      //reroute to newly created trip
      this.nav.navigate([`/trips/${addedTrip.id}`]);
      this.destinationsService.clearAllDestinations();
    });
  }

  // update trip on submit of EDIT trip form
  updateTrip() {
    // new trip put request
    this.tripService.updateTrip(this.submittedTrip).subscribe((updatedTrip) => {
      // deactivate route guard
      this.tripComponent.isDirty = false;
      //reroute to newly created trip
      this.nav.navigate([`/trips/${updatedTrip.id}`]);
      this.destinationsService.clearAllDestinations();
    });
  }

  // cancel method
  cancel() {
    let path = '/trips';
    if (this.isEditing) {
      path = `/trips/${this.existingTrip.id}`
    }
    this.nav.navigate([path]);
  }

  deleteTrip() {
    // request confirmation
    if (
      confirm(`Are you sure you would like to permanently delete this trip?`)
    ) {
      // if confirmed, delete trip
      this.tripService
        .deleteTrip(this.existingTrip.id)
        .pipe(take(1))
        .subscribe(() => {
          this.nav.navigate(['/trips']);
        });
    }
  }

  // finalizing values as values for new trip
  setSubmittedTripValues() {
    this.submittedTrip.title = this.title?.value;
    this.submittedTrip.startDate = new Date(this.startDate?.value);
    this.submittedTrip.endDate = new Date(this.endDate?.value);
    this.submittedTrip.details = this.details?.value;

    // set destination values to equal the destination objects saved from destination service
    this.submittedTrip.destinations =
      this.destinationsService.savedDestinations;

    // user must be checked to be included as a member (in order to access the trip in the future)
    this.checkCurrentUserIsAMember();

    this.usernamesToUserObjects(this.members.value)
      .pipe(take(1))
      .subscribe((users) => {
        var submitMembers: Member[] = [];
        // map to be type Member instead of User (no password, )
        for (let user of users) {
          var member: Member = {
            username: user.username.toLowerCase(),
            firstName: user.firstName,
            lastName: user.lastName,
          };

          submitMembers.push(member);
        }
        this.submittedTrip.members = submitMembers as User[];

        // if edit form, keep trip properties that aren't edited in this form & update trip
        if (this.isEditing) {
          this.submittedTrip.toDo = this.existingTrip.toDo;
          this.submittedTrip.photos = this.existingTrip.photos;
          this.submittedTrip.imgURL = this.existingTrip.imgURL;
          this.updateTrip();
        } else {
          this.addTrip();
        }
      });
  }

  // for each provided username, perform getUser() and place the user object in a UserObjects Array
  usernamesToUserObjects(usernames: string[]): Observable<User[]> {
    return forkJoin(
      usernames
        .filter((username) => username.trim() !== '')
        .map((username) =>
          this.userService.getUser(username.trim().toLowerCase())
        )
    ).pipe(
      map((users) => users.filter((user): user is User => user !== undefined))
    );
  }

  // if they didn't include themselves as a member, then automatically add them as a trip member
  checkCurrentUserIsAMember(): void {
    var userIsMember = false;

    for (let member of this.members.value) {
      if (member.trim() === this.auth.getCurrentUser().username) {
        userIsMember = true;
      }
    }

    if (!userIsMember) {
      this.members.push(new FormControl(this.auth.getCurrentUser().username));
    }
  }

  // for tool tip when hoverover invalid submit
  // displays any current invalid fields
  findInvalidControls() {
    let str = 'Invalid field(s): ';
    const invalid = [];
    const controls = this.tripForm.controls;
    for (let name in controls) {
      if (controls[name].invalid) {
        if (name === 'datesGroup') {
          name = 'start/end date';
        }
        invalid.push(name);
        str += '\n\t' + name;
      }
    }
    return str;
  }
}
