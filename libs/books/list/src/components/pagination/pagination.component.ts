import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Pagination} from '@monorepo/books/data-access';

@Component({
  selector: 'monorepo-pagination',
  standalone: true,
    imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() public readonly totalBooks: number;

  @Input() public readonly pagination: Pagination;

  @Output() public updatePaginator: EventEmitter<Pagination> = new EventEmitter();

  public readonly pageSizeOptions: number[] = [8, 12, 24, 36];

  public onUpdatePaginator(event: PageEvent): void {
    const startIndex = event.pageSize * event.pageIndex + 1;

    const pagination: Pagination = {
      startIndex,
      pageIndex: event.pageIndex,
      maxResults: event.pageSize
    }

    this.updatePaginator.emit(pagination)
  }
}
