import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Book} from '@monorepo/books/data-access';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'monorepo-book-item',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent {
  @Input() public book: Book;
}
