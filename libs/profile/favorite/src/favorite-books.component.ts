import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-favorite-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.scss'],
})
export class FavoriteBooksComponent {}
