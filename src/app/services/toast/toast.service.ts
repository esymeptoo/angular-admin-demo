import { Injectable } from '@angular/core';
import { NbToastrService, NbToastrConfig, NbToastRef } from '@nebular/theme';

type ToastType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'default';

interface ToastOptions {
  message: unknown;
  title?: unknown;
  config?: Partial<NbToastrConfig>;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultTitles: Record<ToastType, string> = {
    success: 'Success',
    info: 'Info',
    warning: 'Warning',
    danger: 'Error',
    primary: 'Primary',
    default: 'Default',
  };

  constructor(private toastrService: NbToastrService) {}

  private showToast(type: ToastType, options: ToastOptions): NbToastRef {
    const { title, message, config } = options;
    const finalTitle = title || this.defaultTitles[type];
    return this.toastrService[type](message, finalTitle, config);
  }

  success(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('success', toastOptions);
  }

  info(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('info', toastOptions);
  }

  warning(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('warning', toastOptions);
  }

  danger(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('danger', toastOptions);
  }

  primary(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('primary', toastOptions);
  }

  default(toastOptions: ToastOptions): NbToastRef {
    return this.showToast('default', toastOptions);
  }
}
