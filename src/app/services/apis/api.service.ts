import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

import { ToastService } from 'services/toast/toast.service';

import { ApiResponse } from './type';

export type QueryParams = HttpParamsOptions['fromObject'];

const noToastServiceInit = () => {
  try {
    inject(ToastService);
    return false;
  } catch (e) {
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private extractData<T>(res: HttpResponse<T>) {
    const { url, body } = res;
    if (!body) throw new Error('No response body');
    const resData = body as unknown as ApiResponse<T>;
    if (resData.code !== 0) {
      throw new Error(resData.message);
    }
    return resData.data;
  }

  constructor(private http: HttpClient, private toastService: ToastService) { }

  request<T>(method: string, url: string, params?: QueryParams, body?: unknown) {
    return this.http.request<T>(method, url, {
      observe: 'response',
      params: new HttpParams({ fromObject: params }),
      body,
    }).pipe(
      map(this.extractData),
      catchError(this.handleError.bind(this)),
    );
  }

  get<T>(url: string, queryParams?: QueryParams) {
    return this.request<T>('GET', url, queryParams);
  }

  post<T>(url: string, body?: unknown, queryParams?: QueryParams) {
    return this.request<T>('POST', url, queryParams, body);
  }

  private handleError(err: Error) {
    // TODO: classify error type
    // 1. Network Error
    // 2. api Error 401/403   interceptor拦截
    // 3. Timeout Error
    // 4. Server Error 400
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        console.error('Network error: Please check your internet connection.');
        if (noToastServiceInit()) {
          setTimeout(() => {
            this.toastService.danger({
              message: err.message,
              title: 'Error',
            });
          });
        } else {
          this.toastService.danger({
            message: err.message,
            title: 'Error',
          });
        }
        return throwError(
          () =>
            new Error('Network error: Please check your internet connection.'),
        );
      }
      console.error(`HTTP error: ${err.status} ${err.message}`);
      return throwError(
        () => new Error(`HTTP error: ${err.status} ${err.message}`),
      );
    }
    return throwError(() => err);
  }
}
