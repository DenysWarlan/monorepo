import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { UserDto } from '../dto/user.model.dto';
import {UpdateUserDto} from "../dto/update-user.model.dto";

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

  public updateUser(data: UpdateUserDto): Observable<UserDto> {
    const url = `${this.authUrl}/me`;

    return this.http.post<UserDto>(url, data);
  }

  public deleteUser(): Observable<any> {
    const url = `${this.authUrl}/me`;

    return this.http.delete<any>(url);
  }
  
  
}
