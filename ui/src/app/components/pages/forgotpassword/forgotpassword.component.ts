import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../../static/navbar/navbar.component';


@Component({
    selector: 'app-forgotpassword',
    imports: [NavbarComponent, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './forgotpassword.component.html',
    styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
    userForm: FormGroup;

    constructor(){
        this.userForm = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email])
        })
    }

    onSubmit(form: any){
        if(form.valid){
            console.log(this.userForm.value);
        }
    }
}
