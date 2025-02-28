import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { ThemeModule } from '@theme/theme.module';
import { of, catchError } from 'rxjs';

import { routes } from 'app.routes';
import { httpInterceptorProviders } from 'services/apis/http-interceptors';
import { UserService } from 'services/user/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      deps: [UserService],
      multi: true,
    },
    provideHttpClient(httpInterceptorProviders),
    ...(ThemeModule.forRoot().providers ?? []),
  ],
};

export function initializeUser(userService: UserService) {
  return () => userService.fetchUserInfo()
    .pipe(
      catchError(() => of(null)),
    );
}
