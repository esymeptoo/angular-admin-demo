import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThemeModule } from '@theme/theme.module';

@Component({
  selector: 'app-settings-main',
  imports: [
    // RouterOutlet,
    ThemeModule,
  ],
  templateUrl: './settings-main.component.html',
  styleUrl: './settings-main.component.css'
})
export class SettingsMainComponent implements OnInit {
  destroyRef$ = inject(DestroyRef);
  activeTab?: string
  tabs = [
    {
      link: '/settings/one',
      title: 'Setting one',
      route: 'one',
      // disabled: true,
    },
    {
      link: '/settings/two',
      title: 'Setting two',
      route: 'two',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    // route.url.subscribe(() => {
    //   const curPath = route.snapshot.firstChild?.routeConfig?.path;
    //   if (curPath) {
    //     this.activeTab = this.tabs.find((item) => item.link.endsWith(curPath))?.link;
    //   }
    // });
    // // 路由变化
    // router.events
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef$),
    //     filter((event) => event instanceof NavigationEnd),
    //   )
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.activeTab = event.urlAfterRedirects;
    //     }
    //   });
  }

  ngOnInit() {
    // console.log(this.route.snapshot.url)
  }
}
