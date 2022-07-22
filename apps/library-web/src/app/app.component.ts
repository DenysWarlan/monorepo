import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from './reducers/auth/auth.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library';

  @Select(AuthState.isAuthSuccess) public isAuth$!: Observable<any>;
}
