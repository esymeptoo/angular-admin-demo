import { Injectable } from '@angular/core';
import { take, BehaviorSubject } from 'rxjs';

import { EmployeeApiService, IEmployee, IPageData } from 'services/apis/employee-api/employee-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // employeeList = new BehaviorSubject<IPageData<IEmployee>>({} as any);
  // employeeList$ = this.employeeList.asObservable();
  constructor(private employeeApi: EmployeeApiService) { }

  getEmployeeList(filters: any) {
    return this.employeeApi.getEmployeeList(filters)
      // .pipe(take(1))
      // .subscribe((data) => {
      //   this.employeeList.next(data);
      // })
  }
}
