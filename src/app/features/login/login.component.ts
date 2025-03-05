import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { take, finalize, of, debounceTime, switchMap, catchError, Observable, mergeMap, distinctUntilChanged, tap, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// @ts-ignore
import debounce from 'lodash.debounce';

import { ThemeModule } from '@theme/theme.module';
import { UserApiService } from 'services/apis/user-api/user-api.service';

const getRefreshHomeUrl = () => {
  return `${location.protocol}//${location.host}${location.pathname.replace('login', '')}`;
}

@Component({
  selector: 'app-login',
  imports: [ThemeModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  private usernameSubject = new BehaviorSubject<string>('');
  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) {

  }

  onSubmit() {
    this.loading = true;
    this.userApiService.login(this.loginForm.value)
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe((res) => {
        // @ts-ignore
        localStorage.setItem('angular-demo-system-token', res?.token);
        // this.router.navigateByUrl('profile', {
        //   replaceUrl: true,
        // })
        location.href = getRefreshHomeUrl();
      })
  }

  usernameAsyncValidator = (control: any) => {
    return of(control.value).pipe(
      debounceTime(3500),  // 延迟3500ms
      switchMap((username) => this.checkUsernameAvailability(username)),  // 执行异步请求
      catchError(() => of(null))  // 防止错误中断流
    );
  };

  checkUsernameAvailability(username: string): Observable<any> {
    // 模拟API请求：用户名 "admin" 已被注册
    return username === 'admin'
      ? of({ usernameTaken: true })
      : of(null);
  }

  get passwordError() {
    return this.loginForm.getError('passwordError');
  }

  validatePassword(formGroup: FormGroup) {
    const value = formGroup.get('password')?.value;
    if (!value) {
      return { passwordError: 'Password is required' };
    }
    return null;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(({
      username: ['', [Validators.required, Validators.minLength(3)], this.usernameAsyncValidator],
      password: '',
    }), {
      validators: [
        this.validatePassword,
      ],
    });
  }
}
