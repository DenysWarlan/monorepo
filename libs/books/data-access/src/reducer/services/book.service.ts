import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(public http: HttpClient) { }

  getBooks(query: any): Observable<any[]> {
    const url = `books/v1/volumes?q=${query}`;

    return this.http.get<any[]>(url);
  }

  getBook(selfLink: string): Observable<any> {
    return this.http.get(selfLink);
  }
}
