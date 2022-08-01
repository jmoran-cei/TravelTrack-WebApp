import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { datesInOrderValidator } from '../shared';

// this function will be probably used in other components down the road (e.g. edit-profile)
// does this seem like the most 'fitting' spot to put this or should it be up top?
// should it have it's own file (reconfigure it as checkDirtyState.guard, etc.)? or..
export function checkDirtyState(component: CreateTripComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this trip, do you really want to cancel?'
    );
  return true;
}

@Component({
  selector: 'create-trip',
  templateUrl: 'create-trip.component.html',
  styleUrls: ['create-trip.component.css'],
})
export class CreateTripComponent {
  // temp placeholder variable for deactivate route guard (via checkDirtyState function)
  isDirty: boolean = false;

  // component props
  newTripForm!: FormGroup;
  title?:FormControl;
  details?:FormControl;
  startDate?: FormControl;
  endDate?: FormControl;
  datesGroup?: AbstractControl;
  formStatusSubscription?: Subscription;
  titleValueSubscription?: Subscription;
  titleOfTrip?: string = "Your New Trip";
  mouseoverAddDestination?:boolean;
  mouseoverAddMember?:boolean;

  // get destinations array
  get destinations(): FormArray{ // capitalized to prevent duplicate identifier
    return <FormArray>this.newTripForm.get('destinations');
  }

  // get members array
  get members(): FormArray{ // capitalized to prevent duplicate identifier
    return <FormArray>this.newTripForm.get('members');
  }



  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.datesGroup = this.newTripForm.get('datesGroup')!;

    // when the user has changed the value of any input set Create-Trip component as dirty for 'cancel' route guard
    this.formStatusSubscription = this.newTripForm.statusChanges.subscribe(
      v => {
        this.isDirty = this.newTripForm.dirty;
      }
    );

    this.titleValueSubscription = this.title?.valueChanges.subscribe(
      v => {
        // make the title of the page become the name of the trip
        this.titleOfTrip = v
        if (this.titleOfTrip === "") {
          this.titleOfTrip="Your New Trip";
        }
        console.log(this.endDate?.value);
      }
      );
  }

  ngOnDestroy() {
    this.formStatusSubscription?.unsubscribe();
    this.titleValueSubscription?.unsubscribe();
  }

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

  createForm() {
    this.newTripForm = this.fb.group({
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
  addDestination(i: number) {
    // add destination
    this.destinations.push(this.buildDestinations());

    // make added destination as unchangeable and change appearance
    this.styleInputAsReadonly('destinations',i);
    this.mouseoverAddDestination=false; // disables mouseover add button immediately
  }
  removeDestination(i: number) {
    this.destinations.removeAt(i);
  }


  // member methods
  buildMembers():FormControl {
    return new FormControl('');
  }
  addMember(i: number) {
    // add member
    this.members.push(this.buildMembers());

    // make added member as unchangeable and change appearance
    this.styleInputAsReadonly('members',i);
    this.mouseoverAddMember=false; // disables mouseover add button immediately
  }
  removeMember(i: number) {
    this.members.removeAt(i);
  }
  // Because adding members is optional, check and remove last value if it's blank
  // this implementation will be changed and improved in the future
  lastMemberValid() {
    let lastMemberIndex = this.members.length - 1
    let lastMemberControl = 'members'+lastMemberIndex;
    if (this.newTripForm.get(lastMemberControl)?.value === '')
    this.removeMember(lastMemberIndex);
  }


  // methods for validation of Form Arrays
  isTouched(formArrayName:string, i:number) {
    return (<FormArray>this.newTripForm.get(formArrayName)).controls[i].touched;
  }
  isValid(formArrayName:string, i:number) {
    return (<FormArray>this.newTripForm.get(formArrayName)).controls[i].valid;
  }
  hasError(formArrayName:string, i:number) {
    return (<FormArray>this.newTripForm.get(formArrayName)).controls[i].errors;
  }
  hasRequiredError(formArrayName:string, i:number) {
    return (<FormArray>this.newTripForm.get(formArrayName)).controls[i].errors!['required'];
  }

  // make destinations/members READONLY when added
  // fieldName = 'destinations' or 'members'
  styleInputAsReadonly(fieldName: string, i: number) {
    // make input READONLY and remove bottom border
    let fieldInput = document.getElementById(fieldName+i)
    fieldInput!.setAttribute('readonly','readonly');
    fieldInput!.style.borderBottomColor='transparent';

    // change background and border of field
    let field = document.getElementById(fieldName+'Field'+i)!;
    field!.style.backgroundColor='#e4e4f4';
    field!.style.borderRadius='10px';
  }


  // submit method
  addTrip() {
    // add members is OPTIONAL, so make sure any empty strings get ignored
    // later implementation: will allow users to only select valid users (haven't created api/db) before adding another or submitting
    this.lastMemberValid();

    // later implementation: fit form values to trip model and set them accordingly for inserting into api/db (after backend validation)
    console.log(this.newTripForm.value);

    // temporarily having simulated backend checking (success of adding trip to api/db)
    let success = true;
    if (success) {
      this.isDirty=false; // deactivate route guard
      this.router.navigate(['/trips']) // future implementation: '/trip/id'
    }
  }

  // cancel method
  cancel() {
    this.router.navigate(['/trips']);
  }
}
