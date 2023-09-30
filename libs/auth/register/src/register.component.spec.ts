import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AuthState, Register, RegisterDto, RegisterState, RegisterSuccess} from '@monorepo/auth/data-access';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {routes} from '../../../../apps/library-web/src/app/app-routing.module';

describe('LoginComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let store: Store;
    let location: Location;
    let router: Router;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                RegisterComponent,
                RouterTestingModule.withRoutes(routes),
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                MatDatepickerModule,
                MatNativeDateModule,
                NgxsModule.forRoot([AuthState])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterComponent);

        store = TestBed.inject(Store);

        store.reset(RegisterState)

        component = fixture.componentInstance;

        location = TestBed.inject(Location);

        router = TestBed.inject(Router);
        router.initialNavigation();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form required field validity', () => {
        const name: FormControl<string> = component.form.controls['name'];
        const email: FormControl<string> = component.form.controls['email'];
        const password: FormControl<string> = component.form.controls['password'];

        expect(name.errors['required']).toBeTruthy();
        expect(email.errors['required']).toBeTruthy();
        expect(password.errors['required']).toBeTruthy();
    });

    it('form email field validity', () => {
        component.form.patchValue({email: 'fooexample'});

        const email: FormControl<string> = component.form.controls['email'];

        expect(email.errors['email']).toBeTruthy();
    });

    it('form minLength field validity', () => {
        component.form.patchValue({password: 'pass'});

        const password: FormControl<string> = component.form.controls['password'];

        expect(password.errors['minlength']).toBeTruthy();
    });

    it('should return if form invalid when clicked register', () => {
        const spyMock = jest.spyOn(component, 'submitForm');

        component.form.setValue({
            name: 'Test test',
            birthDate: '',
            email: 'fooexample',
            password: 'pass'
        });

        expect(spyMock).not.toBeCalledWith(store.dispatch)
    });

    it('should dispatch Register if form valid when clicked register', () => {
        const spyMock = jest.spyOn(store, 'dispatch');

        component.form.setValue({
            name: 'Test test',
            birthDate: '',
            email: 'foo@example.com',
            password: 'password1232'
        });

        const data: RegisterDto = component.form.value as RegisterDto;

        component.submitForm();

        expect(spyMock).toBeCalledWith(new Register(data));
    });

    it('should redirect when click login', () => {
        jest.spyOn(component, 'login');

        const expectedPath = '/auth/login';

        component.login();

        expect(location.path()).toEqual(expectedPath);
    });


    it('should redirect after success register', () => {
        const action: RegisterSuccess = new RegisterSuccess();
        const expectedPath = '/auth/login';

        store.dispatch(action);

        expect(location.path()).toEqual(expectedPath);
    });
})