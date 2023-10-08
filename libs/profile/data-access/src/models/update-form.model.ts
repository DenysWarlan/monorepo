import { FormControl } from '@angular/forms';

export interface UpdateForm {
    name: FormControl<string>;
    birthDate: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}