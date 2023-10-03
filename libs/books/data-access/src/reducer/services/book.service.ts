import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Books} from '../../model/books.model';
import {Book} from '../../model/book.model';
import {Pagination} from '../../model/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(public http: HttpClient) { }

  getBooks(query: Pagination): Observable<Books> {
    const url = `books/v1/volumes?q=${query.query}&startIndex=${query.startIndex}&maxResults=${query.maxResults}`;

    return this.http.get<Books>(url);
  }

  getBook(selfLink: string): Observable<Book> {
    return this.http.get<Book>(selfLink);
  }
}
