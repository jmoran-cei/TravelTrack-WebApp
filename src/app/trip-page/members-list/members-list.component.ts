import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/shared';
import { AuthService } from 'src/app/user';

@Component({
  selector: 'app-members-list',
  templateUrl: 'members-list.component.html',
  styleUrls: ['members-list.component.css'],
})
export class MembersListComponent {
  @Input() props?: membersListProps;

  constructor(public auth: AuthService) {}
}

export type membersListProps = {
  members: IUser[];
  showIcon?: boolean;
  showFrame?: boolean;
};
