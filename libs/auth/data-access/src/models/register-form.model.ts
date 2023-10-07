import {FormControl} from '@angular/forms';

export interface RegisterForm {
    name: FormControl<string>;
    birthDate: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}