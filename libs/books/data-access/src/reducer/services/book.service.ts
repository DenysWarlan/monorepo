import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pagination} from '../../model/pagination.model';
import {BookDto} from '../../dto/book.dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksApi = 'api/books'

  public constructor(
      private http: HttpClient
  ) {}

  public add(book: BookDto): Observable<BookDto[]> {
    return this.http.post<BookDto[]>(`${this.booksApi}/add`, book)
  }

  public remove(bookId: string): Observable<BookDto[]> {
    return this.http.delete<BookDto[]>(`${this.booksApi}/${bookId}`)
  }


  public favoriteBooks(data: Pagination): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(`api/users/me/books`)
  }

}
