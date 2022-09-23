import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Trip } from 'src/app/shared';
import { ToDo } from 'src/app/shared/models/toDo.model';
import { TripService } from 'src/app/trips';

@Component({
  templateUrl: 'trip-todo.component.html',
  styleUrls: ['trip-todo.component.css'],
})
export class TripToDoComponent implements OnInit {
  trip!: Trip;
  toDoForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tripService: TripService
  ) {}

  ngOnInit() {
    this.route.parent?.data.forEach((data) => {
      this.trip = data['trip'];
    });

    this.createToDoForm();
  }

  createToDoForm() {
    // if to do list is empty, create new empty to do form
    if (this.trip.toDo?.length === 0 || !this.trip.toDo) {
      this.toDoForm = this.fb.group({
        tasks: this.fb.array([this.buildTaskControl()]),
        statuses: this.fb.array([this.buildStatusControl()]),
      });
    }
    // else, populate to do form with tasks
    else {
      this.toDoForm = this.fb.group({
        tasks: this.fb.array(this.getExistingTasks()),
        statuses: this.fb.array(this.getExistingTaskStatuses()),
      });
    }
  }

  getExistingTasks(): string[] {
    var tasks: string[] = [];
    for (let task of this.trip.toDo!) {
      tasks.push(task.task);
    }
    return tasks;
  }

  getExistingTaskStatuses(): boolean[] {
    var statuses: boolean[] = [];
    for (let task of this.trip.toDo!) {
      statuses.push(task.complete);
    }
    return statuses;
  }

  buildTaskControl(): FormControl {
    return new FormControl('');
  }

  buildStatusControl(): FormControl {
    return new FormControl(false);
  }

  get tasks(): FormArray {
    return <FormArray>this.toDoForm.get('tasks');
  }

  get statuses(): FormArray {
    return <FormArray>this.toDoForm.get('statuses');
  }

  addTask() {
    this.tasks.push(this.buildTaskControl());
    this.statuses.push(this.buildStatusControl());
  }

  removeTask(i: number) {
    this.tasks.removeAt(i);
    this.statuses.removeAt(i);

    // if only task, reset to new blank control
    if (i === 0 && this.tasks.length === 0) this.addTask();
  }

  toggleStatus(i: number) {
    let currentVal = this.toDoForm.get(`statuses.${i}`)?.value;
    this.toDoForm.get(`statuses.${i}`)?.setValue(!currentVal);
  }

  updateTrip() {
    this.tripService
      .updateTrip(this.trip)
      .pipe(take(1))
      .subscribe(() => {
        // deactivate route guard
        // this.toDoComponent.isDirty = false;
        //reroute to newly created trip
        this.router.navigate([`/trips/${this.trip.id}`]);
      });
  }

  fitFormValuesToModel(): ToDo[] {
    var toDoList: ToDo[] = [];

    for (let i in this.tasks.value) {
      var taskText = this.tasks.controls[parseInt(i)].value;

      // ignore if task is blank
      if (taskText.trim().length !== 0) {
        let currentTask: ToDo = {
          task: taskText,
          complete: this.statuses.controls[parseInt(i)].value,
        };

        toDoList.push(currentTask);
      }
    }

    return toDoList;
  }

  onSubmit() {
    this.trip.toDo = this.fitFormValuesToModel();
    console.log(this.trip.toDo);
    this.updateTrip();
  }

  cancel() {
    this.router.navigate([`/trips/${this.trip?.id}`]);
  }
}
