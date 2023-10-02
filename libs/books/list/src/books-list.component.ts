import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {}
