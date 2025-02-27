import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Permissions } from '../../../app.routes';

interface LoginResponse {
  token: string;
}

export interface IUserInfo {
  username: string;
  email: string;
  permissions: Permissions[];
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private apiService: ApiService) { }

  login(loginBody: any): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/user/login', loginBody);
  }

  getUser(): Observable<IUserInfo> {
    return this.apiService.get('/user/info');
  }
}
