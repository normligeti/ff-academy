import { Component } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../../core/store/profile/profile.actions';

@Component({
  selector: 'app-login',
  imports: [LoaderComponent, CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(
        private router: Router,
        private store: Store
    ) {}

    counter = 0;

    formData = {
        email: '',
        password: ''
    }
   
    login() {
        let loginData = {
            email: this.formData.email,
            password: this.formData.password,
        };

        // this.counter++;

        this.store.dispatch(ProfileActions.login({ loginData }));

        // setTimeout(() => {
        //     this.router.navigate(['/home'])
        // }, 1000);
    }
}
