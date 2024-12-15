import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../static/navbar/navbar.component';

@Component({
    selector: 'app-signup',
    imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    userForm:  FormGroup;

    constructor(){
        this.userForm = new FormGroup({
            f_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
            l_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('',[Validators.required, Validators.minLength(6)]),
            role: new FormControl(false),
        })
    }

    onSubmit(form: any){
        if(form.valid){
            console.log(this.userForm);
        }

    }
}
