import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddToFavorite, BookDto} from '@monorepo/books/data-access';
import {MatCardModule} from '@angular/material/card';
import {ArrayJoinPipe} from '../../pipes/array-join.pipe';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {FavoriteBookState} from '@monorepo/books/data-access';
import {RemoveFromFavorite} from '@monorepo/books/data-access';

@Component({
  selector: 'monorepo-book-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, ArrayJoinPipe, MatButtonModule, MatIconModule],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() public book!: BookDto;

  @Input() public isAuth: boolean;

  public isFavoriteBook$: Observable<boolean>;

  public constructor (
      private router: Router,
      private store: Store
  ){}

  public ngOnInit (): void {
    this.isFavoriteBook$ = this.store.select(FavoriteBookState.isFavoriteBook(this.book?.bookId));
  }

  public goToBook(id: string): void {
    this.router.navigate([`/book/${id}`]);
  }

  public addBookToFavorite(): void {
    this.store.dispatch(new AddToFavorite(this.book));
  }

  public removeBookFromFavorite(): void {
    this.store.dispatch(new RemoveFromFavorite(this.book.bookId));
  }
}
