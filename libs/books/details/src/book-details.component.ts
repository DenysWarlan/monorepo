import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  AddToFavorite,
  BookDetails,
  BookDetailsDto,
  BookDto,
  BookState, FavoriteBookState,
  RemoveFromFavorite
} from '@monorepo/books/data-access';
import {Observable} from 'rxjs';

@Component({
  selector: 'monorepo-book-details',
  standalone: true,
  imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {

  public bookDetails$: Observable<BookDetailsDto> = this.store.select(BookState.book);

  private bookId: string;

  public isFavoriteBook$: Observable<boolean>;

  public constructor(
      private store: Store,
      private route: ActivatedRoute,
      private location: Location
  ) {}

  public ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    this.isFavoriteBook$ = this.store.select(FavoriteBookState.isFavoriteBook(this.bookId))

    this.getBookDetails();
  }

  public backToSearch(): void {
    this.location.back();
  }

  private getBookDetails(): void {


    this.store.dispatch(new BookDetails(this.bookId));
  }

  public addBookToFavorite(book: BookDto): void {
    this.store.dispatch(new AddToFavorite(book));
  }

  public removeBookFromFavorite(bookId: string): void {
    this.store.dispatch(new RemoveFromFavorite(bookId));
  }
}
