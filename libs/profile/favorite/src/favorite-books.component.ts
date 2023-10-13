import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from '@ngxs/store';
import {BookDto, FavoriteBookState, Pagination} from '@monorepo/books/data-access';
import {Observable} from 'rxjs';
import {BooksListComponent} from '@monorepo/books/list';

@Component({
  selector: 'monorepo-favorite-books',
  standalone: true,
  imports: [CommonModule, BooksListComponent],
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.scss'],
})
export class FavoriteBooksComponent {

  public favoriteBooks$: Observable<BookDto[]> = this.store.select(FavoriteBookState.favoriteBooks);

  public totalItemFavoriteBooks$: Observable<number> = this.store.select(FavoriteBookState.totalItemFavoriteBooks);

  public pagination$: Observable<Pagination> = this.store.select(FavoriteBookState.pagination);

  public constructor(
      private store: Store
  ) {}
}
