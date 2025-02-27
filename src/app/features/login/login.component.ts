import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { take, finalize } from 'rxjs';
import { Router } from '@angular/router';

import { ThemeModule } from '@theme/theme.module';
import { UserApiService } from 'services/apis/user-api/user-api.service';

const getRefreshHomeUrl = () => {
  return `${location.protocol}//${location.host}${location.pathname.replace('login', '')}`;
}

@Component({
  selector: 'app-login',
  imports: [ThemeModule, FormsModule, ReactiveFormsModule],
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

  ngOnInit() {
    this.loginForm = this.formBuilder.group(({
      username: '',
      password: '',
    }));
  }
}
