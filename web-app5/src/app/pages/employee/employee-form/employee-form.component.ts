import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatRadioButton, MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { IDepartment } from '../../../models/department.model';
import { HttpService } from '../../../services/http.service';
import { IEmployee } from '../../../models/employee.model';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    NgClass,
    CommonModule
],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input() employeeId!: number;

  // Reactive form initialization
  employeeForm = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    gender: [1, Validators.required],
    departmentId: ['', Validators.required],
    jobTitle: ['', Validators.required],
    joiningDate: [null, Validators.required],
    lastWorkingDate: [''],
    dateOfBirth: [null, Validators.required]
  });

  departments: IDepartment[] = [];
  httpService = inject(HttpService);
  dialogRef = inject(MatDialogRef<EmployeeFormComponent>);
  data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit() {
    // Load departments
    this.httpService.getDepartments().subscribe(result => {
      this.departments = result;
    });

    console.log("here", this.data);

    // If editing an employee, patch the form
    if (this.data?.employeeId) {
      this.httpService.getEmployeeById(this.data.employeeId).subscribe(result => {
        console.log(result);
        this.employeeForm.patchValue(result as any);

        // Disable fields as required
        this.employeeForm.get('gender')?.disable();
        this.employeeForm.get('joiningDate')?.disable();
        this.employeeForm.get('dateOfBirth')?.disable();
      });
    }
  }

  onsubmit() {
    const value: any = this.employeeForm.getRawValue(); // getRawValue to include disabled fields

    if (this.data?.employeeId) {
      this.httpService.updateEmployee(this.data.employeeId, value).subscribe(() => {
        alert("Record updated");
        this.dialogRef.close();
      });
    } else {
      console.log("valid", this.employeeForm.valid);
      this.httpService.addEmployee(value).subscribe(() => {
        alert("Record saved");
        this.dialogRef.close();
      });
    }
  }
}