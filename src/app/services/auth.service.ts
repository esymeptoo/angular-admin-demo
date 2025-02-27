import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // 健全失败 处理401报错 跳转到登录页
  handleUnAuthorizationError() {
    this.router.navigateByUrl('/login', {
      replaceUrl: true,
    })
  }

  // 无权限访问
  handleAccessDenied() {
    this.router.navigateByUrl('not-found', {
      replaceUrl: true,
    });
  }
}
