import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngxs/store';
import {Logout} from '@monorepo/auth/data-access';
import {DeleteUserData} from '@monorepo/profile/data-access';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '@monorepo/confirm-dialog';
import {filter} from 'rxjs';

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
      public dialog: MatDialog
  ) {}

  public logOut(): void {
    this.store.dispatch(new Logout())
  }

  public delete(): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Profile',
        description: 'Are you sure you want to delete you profile?'
      }
    }).afterClosed()
        .pipe(filter(Boolean))
        .subscribe(() => this.store.dispatch(new DeleteUserData()))
  }

}
