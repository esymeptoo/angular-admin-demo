import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

import { ThemeModule } from '@theme/theme.module';
import { EmployeeService } from 'services/employee/employee.service';
import { IEmployee } from 'services/apis/employee-api/employee-api.service';

@Component({
  selector: 'app-table-list',
  imports: [MatTableModule, ThemeModule, MatPaginatorModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent implements OnInit {
  displayedColumns = ['id', 'age', 'name', 'address', 'gender', 'Action'];
  filters = new BehaviorSubject({
    pageNum: 0,
    pageSize: 10,
  });

  filters$ = this.filters.asObservable();
  loading = false;
  total = 0;
  list!: MatTableDataSource<IEmployee>;
  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.loading = true;
    this.filters$.subscribe((searchParams) => {
      this.employeeService.getEmployeeList({
        ...searchParams,
        pageNum: searchParams.pageNum + 1,
      }).subscribe((employees) => {
        this.loading = false;
        this.list = new MatTableDataSource(employees.list);
        this.total = employees.total;
      })
    });
  }

  get SearchParams() {
    return this.filters.value;
  }

  handlePageSelect = (page: PageEvent) => {
    this.loading = true;
    this.filters.next({
      pageNum: page.pageSize * (page.pageIndex + 1) > this.total ? 0 : page.pageIndex,
      pageSize: page.pageSize,
    });
  }
}
