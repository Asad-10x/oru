import { Routes } from '@angular/router';
import {LoginComponent } from './components/pages/login/login.component';
import {SignupComponent } from './components/pages/signup/signup.component';
import {ForgotpasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgottenpassword', component: ForgotpasswordComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: '**', component: LoginComponent, pathMatch:'full'},
];
