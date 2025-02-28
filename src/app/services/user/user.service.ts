import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { UserApiService } from 'services/apis/user-api/user-api.service';
import { IUserInfo } from 'services/apis/user-api/user-api.service';
import { Permissions } from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userApiService: UserApiService) { }

  userInfo!: IUserInfo;

  fetchUserInfo() {
    return this.userApiService.getUser()
      .pipe(
        tap((res) => {
          this.userInfo = res;
        }),
      );
  }

  hasPermission(permission: Permissions) {
    return this.userInfo?.permissions?.includes(permission);
  }
}
