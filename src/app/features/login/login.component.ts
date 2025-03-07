import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {
  takeLast,
  take,
  finalize,
  of,
  debounceTime,
  switchMap,
  catchError,
  Observable,
  mergeMap,
  distinctUntilChanged,
  tap,
  Subject,
  BehaviorSubject,
  first,
} from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) {

  }

  onSubmit() {
    this.loading = true;
    this.userApiService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe((res) => {
        // @ts-ignore
        localStorage.setItem('angular-demo-system-token', res?.token);
        // this.router.navigateByUrl('profile', {
        //   replaceUrl: true,
        // })
        location.href = getRefreshHomeUrl();
      })
  }

  handleInputChange = (e: any) => {
    console.log(e.target.value, this.loginForm.get('username'));
  }

  usernameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return control.valueChanges.pipe(
        // 防抖时间，单位毫秒
        debounceTime(1000),
        // 过滤掉重复的元素
        distinctUntilChanged(),
        // 调用服务, 获取结果
        switchMap((username) => this.checkUsernameAvailability(username)),
        catchError(() => of(null)),  // 防止错误中断流
        first(),
      );
    };
  }

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
      username: ['', [Validators.required, Validators.minLength(3)], this.usernameAsyncValidator()],
      password: '',
    }), {
      validators: [
        this.validatePassword,
      ],
    });
  }
}
