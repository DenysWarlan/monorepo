import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngxs/store';
import {Logout} from '@monorepo/auth/data-access';
import {DeleteUserData} from '@monorepo/profile/data-access';

@Component({
  selector: 'monorepo-delete-profile',
  standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        MatButtonModule,
    ],
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent {

  public constructor(
      private store: Store,
  ) {}

  public logOut(): void {
    this.store.dispatch(new Logout())
  }

  public delete(): void {
    this.store.dispatch(new DeleteUserData())
  }

}
