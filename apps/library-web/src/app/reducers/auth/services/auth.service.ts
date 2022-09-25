import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: any) {
    const url = `api/auth/login`;
    return this.http.post(url, payload.data);
  }

  register(payload: any) {
    const url = `api/auth/register`;
    return this.http.post(url, payload.data);
  }

  setToken(res: any) {
    localStorage.setItem('access_token', JSON.stringify(res.access_token));
    localStorage.setItem('userId', JSON.stringify(res.userId));
  }
}
