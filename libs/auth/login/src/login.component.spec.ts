import {LoginComponent} from './login.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AuthLogin, AuthState, Credentials, SetToken} from '@monorepo/auth/data-access';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, take} from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let store: Store;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule,
                NgxsModule.forRoot([AuthState])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);

        store = TestBed.inject(Store);

        store.reset(AuthState)

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form required field validity', () => {
        const email: FormControl<string> = component.form.controls['email'];
        const password: FormControl<string> = component.form.controls['password'];

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

    it('should return if form invalid when clicked login', () => {
        const spyMock = jest.spyOn(component, 'loginUser');

        component.form.setValue({
            email: 'fooexample',
            password: 'pass'
        });

        expect(spyMock).not.toBeCalledWith(store.dispatch)
    });

    it('should dispatch AuthLogin if form valid when clicked login', () => {
        const spyMock = jest.spyOn(store, 'dispatch');

        component.form.setValue({
            email: 'foo@example.com',
            password: 'password1232'
        });

        const data: Credentials = component.form.value as Credentials;

        component.loginUser();

        expect(spyMock).toBeCalledWith(new AuthLogin(data));
    });

    it('should not dispatch action set token navigate if not login', () => {
        const spyMock = jest.spyOn(store, 'dispatch');
        const action = new SetToken({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            email: 'foo@example.com',
        });

        Object.defineProperty(component, 'isAuthSuccess$', of(true));

        component.isAuthSuccess$
            .pipe(take(1))
            .subscribe(() => expect(spyMock).not.toBeCalledWith(action));
    });

    it('should dispatch action set token if login', () => {
        const spyMock = jest.spyOn(store, 'dispatch');
        const action = new SetToken({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            email: 'foo@example.com',
        });

        Object.defineProperty(component, 'isAuthSuccess$', of(true));

        component.isAuthSuccess$
            .pipe(take(1))
            .subscribe(() => expect(spyMock).toBeCalledWith(action))
    });
})