import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/appInterface/authResponse.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;
  Form: FormGroup
  authObservable: Observable<AuthResponse>

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode)
  }

  createForm() {
    this.Form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['']
    });
  }

  onSubmit() {
    if (this.Form.valid) {
      const email = this.Form.value.email;
      const password = this.Form.value.password;
      
      if (this.loginMode) {
        this.authObservable = this.authService.signIn(email, password)
        this.formReset();
      } else {
        this.authObservable = this.authService.signUp(email, password);
        this.formReset();
      }

      this.authObservable.subscribe( res => {
        console.log('Res', res);
        this.router.navigate(['dashboard'])
      },error=>{
        console.log('Error', error);
      })

    }
  }

  formReset() {
    this.Form.reset();
  }
}
