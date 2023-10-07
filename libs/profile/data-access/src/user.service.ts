import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from './dto/user.model.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = 'api/users'
  public constructor(private http: HttpClient) {}

  public user(): Observable<UserDto> {
    const url = `${this.authUrl}/me`;

    return this.http.get<UserDto>(url);
  }
}
