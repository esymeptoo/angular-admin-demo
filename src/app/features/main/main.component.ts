import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeModule } from '@theme/theme.module';
import { NbSidebarService } from '@nebular/theme';

import { mainRoutes } from 'app.routes';
import { ZRoute } from 'permissions/guards';
import { UserService } from 'services/user/user.service';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    ThemeModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  menuItems: any[] = [];

  userInfo: any

  constructor(private sidebarService: NbSidebarService, private userService: UserService) {
    this.userInfo = userService.userInfo;

    this.menuItems = this.recombineMenuItems(mainRoutes);
  }

  handleClickMenuToggle() {
    this.sidebarService.toggle();
  }

  // 重组menu
  private recombineMenuItems(menus: ZRoute[]): ZRoute[] {
    return menus.reduce<ZRoute[]>((a, b) => {
      const { title, permission, children = [] } = b;
      if (!title) return a;
      if (children.length) {
        const newChildren = this.recombineMenuItems(children);
        // 存在有权限子路由且本身有权限
        if (newChildren.length && (!permission || this.userService.hasPermission(permission))) {
          b.children = newChildren;
          return a.concat(b);
        }
        return a;
      }
      if (!permission || this.userService.hasPermission(permission)) return a.concat(b);
      return a;
    }, []);
  }
}
