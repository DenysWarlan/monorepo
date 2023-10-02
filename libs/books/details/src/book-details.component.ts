import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {}
