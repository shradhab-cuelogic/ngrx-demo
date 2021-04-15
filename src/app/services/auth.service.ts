import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../appInterface/authResponse.interface';
import { Subject } from 'rxjs';
import { User } from '../appModel/user.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();
  constructor(private http: HttpClient) { }

  getUserData() {
   return this.http.get('https://my-app-b216f-default-rtdb.firebaseio.com/users.json');
  };

  signUp(email, password) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${'AIzaSyCiBbX547cCu_YT04kA8HnJpw9RLG6igxo'}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      // catchError({
      //   console.log(err);
      // }),
      tap(res=>{
        this.authenticatedUSer(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  };

  signIn(email, password) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${'AIzaSyCiBbX547cCu_YT04kA8HnJpw9RLG6igxo'}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(res=>{
        this.authenticatedUSer(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  };

  private authenticatedUSer(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email,userId, token, expirationDate);
    console.log('USER', user);
    this.user.next(user);
  }
}
