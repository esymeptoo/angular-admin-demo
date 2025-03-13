import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-third-menu',
  imports: [RouterOutlet, ThemeModule],
  templateUrl: './third-menu.component.html',
  styleUrl: './third-menu.component.css'
})
export class ThirdMenuComponent {
  constructor(private router: Router) {
  }
  back = () => {
    this.router.navigateByUrl('first-menu/second')
  }
}
