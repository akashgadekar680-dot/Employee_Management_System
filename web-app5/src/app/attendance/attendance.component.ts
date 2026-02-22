import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

statusMessage: string = '';
  checkInTime: string = '';
  checkOutTime: string = '';
  currentTime: string = '';
  isCheckedIn: boolean = false;

  ngOnInit() {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  checkIn() {
    if (!this.isCheckedIn) {
      const now = new Date();
      this.checkInTime = now.toLocaleTimeString();
      this.statusMessage = `✅ Checked In at ${this.checkInTime}`;
      this.isCheckedIn = true;
    } else {
      this.statusMessage = '⚠ Already Checked In!';
    }
  }

  checkOut() {
    if (this.isCheckedIn) {
      const now = new Date();
      this.checkOutTime = now.toLocaleTimeString();
      this.statusMessage = `🚪 Checked Out at ${this.checkOutTime}`;
      this.isCheckedIn = false;
    } else {
      this.statusMessage = '⚠ Please Check In First!';
    }
  }
}
