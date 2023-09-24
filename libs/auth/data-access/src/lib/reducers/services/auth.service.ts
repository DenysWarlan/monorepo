import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Login} from '../../models/login.model';
import {Token} from '../../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(data: Login): any {
    const url = `api/auth/login`;

    return this.http.post(url, data);
  }

  public register(data: Login): any {
    const url = `api/auth/register`;

    return this.http.post(url, data);
  }

  public setToken(res: Token): void {
    localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
    localStorage.setItem('userId', JSON.stringify(res.userId));
  }
}
