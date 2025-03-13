import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { ThemeModule } from '@theme/theme.module';
import { NbSidebarService } from '@nebular/theme';
// @ts-ignore
import { cloneDeep } from 'lodash';

import { mainRoutes } from 'app.routes';
import { ZRoute } from 'permissions/guards';
import { UserService } from 'services/user/user.service';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    ThemeModule,
    NgIf,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  menuItems: any[] = [];

  userInfo: any;
  breadcrumbs: (ZRoute & { fullPath: string })[] = [];

  constructor(
    private sidebarService: NbSidebarService,
    private userService: UserService,
    private breadcrumb: BreadcrumbService,
    private router: Router,
  ) {
    this.userInfo = userService.userInfo;

    this.menuItems = this.recombineMenuItems(cloneDeep(mainRoutes));
    this.breadcrumb.composeRoutesChain(mainRoutes.filter(({ title }) => !!title));
    this.breadcrumb.breadcrumbSubject$.subscribe((value: any[]) => {
      this.breadcrumbs = value;
    });
  }

  handleClickMenuToggle() {
    this.sidebarService.toggle();
  }

  // 重组menu 把带有 hidden的菜单干掉 不展示
  private recombineMenuItems(menus: ZRoute[]): ZRoute[] {
    return menus.reduce<ZRoute[]>((a, b) => {
      const { title, permission } = b;
      let { children = [] } = b;
      if (!title) return a;
      // 子菜单需要隐藏
      children = children.filter((item) => !item.hidden);
      b.children = children.length ? children : undefined;
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

  handleBreadcrumbItemClick = (path: string, index: number) => {
    if (index === 0 || index === this.breadcrumbs.length - 1) return;
    this.router.navigateByUrl(path);
  }
}
