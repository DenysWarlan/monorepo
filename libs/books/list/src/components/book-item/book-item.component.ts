import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '@monorepo/books/data-access';
import {MatCardModule} from '@angular/material/card';
import {ArrayJoinPipe} from '../../pipes/array-join.pipe';

@Component({
  selector: 'monorepo-book-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, ArrayJoinPipe],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit{
  @Input() public book: Book;
  public ngOnInit() {
    console.log(this.book.volumeInfo.authors);
  }
}
