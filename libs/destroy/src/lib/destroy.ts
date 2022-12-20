import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Destroy implements OnDestroy {
  protected subGuard$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.complete();
  }
}
