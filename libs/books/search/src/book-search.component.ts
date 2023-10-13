import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {MatInputModule} from '@angular/material/input';
import {BookDto, BookState, Pagination, ResetBooks, SearchBook, UpdatePagination} from '@monorepo/books/data-access';
import {filter, first, Observable} from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BooksListComponent} from '@monorepo/books/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'monorepo-book-search',
  standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        BooksListComponent,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  public search: FormControl<string> = this.fb.control('');

  public totalItems$: Observable<number> = this.store.select(BookState.totalItems);

  public books$: Observable<BookDto[]> = this.store.select(BookState.books);

  public pagination$: Observable<Pagination> = this.store.select(BookState.pagination);

  public searchSuccess$: Observable<boolean> = this.store.select(BookState.searchSuccess);

  public searchLoading$: Observable<boolean> = this.store.select(BookState.searchLoading);

  public constructor(
      private fb: FormBuilder,
      private store: Store,
  ) {}

    public ngOnInit(): void {
      this.pagination$
          .pipe(
              filter(Boolean),
              first()
          )
          .subscribe((pagination: Pagination) => this.search.setValue(pagination.query))
    }

  public onReset(): void {
    this.search.reset('');
      this.store.dispatch(new ResetBooks());
  }

  public onSearch(): void {
    this.store.dispatch(new SearchBook({query: this.search.value}));
  }

  public onUpdatePaginator(event: Pagination): void {
      this.store.dispatch(new UpdatePagination(event));
  }
}
