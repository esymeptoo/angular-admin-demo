import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-fourth-menu',
  imports: [ThemeModule],
  templateUrl: './fourth-menu.component.html',
  styleUrl: './fourth-menu.component.css'
})
export class FourthMenuComponent {
  constructor(private router: Router) {
  }
  handleBack = () => {
    this.router.navigateByUrl('first-menu/second/third');
  }
}
