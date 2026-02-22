import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeedashboardComponent } from './pages/employeedashboard/employeedashboard.component';

import { LeaveComponent } from './leave/leave.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { PayrollComponent } from './payroll/payroll.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'table',
    component: TableComponent
  },

  {
    path: 'leave',
    component: LeaveComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'payroll',
    component: PayrollComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'employee-dashboard',
    component: EmployeedashboardComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];