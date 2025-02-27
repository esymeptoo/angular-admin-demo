import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo';
}
