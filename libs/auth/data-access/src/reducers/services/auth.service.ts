import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Credentials} from '../../dto/credentials.model.dto';
import {LoggedDto} from '../../dto/logged.model.dto';
import {Observable} from 'rxjs';
import {RegisterDto} from '../../dto/register.model.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'api/auth'
  public constructor(private http: HttpClient) {}

  public login(data: Credentials): Observable<LoggedDto> {
    const url = `${this.authUrl}/login`;

    return this.http.post<LoggedDto>(url, data);
  }

  public register(data: RegisterDto): Observable<void> {
    const url = `${this.authUrl}/register`;

    return this.http.post<void>(url, data);
  }

  public refresh(): Observable<{refreshedToken: string}> {
    const url = `${this.authUrl}/refresh`;

    const data = {'refresh': JSON.parse(localStorage.getItem('refreshToken'))};

    return this.http.post<{refreshedToken: string}>(url, data);
  }

  public setToken(res: LoggedDto): void {
    localStorage.setItem('accessToken', JSON.stringify(res?.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(res?.refreshToken));
  }

  public clearToken(): void {
    localStorage.clear();
  }
}
