import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { IDepartment } from '../../models/department.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  private httpService = inject(HttpService);

  departments: IDepartment[] = [];
  isFormOpen = false;
  isEdit = false;
  departmentName: string = '';
  editId: number = 0;

  ngOnInit(): void {
    this.loadDepartments();
  }

  // Load all departments
  loadDepartments(): void {
    this.httpService.getDepartments().subscribe({
      next: (result: IDepartment[]) => {
        this.departments = result;
      },
      error: () => {
        alert('Failed to load departments.');
      },
    });
  }

  // Add department
  addDepartment(): void {
    if (!this.departmentName.trim()) {
      alert('Please enter a department name.');
      return;
    }

    this.httpService.addDepartment(this.departmentName).subscribe({
      next: () => {
        alert('Department added successfully.');
        this.closeForm();
        this.loadDepartments();
      },
      error: () => alert('Failed to add department.')
    });
  }

  // Open edit form
  editDepartment(dept: IDepartment): void {
    this.departmentName = dept.name;
    this.editId = dept.id;
    this.isFormOpen = true;
    this.isEdit = true;
  }

  // Update department
  updateDepartment(): void {
    if (!this.departmentName.trim()) {
      alert('Please enter a department name.');
      return;
    }

    this.httpService.updateDepartment(this.editId, this.departmentName).subscribe({
      next: () => {
        alert('Department updated successfully.');
        this.closeForm();
        this.loadDepartments();
      },
      error: () => alert('Failed to update department.')
    });
  }

  // Delete department
  deleteDepartment(id: number): void {
    if (!confirm('Are you sure you want to delete this department?')) return;

    this.httpService.deleteDepartment(id).subscribe({
      next: () => {
        alert('Department deleted successfully.');
        this.loadDepartments();
      },
      error: () => alert('Failed to delete department.')
    });
  }

  // Close form
  closeForm(): void {
    this.isFormOpen = false;
    this.isEdit = false;
    this.departmentName = '';
    this.editId = 0;
  }
}
