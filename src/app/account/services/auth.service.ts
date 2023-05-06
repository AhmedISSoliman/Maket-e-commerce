import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/environments/urls';
import { LoginData } from '../models/login-form.model';
import { Observable } from 'rxjs';
import { LoginFormResponse } from '../models/response-login-form.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(loginData: any) {
    console.log(loginData)
    return this.http.post(`${environment.baseUrl}${ApiPaths.logIn}`, loginData)
  }
}
