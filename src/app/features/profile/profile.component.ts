import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <p>
      profile works!
    </p>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private toastService: NbToastrService) {

  }

  ngOnInit() {
    this.toastService.show('Success', 'xxx');
  }
}
