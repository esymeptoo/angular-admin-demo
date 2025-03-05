import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

export interface IEmployee {
  id: number;
  name: string;
  age: number;
  gender: 0 | 1;
}

export interface IPageData<T> {
  total: number;
  pageNum: number;
  pageSize: number;
  list: T[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private apiService: ApiService) { }

  getEmployeeList(params: any) {
    return this.apiService.get<IPageData<IEmployee>>('/employee/list', params);
  }
}
