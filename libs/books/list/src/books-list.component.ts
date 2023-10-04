import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {Book, Pagination, UpdatePagination} from '@monorepo/books/data-access';
import {BookState} from '@monorepo/books/data-access';
import {Store} from '@ngxs/store';
import {PaginationComponent} from './components/pagination/pagination.component';
import {BookItemComponent} from './components/book-item/book-item.component';

@Component({
  selector: 'monorepo-books-list',
  standalone: true,
  imports: [
      CommonModule,
    MatPaginatorModule,
    PaginationComponent,
    BookItemComponent
  ],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  @Input() public totalBooks: number;

  public books$: Observable<Book[]> = this.store.select(BookState.books);

  public searchSuccess$: Observable<boolean> = this.store.select(BookState.searchSuccess);

  public pagination$: Observable<Pagination> = this.store.select(BookState.pagination);

  public constructor(
      private store: Store,
  ) {}

  public updatePaginator(event: Pagination): void {
      this.store.dispatch(new UpdatePagination(event))
  }
}
