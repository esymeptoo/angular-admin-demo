import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

import { ThemeModule } from '@theme/theme.module';


@Component({
  selector: 'app-profile',
  imports: [ThemeModule],
  template: `
    <p>
      profile works!
      <button nbButton status="primary" (click)="handleClick()">查看Dashboard</button>
    </p>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private toastService: NbToastrService, private router: Router) {

  }

  ngOnInit() {
    this.toastService.show('Success', 'xxx');
  }

  handleClick = () => {
    this.router.navigateByUrl('dashboard');
  }
}
