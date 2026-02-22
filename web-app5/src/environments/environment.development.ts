export const environment = {
  production: false,

  apiUrl: 'https://localhost:7204/api',

  // ---------------- Departments ----------------
  get departmentApiUrl(): string {
    return `${this.apiUrl}/Department`;
  },

  // ---------------- Employees ----------------
  get employeeApiUrl(): string {
    return `${this.apiUrl}/Employee`;
  },

  // ---------------- Auth ----------------
  get authApiUrl(): string {
    return `${this.apiUrl}/Auth`;
  },

  // ---------------- Leave ----------------
  get leaveApiUrl(): string {
    return `${this.apiUrl}/Leave`;
  },

  // ---------------- Payroll / Salary ----------------
  get salaryApiUrl(): string {
    return `${this.apiUrl}/Salary`;
  },

  // ---------------- Attendance ----------------
  get attendanceApiUrl(): string {
    return `${this.apiUrl}/Attendance`;
  },

  // ---------------- Dashboard ----------------
  get dashboardApiUrl(): string {
    return `${this.apiUrl}/Dashboard/stats`;
  }
};