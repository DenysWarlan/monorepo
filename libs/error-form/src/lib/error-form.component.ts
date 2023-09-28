import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationErrors} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorInfoPipe} from './error-info.pipe';

@Component({
  selector: 'monorepo-error-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ErrorInfoPipe
  ],
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss'],
})
export class ErrorFormComponent {
  @Input() public ctrlName: string;
  @Input() public errors: ValidationErrors | null;
}
