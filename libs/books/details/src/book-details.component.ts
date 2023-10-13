import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BookDetails, BookState} from '@monorepo/books/data-access';
import {Observable} from 'rxjs';
import {BookDetailsDto} from '@monorepo/books/data-access';

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

  public constructor(
      private store: Store,
      private route: ActivatedRoute,
      private location: Location
  ) {}

  public ngOnInit(): void {
    this.getBookDetails();
  }

  public backToSearch(): void {
    this.location.back();
  }

  private getBookDetails(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new BookDetails(bookId));
  }
}
