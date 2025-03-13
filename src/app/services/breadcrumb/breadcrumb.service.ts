import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, BehaviorSubject } from 'rxjs';
import { pathToRegexp } from 'path-to-regexp';

import { ZRoute } from 'permissions/guards';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  routesChain: any[] = [];
  breadcrumbSubject = new BehaviorSubject<ZRoute[]>([]);
  breadcrumbSubject$ = this.breadcrumbSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)  // 只关心 NavigationEnd 事件
      )
      .subscribe(event => {
        console.log('路由变化:', event.url);
        this.updateBreadcrumbs(event.url);
      });
  }

  composeRoutesChain = (routes: ZRoute[]) => {
    const result: any[] = [];
    const recurse = (r: ZRoute[], pathChain: string, parentPath?: string,) => {
      r.forEach((item) => {
        const { path, children = [], parentPath: fixedParentPath } = item;
        const fullPath = `${pathChain}/${path}`;
        result.push({
          ...item,
          parentPath: fixedParentPath || parentPath,
          fullPath,
        });
        recurse(children, fullPath, path);
      });
    }

    recurse(routes, '');

    this.routesChain = result;
  }

  updateBreadcrumbs = (url: string) => {
    const matched = this.routesChain.find(({ fullPath }) => {
      return pathToRegexp(fullPath).regexp.exec(url);
    });
    if (!matched) return;
    const findParent = (currentRoute: ZRoute, arr: ZRoute[]) => {
      const { parentPath } = currentRoute;
      if (!parentPath) return arr;
      const parent = this.routesChain.find(({ path }) => path === parentPath);
      if (!parent) return arr;
      arr.unshift(parent);
      return findParent(parent, arr);
    }
    this.breadcrumbSubject.next(findParent(matched, [matched]));
  }
}
