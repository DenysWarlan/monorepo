import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {BookDto, Pagination} from '@monorepo/books/data-access';
import {Store} from '@ngxs/store';
import {PaginationComponent} from './components/pagination/pagination.component';
import {BookItemComponent} from './components/book-item/book-item.component';
import {AuthState} from '@monorepo/auth/data-access';

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

  @Input() public pagination: Pagination;

  @Input() public books: BookDto[];

  @Output() public updatePaginator: EventEmitter<Pagination> = new EventEmitter();

  public isAuth$: Observable<boolean> = this.store.select(AuthState.isAuthSuccess);

  public constructor(
      private store: Store,
  ) {}

  public onUpdatePaginator(event: Pagination): void {
    this.updatePaginator.emit(event);
  }
}
