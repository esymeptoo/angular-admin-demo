import { CanActivateFn, Route, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from 'services/user/user.service';
import { AuthService } from 'services/auth.service';
import { NbMenuItem } from '@nebular/theme';
import { Permissions } from '../app.routes';

export type ZRoute = Omit<Route, 'children'> & Partial<Omit<NbMenuItem, 'children'>> & {
  permission?: Permissions;
  children?: ZRoute[];
};

export const permissionGuards: (permission: Permissions) => CanActivateFn = (permission) => {
  return () => {
    const userService = inject(UserService);
    const authService = inject(AuthService);

    if (userService.hasPermission(permission)) return true;
    authService.handleAccessDenied();
    return false;
  }
}

const getFirstAccessMenu = (routes: ZRoute[], userService: UserService) => {
  for (let i = 0; i < routes.length; i++) {
    const { title, permission, children = [] } = routes[i];
    if (!title) continue;
    if (children.length) {
      if (!permission || userService.hasPermission(permission)) {
        const firstAccessMenu: any = getFirstAccessMenu(children, userService);
        if (firstAccessMenu) return firstAccessMenu;
      }
    } else if (!permission || userService.hasPermission(permission)) {
      return routes[i];
    }
  }
}

let hasMainRouteVisited = false;

export const mainGuards: (routes: any[]) => CanActivateFn = (routes) => (route) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (route.firstChild) {
    const validMenu = getFirstAccessMenu(routes, userService);
    if (validMenu) {
      if (!hasMainRouteVisited) {
        router.navigateByUrl(validMenu.link, {
          replaceUrl: true,
        })
      }
      hasMainRouteVisited = true;
      return true;
    }
    authService.handleAccessDenied();
    return false;
  }
  return true;
}
