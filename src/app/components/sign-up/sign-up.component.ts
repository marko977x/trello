import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { isEmpty } from 'src/app/services/object-checker';
import { SetLoggedUser } from 'src/app/root-store/ui-store/actions';
import { SignUp } from 'src/app/root-store/user-store/actions';
import { DASHBOARD_URL } from 'src/app/app-routing.module';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login/login.component.scss']
})
export class SignUpComponent implements OnInit {
  formData: FormData;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);

  constructor(
    private store$: Store<RootState>,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    if(!this.checkInputs()) return;

    let userId: string = this.authService.signUp(
      this.email.value, this.password.value, this.username.value);

    if(isEmpty(userId)) {
      this.email.setErrors({'email': true});
    }
    else {
      this.router.navigate(['/' + DASHBOARD_URL]);
    }
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }

  checkInputs(): boolean {
    let result: boolean = true;
    if(isEmpty(this.email.value)) {
      this.email.setErrors({email: true});
      result = false;
    }
    if(isEmpty(this.password.value)) {
      this.email.setErrors({password: true});
      result = false;
    }
    if(isEmpty(this.username.value)) {
      this.email.setErrors({username: true});
      result = false;
    }
    return result;
  }

}
