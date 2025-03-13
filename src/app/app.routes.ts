import { Routes, Route } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

import { LoginComponent } from 'features/login/login.component';
import { MainComponent } from 'features/main/main.component';
import { DashboardComponent } from 'features/dashboard/dashboard.component';
import { ProfileComponent } from 'features/profile/profile.component';
import { ComplexFormComponent } from 'features/complex-form/complex-form.component';
import { TableListComponent } from 'features/table-list/table-list.component';

import { SettingsMainComponent } from 'features/settings/settings-main/settings-main.component';
import { SettingsOneComponent } from 'features/settings/settings-one/settings-one.component';
import { SettingsTwoComponent } from 'features/settings/settings-two/settings-two.component';

import { DynamicFormComponent } from 'features/dynamic-form/dynamic-form.component';
import { JspdfComponent } from 'features/jspdf/jspdf.component';

import { MultipleMenuComponent } from 'features/multiple-menu/multiple-menu.component';
import { SecondMenuComponent } from 'features/multiple-menu/containers/second-menu/second-menu.component';
import { ThirdMenuComponent } from 'features/multiple-menu/containers/third-menu/third-menu.component';
import { FourthMenuComponent } from 'features/multiple-menu/containers/fourth-menu/fourth-menu.component';

import { NotFoundComponent } from 'features/not-found/not-found.component';
import { permissionGuards, mainGuards, ZRoute } from 'permissions/guards';

export enum Permissions {
  PROFILE = 'PROFILE',
  DASHBOARD = 'DASHBOARD',
  COMPLEX_FORM = 'COMPLEX_FORM',
  TABLE_LIST = 'TABLE_LIST',
  SETTING = 'SETTING',
  SETTING_ONE = 'SETTING_ONE',
  SETTING_TWO = 'SETTING_TWO',
  DYNAMIC_FORM = 'DYNAMIC_FORM',
}

export const mainRoutes: ZRoute[] = [
  {
    path: 'profile',
    title: '个人信息',
    icon: 'person-outline',
    component: ProfileComponent,
    pathMatch: 'prefix',
    link: '/profile',
    permission: Permissions.PROFILE,
    canActivate: [permissionGuards(Permissions.PROFILE)],
  },
  {
    title: '仪表盘',
    path: 'dashboard',
    icon: 'person-outline',
    component: DashboardComponent,
    pathMatch: 'prefix',
    link: '/dashboard',
    permission: Permissions.DASHBOARD,
    canActivate: [permissionGuards(Permissions.DASHBOARD)],
  },
  {
    title: '复杂表单',
    path: 'complex-form',
    icon: 'person-outline',
    component: ComplexFormComponent,
    pathMatch: 'prefix',
    link: '/complex-form',
    permission: Permissions.COMPLEX_FORM,
    canActivate: [permissionGuards(Permissions.COMPLEX_FORM)],
  },
  {
    title: '表格',
    path: 'table-list',
    icon: 'person-outline',
    component: TableListComponent,
    pathMatch: 'prefix',
    link: '/table-list',
    permission: Permissions.TABLE_LIST,
    canActivate: [permissionGuards(Permissions.TABLE_LIST)],
  },
  {
    path: 'settings',
    title: '系统设置',
    icon: 'settings-outline',
    component: SettingsMainComponent,
    pathMatch: 'prefix',
    permission: Permissions.SETTING,
    children: [
      {
        path: 'one',
        title: '系统设置1',
        icon: 'person-outline',
        component: SettingsOneComponent,
        pathMatch: 'prefix',
        link: '/settings/one',
        permission: Permissions.SETTING_ONE,
        canActivate: [permissionGuards(Permissions.SETTING_ONE)],
      },
      {
        path: 'two',
        title: '系统设置2',
        icon: 'person-outline',
        component: SettingsTwoComponent,
        pathMatch: 'prefix',
        link: '/settings/two',
        permission: Permissions.SETTING_TWO,
        canActivate: [permissionGuards(Permissions.SETTING_TWO)],
      },
    ],
  },
  {
    title: '动态表单',
    path: 'dynamic-form',
    icon: 'person-outline',
    component: DynamicFormComponent,
    pathMatch: 'prefix',
    link: '/dynamic-form',
  },
  {
    title: 'PDF下载',
    path: 'pdf-download',
    icon: 'person-outline',
    component: JspdfComponent,
    pathMatch: 'prefix',
    link: '/pdf-download',
  },
  {
    path: 'first-menu',
    title: '一级菜单',
    icon: 'settings-outline',
    component: MultipleMenuComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: 'second',
        title: '二级菜单',
        icon: 'person-outline',
        component: SecondMenuComponent,
        pathMatch: 'prefix',
        link: '/first-menu/second',
      },
      {
        path: 'second/detail/:id',
        title: '三级菜单',
        component: ThirdMenuComponent,
        pathMatch: 'prefix',
        icon: 'person-outline',
        hidden: true,
        parentPath: 'second',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: mainRoutes,
    canActivate: [mainGuards(mainRoutes)],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
