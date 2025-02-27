import { ModuleWithProviders, NgModule } from '@angular/core';
import type { NbDialogConfig, NbToastrConfig } from '@nebular/theme';

import {
  NbThemeModule,
  NbMenuModule,
  NbLayoutModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbCardModule,
  NbTreeGridModule,
  NbUserModule,
  NbTabsetModule,
  NbListModule,
  NbInputModule,
  NbFormFieldModule,
  NbDialogModule,
  NbToastrModule,
  NbCheckboxModule,
  NbRadioModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAccordionModule,
  NbSpinnerModule,
  NbIconLibraries,
  NbDatepickerModule,
  NbButtonGroupModule,
  NbRouteTabsetModule,
  NbTagModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbDateFnsDateModule } from '@nebular/date-fns';

export const NB_DIALOG_DEFAULT_CONFIG: Partial<NbDialogConfig> = {
  closeOnEsc: false,
  closeOnBackdropClick: false,
};

export const NB_TOASTR_DEFAULT_CONFIG: Partial<NbToastrConfig> = {
  duration: 5000,
};

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbButtonGroupModule,
  NbSelectModule,
  NbIconModule,
  NbCardModule,
  NbTreeGridModule,
  NbUserModule,
  NbEvaIconsModule,
  NbTabsetModule,
  NbListModule,
  NbInputModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbRadioModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAccordionModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbDateFnsDateModule,
  NbRouteTabsetModule,
  NbTagModule,
];

@NgModule({
  imports: [...NB_MODULES],
  exports: [...NB_MODULES],
})
export class ThemeModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // registerSaraPackIcon(this.iconLibraries);
  }

  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...(NbThemeModule.forRoot({
          name: 'default',
        }).providers ?? []),
        ...(NbMenuModule.forRoot().providers ?? []),
        ...(NbSidebarModule.forRoot().providers ?? []),
        ...(NbDialogModule.forRoot(NB_DIALOG_DEFAULT_CONFIG).providers ?? []),
        ...(NbToastrModule.forRoot(NB_TOASTR_DEFAULT_CONFIG).providers ?? []),
        ...(NbDatepickerModule.forRoot().providers ?? []),
      ],
    };
  }
}

export * from '@nebular/theme';
