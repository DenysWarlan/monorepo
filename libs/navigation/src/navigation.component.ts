import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {}
