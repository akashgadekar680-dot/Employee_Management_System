import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave',
  imports: [CommonModule,FormsModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {


  showCalendar = false;
  selectedDate: string = '';
  successMessage = false;

  openCalendar() {
    this.showCalendar = true;
    this.successMessage = false;
  }

  closeCalendar() {
    this.showCalendar = false;
  }

  submitLeave() {
    if (this.selectedDate) {
      this.successMessage = true;

      setTimeout(() => {
        this.showCalendar = false;
        this.successMessage = false;
      }, 2000);
    }
  }

}
