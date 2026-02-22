import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from '../../components/table/table.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HttpService } from '../../services/http.service';
import { IEmployee } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, TableComponent, MatButtonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private httpService = inject(HttpService);
  private dialog = inject(MatDialog);

  employeeList: IEmployee[] = [];
  showCols: string[] = ['id', 'name', 'email', 'phone', 'action'];

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Load all employees
  loadEmployees(): void {
    this.httpService.getEmployees().subscribe({
      next: (data) => {
        this.employeeList = data;
      },
      error: () => {
        alert('Failed to fetch employees.');
      }
    });
  }

  // Add employee (open form)
  add(): void {
    this.openFormDialog();
  }

  // Edit employee
  edit(emp: IEmployee): void {
    this.openFormDialog(emp.id);
  }

  // Delete employee
  delete(emp: IEmployee): void {
    if (!confirm(`Are you sure you want to delete ${emp.name}?`)) return;

    this.httpService.deleteEmployee(emp.id).subscribe({
      next: () => {
        alert('Employee deleted successfully.');
        this.loadEmployees();
      },
      error: () => {
        alert('Failed to delete employee.');
      }
    });
  }

  // Open dialog for add/edit
  private openFormDialog(employeeId?: number): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      panelClass: 'm-auto',
      data: employeeId ? { employeeId } : null
    });

    dialogRef.afterClosed().subscribe(() => this.loadEmployees());
  }
}
