import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {MatInputModule} from '@angular/material/input';
import {BookState, SearchBook} from '@monorepo/books/data-access';
import {Observable} from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BooksListComponent} from '@monorepo/books/list';

@Component({
  selector: 'monorepo-book-search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BooksListComponent
  ],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  public search: FormControl<string> = this.fb.control('');

  public totalItems$: Observable<number> = this.store.select(BookState.totalItems);

  public constructor(
      private fb: FormBuilder,
      private store: Store,
  ) {}

  public onSearch(): void {
    this.store.dispatch(new SearchBook({query: this.search.value}))
  }
}
