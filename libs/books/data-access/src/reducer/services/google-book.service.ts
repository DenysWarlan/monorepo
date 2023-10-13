import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Books} from '../../model/books.model';
import {Book} from '../../model/book.model';
import {Pagination} from '../../model/pagination.model';
import {BookDto} from '../../dto/book.dto';
import {map} from 'rxjs/operators';
import {BookListDto} from '../../dto/book-list.dto';
import {BookDetailsDto} from '../../dto/book-details.dto';
import {BookDetails} from '../../model/book-details.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleBookService {

  private booksApi = 'books/v1/volumes'

  public constructor(
      private http: HttpClient
  ) {}

  public getBooks(query: Pagination): Observable<BookListDto> {
    const url = `${this.booksApi}?q=${query.query}&startIndex=${query.startIndex}&maxResults=${query.maxResults}`;

    return this.http.get<Books>(url)
        .pipe(
            map((books: Books) => ({
              ...books,
              items: books.items?.map((item: Book) => this.mapBookToBookDto(item)) ?? []
            }))
        );
  }

  public getBook(id: string): Observable<BookDetailsDto> {
    const url = `${this.booksApi}/${id}`

    return this.http.get<BookDetails>(url).pipe(map((book: BookDetails) => this.mapBookDetailsToBookDetailsDto(book)));
  }

  private mapBookToBookDto(book: Book): BookDto {
    return {
      bookId: book.id,
      title: book.volumeInfo.title ?? '',
      authors: book.volumeInfo.authors ?? [],
      description: book.volumeInfo?.description ?? '',
      categories: book.volumeInfo?.categories ?? [],
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail ?? ''
    };
  }

  private mapBookDetailsToBookDetailsDto(book: BookDetails): BookDetailsDto {
    return {
      bookId: book.id,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors,
      description: book.volumeInfo?.description ?? '',
      categories: book.volumeInfo?.categories ?? [],
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail ?? '',
      publisher: book.volumeInfo?.publisher ?? '',
      pageCount: book.volumeInfo?.pageCount ?? 0,
      publisherDate: book.volumeInfo?.publishedDate ?? '',
      link: book.volumeInfo?.previewLink ?? '',
      language: book.volumeInfo?.language ?? ''
    }
  }
}
