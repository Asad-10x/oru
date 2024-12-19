import { Component  } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../static/navbar/navbar.component';


@Component({
    selector: 'app-login',
    imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    userForm: FormGroup;

    constructor() {
        this.userForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)])
        })
    }

    onSubmit(form: any){
        if(form.valid){
            console.log(this.userForm);
        }
    }

}
