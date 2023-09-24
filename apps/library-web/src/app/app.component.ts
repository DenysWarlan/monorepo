import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import {AuthState} from '../../../../libs/auth/data-access/src';

@Component({
  selector: 'library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library';

  @Select(AuthState.isAuthSuccess) public isAuth$!: Observable<boolean>;
}
