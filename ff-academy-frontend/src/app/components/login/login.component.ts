import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { ProfileActions } from '../../core/store/profile/profile.actions';
import { selectAuthLoading } from '../../core/store/profile/profile.selectors';
import { first, merge, Subject, takeUntil } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-login',
  imports: [LoaderComponent, CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    private store = inject(Store);
    destroy$ = new Subject();

    showPassword = false;
    counter = 0;

    formData = {
        email: '',
        password: ''
    }

    loading$ = this.store.select(selectAuthLoading);
    loginError;

    constructor(
        private actions$: ActionsSubject,
        private router: Router
    ) {}
   
    login() {
        let loginData = {
            email: this.formData.email,
        };

        this.store.dispatch(ProfileActions.login({ loginData }));

        // login
        this.actions$.pipe(
            ofType(ProfileActions.loginSuccess), 
            first(), 
            takeUntil(merge(
                this.actions$.pipe(ofType(ProfileActions.loginFailure)),
                this.destroy$
            ))
        ).subscribe(() => {
            this.store.dispatch(ProfileActions.loadProfile());
            console.log('login sub 1');
            this.loginError = '';
        });

        this.actions$.pipe(
            ofType(ProfileActions.loginFailure), 
            first(), 
            takeUntil(merge(
                this.actions$.pipe(ofType(ProfileActions.loginSuccess)),
                this.destroy$
            ))
        ).subscribe((action) => {
            if (action.error?.message) {
                this.loginError = action.error?.message;
            } else {
                this.loginError = 'Something went wrong. Please try again later.'
            }
            console.log('login sub 2');
        });

        // load user
        this.actions$.pipe(
            ofType(ProfileActions.loadProfileSuccess), 
            first(), 
            takeUntil(merge(
                this.actions$.pipe(ofType(ProfileActions.loadProfileFailure)),
                this.destroy$
            ))
        ).subscribe(() => {
            this.router.navigate(['/home']);
            console.log('login sub 3');
        });

        this.actions$.pipe(
            ofType(ProfileActions.loadProfileFailure), 
            first(), 
            takeUntil(merge(
                this.actions$.pipe(ofType(ProfileActions.loadProfileSuccess)),
                this.destroy$
            ))
        ).subscribe((action) => {
            if (action.error?.message) {
                this.loginError = action.error?.message;
            } else {
                this.loginError = 'Something went wrong. Please try again later.'
            }
            console.log('login sub 4');
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
