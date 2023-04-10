import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared';
import { AuthService } from 'src/app/shared';

@Component({
  selector: 'app-members-list',
  templateUrl: 'members-list.component.html',
  styleUrls: ['members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  @Input() props?: membersListProps;
  currentUserUsername: string = '';

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.currentUserUsername = this.auth.getCurrentUser().username;
  }
}

export type membersListProps = {
  members: User[];
  showIcon?: boolean;
  showFrame?: boolean;
};
