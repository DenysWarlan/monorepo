import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Credentials} from '../../dto/credentials.model.dto';
import {Token} from '../../models/token.model';
import {LoggedDto} from '../../dto/logged.model.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(data: Credentials): Observable<LoggedDto> {
    const url = `api/auth/login`;

    return this.http.post<LoggedDto>(url, data);
  }

  public register(data: Credentials): any {
    const url = `api/auth/register`;

    return this.http.post(url, data);
  }

  public setToken(res: LoggedDto): void {
    localStorage.setItem('accessToken', JSON.stringify(res?.accessToken));
    localStorage.setItem('userId', JSON.stringify(res?.id));
  }

  public clearToken(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  }
}
