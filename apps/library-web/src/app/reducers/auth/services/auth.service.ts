import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: any) {
    const url = `login`;
    return this.http.post(url, payload.data);
  }

  register(payload: any) {
    const url = `register`;
    return this.http.post(url, payload.data);
  }

  setToken(res: any) {
    localStorage.setItem('token', JSON.stringify(res.token));
    localStorage.setItem('userId', JSON.stringify(res.userId));
  }
}
