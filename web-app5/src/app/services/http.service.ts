import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDepartment } from '../models/department.model';
import { IEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  post<T>(arg0: string, leave: { employeeId: number; fromDate: string; toDate: string; reason: string; }) {
    throw new Error('Method not implemented.');
  }
  get<T>(arg0: string) {
    throw new Error('Method not implemented.');
  }

  // ✅ Base URLs
  private departmentUrl = `${environment.apiUrl}/Department`;
  private employeeUrl = `${environment.apiUrl}/Employee`;
  private leaveUrl = `${environment.apiUrl}/Leave`;
  private attendanceUrl = `${environment.apiUrl}/Attendance`;
  private salaryUrl = `${environment.apiUrl}/Salary`;
  private dashboardUrl = `${environment.apiUrl}/Dashboard`;

  constructor(private http: HttpClient) {}

  // =================== Departments =====================
  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.departmentUrl, { withCredentials: true });
  }

  addDepartment(name: string): Observable<IDepartment> {
    return this.http.post<IDepartment>(this.departmentUrl, { name }, { withCredentials: true });
  }

  updateDepartment(id: number, name: string): Observable<IDepartment> {
    return this.http.put<IDepartment>(`${this.departmentUrl}/${id}`, { name }, { withCredentials: true });
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.departmentUrl}/${id}`, { withCredentials: true });
  }

  // =================== Employees =======================
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.employeeUrl, { withCredentials: true });
  }

  getEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.employeeUrl}/${id}`, { withCredentials: true });
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.employeeUrl, employee, { withCredentials: true });
  }

  updateEmployee(id: number, employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.employeeUrl}/${id}`, employee, { withCredentials: true });
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.employeeUrl}/${id}`, { withCredentials: true });
  }

  // =================== Leave ===========================
  getLeaves(): Observable<any[]> {
    return this.http.get<any[]>(this.leaveUrl, { withCredentials: true });
  }

  applyLeave(data: any): Observable<any> {
    return this.http.post<any>(this.leaveUrl, data, { withCredentials: true });
  }

  updateLeaveStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.leaveUrl}/${id}`, { status }, { withCredentials: true });
  }

  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.leaveUrl}/${id}`, { withCredentials: true });
  }

  // =================== Attendance ======================
  getAttendance(): Observable<any[]> {
    return this.http.get<any[]>(this.attendanceUrl, { withCredentials: true });
  }

  markAttendance(data: any): Observable<any> {
    return this.http.post<any>(this.attendanceUrl, data, { withCredentials: true });
  }

  getAttendanceByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.attendanceUrl}/employee/${employeeId}`, { withCredentials: true });
  }

  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.attendanceUrl}/${id}`, { withCredentials: true });
  }

  // =================== Payroll =========================
  getSalaries(): Observable<any[]> {
    return this.http.get<any[]>(this.salaryUrl, { withCredentials: true });
  }

  addSalary(data: any): Observable<any> {
    return this.http.post<any>(this.salaryUrl, data, { withCredentials: true });
  }

  deleteSalary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.salaryUrl}/${id}`, { withCredentials: true });
  }

  // =================== Dashboard =======================
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.dashboardUrl}/stats`, { withCredentials: true });
  }
}