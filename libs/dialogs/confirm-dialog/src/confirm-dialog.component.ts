import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialog} from './confirm-dialog.model';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'monorepo-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  public constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {}
}
