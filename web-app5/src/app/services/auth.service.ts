import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthToken } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  // ------------ LOGIN API ------------
  login(email: string, password: string): Observable<IAuthToken> {
    return this.http.post<IAuthToken>(
      `${environment.apiUrl}/Auth/Login`,
      { email, password },
      { withCredentials: true } // ✅ send credentials like cookies
    );
  }

  // ------------ SAVE TOKEN + ROLE ------------
  saveToken(token: IAuthToken): void {
    // Save the full token object
    localStorage.setItem('auth', JSON.stringify(token));

    // Save JWT for interceptor
    localStorage.setItem('token', token.token);

    // Save role (backend may return string or array)
    const role = Array.isArray(token.roles) ? token.roles[0] : token.roles;
    localStorage.setItem('role', role);
  }

  // ------------ LOGOUT ------------
  onLogout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login');
  }

  // ------------ CHECK LOGIN STATUS ------------
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ------------ CHECK EMPLOYEE ROLE ------------
  get isEmployee(): boolean {
    if (!this.isLoggedIn) return false;

    const role = localStorage.getItem('role');
    return role === 'Employee';
  }
}
