import { Component  } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {NavbarComponent} from '../../static/navbar/navbar.component';
import { LoginService } from '../../../services/login/login.service';


@Component({
    selector: 'app-login',
    imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone:true
})
export class LoginComponent {
    userForm: FormGroup;
    errorMessage: string = '';

    constructor(private loginService:LoginService, private router: Router) {
        this.userForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)])
        })
    }

    onSubmit(form:any) {
        if (form.valid) {
          const { email, password } = this.userForm.value;
          this.loginService.login(email, password).subscribe(
            (response) => {
              console.log('Login successful:', response);
              localStorage.setItem('token', response.token); // Store token in local storage
              this.router.navigate(['/dashboard']); // Redirect to dashboard
            },
            (error) => {
              console.error('Login failed:', error);
              this.errorMessage = error.error.message || 'Login failed. Please try again.';
            }
          );
        }
    }

}
