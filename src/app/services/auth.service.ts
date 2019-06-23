import { Injectable } from '@angular/core';
import { RootState } from '../root-store/root-state';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../root-store/user-store/selectors';
import { isEmpty } from './object-checker';
import { User } from '../models/user';
import { SignUp } from '../root-store/user-store/actions';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store$: Store<RootState>) {}

  login(email: string, password: string): string {
    let userId: string = "";
    this.store$.select(selectAllUsers).subscribe(users => {
      if(!isEmpty(users)) {
        let user: User = users.find(user => user.email === email);
        if(!isEmpty(user)) userId = user.id;
      }
    });
    return userId;
  }

  signUp(email: string, password: string, username: string) {
    if(this.isEmailDuplicate(email)) return "";
    let userId: string = uuid.v4();
    this.store$.dispatch(new SignUp({
      boards: [],
      email: email,
      id: userId,
      password,
      username
    }));

    return userId;
  }

  isEmailDuplicate(email: string) {
    let result: boolean = false;
    this.store$.select(selectAllUsers).subscribe(users => {
      if(!isEmpty(users.find(user => user.email === email))) result = true;
    });
    return result;
  }
}
