import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { API_USERS_URL } from './repository.service';
import { Observable } from 'rxjs';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private repository: RepositoryService) {}

  addUser(user: User): Observable<User> {
    return this.repository.addOne<User>(user, API_USERS_URL);
  }
}
