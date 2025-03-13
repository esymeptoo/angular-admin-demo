import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-second-menu',
  imports: [ThemeModule],
  templateUrl: './second-menu.component.html',
  styleUrl: './second-menu.component.css'
})
export class SecondMenuComponent {
  constructor(private router: Router) {

  }
  handleGotoDetail = () => {
    this.router.navigateByUrl('/first-menu/second/detail/12')
  }
}
