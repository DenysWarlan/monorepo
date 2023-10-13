import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from '@ngxs/store';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from "@angular/material/tabs";
import {EditSettingsComponent} from "./components/edit-settings/edit-settings.component";
import {DeleteProfileComponent} from "./components/delete-profile/delete-profile.component";
import {UserData} from '@monorepo/profile/data-access';

@Component({
  selector: 'monorepo-settings',
  standalone: true,
  imports: [
    CommonModule,
    EditSettingsComponent,
    DeleteProfileComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public constructor (
      private store: Store
  ) {}

  public ngOnInit () {
    this.getUserData();
  }

  private getUserData(): void {
    this.store.dispatch(new UserData());
  }

}
