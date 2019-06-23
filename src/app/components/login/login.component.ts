import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { selectAllUsers } from 'src/app/root-store/user-store/selectors';
import { isEmpty } from 'src/app/services/object-checker';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SetLoggedUser } from 'src/app/root-store/ui-store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private store$: Store<RootState>,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  login() {
    let userId: string = this.authService.login(this.email.value, this.password.value);
    if(!isEmpty(userId)) {
      this.router.navigate(['/dashboard']);
      this.store$.dispatch(new SetLoggedUser(userId));
    }
    else {
      this.email.setErrors({'email': true});
    } 
  }

}
