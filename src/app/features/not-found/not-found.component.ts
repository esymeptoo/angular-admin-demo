import { Component } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [
    NbButtonModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private router: Router) {
  }
  back() {
    this.router.navigateByUrl('/', {
      replaceUrl: true,
    })
  }
}
