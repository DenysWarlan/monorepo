import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {SearchBook} from '../../data-access/src/reducer/actions/search.action';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'monorepo-book-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  public search: FormControl<string> = this.fb.control('');

  public constructor(
      private fb: FormBuilder,
      private store: Store
  ) {}

  public onSearch(): void {
    this.store.dispatch(new SearchBook(this.search.value))
  }
}
