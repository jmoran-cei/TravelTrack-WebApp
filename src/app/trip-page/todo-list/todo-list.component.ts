import { Component, Input } from '@angular/core';
import { IToDo } from 'src/app/shared/models/toDo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.css'],
})
export class ToDoListComponent {
  @Input() props?: toDoListProps;
}

export type toDoListProps = {
  toDo: IToDo[];
  display: {
    all?: boolean; // set true to display all tasks
    complete?: boolean; // set true to display only complete
    uncomplete?: boolean; // set true to display only uncomplete tasks
    showIcons?: boolean; // display checkmark next to completed tasks
  };
};
