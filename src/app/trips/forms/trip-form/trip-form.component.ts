import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from "ngx-google-places-autocomplete/objects/options/options";
import { Subscription } from 'rxjs';
import { datesInOrderValidator } from "../../shared";
import { CreateTripComponent } from "../create-trip/create-trip.component";

@Component({
  selector: 'trip-form',
  templateUrl: 'trip-form.component.html',
  styleUrls: ['trip-form.component.css']
})

export class TripFormComponent {
  // props in/out of parent component
  @Input() pageTitle!:string;
  @Output() onTitleChange = new EventEmitter();
  pageTitleDefault!:string;

  // component props
  tripForm!: FormGroup;
  title?:FormControl;
  details?:FormControl;
  startDate?: FormControl;
  endDate?: FormControl;
  datesGroup?: AbstractControl;
  formStatusSubscription?: Subscription;
  titleChangesSusbscription?: Subscription;
  destinationChangesSubscription?: Subscription;

  // varying destination alert message
  destinationAlertText?:string;

  //for dynamically added destination autocomplete ids
  autocompleteOptions:Options = new Options ({
    fields: ["address_components", "place_id"], // "geometry", "name"
    types: ["(cities)"]
  });
  autocompletePlaceholder = 'City,  Region,  Country';

  // get destinations array
  get destinations(): FormArray{
    return <FormArray>this.tripForm.get('destinations');
  }
  // get members array
  get members(): FormArray{
    return <FormArray>this.tripForm.get('members');
  }


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tripComponent:CreateTripComponent
  ) {}

  ngOnInit() {
    this.pageTitleDefault = this.pageTitle; //set default title (for when user has blank )
    this.createFormControls();
    this.createForm();
    this.datesGroup = this.tripForm.get('datesGroup')!;
    this.destinationAlertText ='Destination(s) is required.';

    // when the user has changed the value of any field . .
    this.formStatusSubscription = this.tripForm.statusChanges.subscribe(
      v => {
        // mark create-trip component as dirty for canDeactivate route guard (checkDirtyState) when form is first changed
        this.tripComponent.isDirty = this.tripForm.dirty;
      }
    );

    this.destinationChangesSubscription = this.destinations.statusChanges.subscribe(
      v => {
        // set datesOrder validation alert message depending on whether there is a valid destination already added or not
        if (this.destinations.length<2) {
          this.destinationAlertText ='Destination(s) is required.';
        }
        else {
          this.destinationAlertText ='Destination is blank. Either provide a valid destination or remove it.';
        }
      }
    )

    // when the user has changed the value of their trip title,
    // send the value to the parent component so it can be used to change the page title
    this.titleChangesSusbscription = this.title?.valueChanges.subscribe(
      v => this.onTitleChange.emit(v)
    );
  }

  ngOnDestroy() {
    this.formStatusSubscription?.unsubscribe();
    this.titleChangesSusbscription?.unsubscribe();
    this.destinationChangesSubscription?.unsubscribe();
  }

  // initialize non-duplicate controls
  createFormControls() {
    this.title = new FormControl('',
      [Validators.required,
      Validators.minLength(3)]),

    this.startDate = new FormControl(new Date(''),
      [Validators.required,
      Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')]),
    this.endDate = new FormControl(new Date(''),
      [Validators.required,
      Validators.pattern('(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))')]),

    this.details = new FormControl('');
  }

  // create intialization of entire form
  createForm() {
    this.tripForm = this.fb.group({
      title: this.title,
      details: this.details,
      datesGroup: this.fb.group({
        startDate: (this.startDate as FormControl),
        endDate: (this.endDate as FormControl)
      }, { validators : datesInOrderValidator }),
      destinations: this.fb.array([this.buildDestinations()],[Validators.required]),
      members: this.fb.array([this.buildMembers()])
    });
  }


  // destination methods
  buildDestinations():FormControl {
    return new FormControl('',Validators.required);
  }


  // member methods
  buildMembers():FormControl {
    return new FormControl('');
  }
  removeMember(i: number) {
    this.members.removeAt(i);
  }
  // Because adding members is optional, check and remove last value if it's blank
  // this implementation will be changed and improved in the future
  lastMemberValid() {
    let lastMemberIndex = this.members.length - 1;
    let lastMemberControl = 'members.'+lastMemberIndex;
    if (this.tripForm.get(lastMemberControl)?.value === '')
      this.removeMember(lastMemberIndex);
  }

  // submit method
  onSubmit(){
    console.log('Submit button pushed!');
    this.addTrip()
  }

  // add Trip (no backend yet)
  addTrip() {
    // adding members is OPTIONAL, so make sure any empty strings in members[] get removed before submission
    // later implementation: will allow users to only select valid users (haven't created api/db) before adding another or submitting
    this.lastMemberValid();

    // later implementation: fit form values to trip model and set them accordingly for inserting into api/db (after backend validation)
    console.log(this.tripForm.value);

    // temporarily having simulated backend checking (success of adding trip to api/db)
    let success = true;
    if (success) {
      this.tripComponent.isDirty=false; // deactivate route guard
      this.router.navigate(['/trips']) // future implementation: '/trip/id'
    }
  }

  // cancel method
  cancel() {
    this.router.navigate(['/trips']);
  }

  findInvalidControls() {
    let str ='Invalid field(s): '
    const invalid = [];
    const controls = this.tripForm.controls;
    for (let name in controls) {
        if (controls[name].invalid) {
          if (name==='datesGroup') {
            name='start/end date';
          }
          invalid.push(name);
          str+= '\n\t'+name;
        }
    }
    return str;
}
}
