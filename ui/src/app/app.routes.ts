import { Routes } from '@angular/router';
import {LoginComponent } from './components/pages/login/login.component';
import {SignupComponent } from './components/pages/signup/signup.component';
import {ForgotpasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgottenpassword', component: ForgotpasswordComponent},
    {path: '**', component: LoginComponent, pathMatch:'full'},
];
