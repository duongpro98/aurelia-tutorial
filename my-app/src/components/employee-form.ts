import { autoinject, bindable } from 'aurelia-framework';
import {EmployeeService, Employee} from "../service/employee-service";

@autoinject
export class EmployeeForm {
  @bindable employee: Employee = { id: 0, name: '', title: '', body: '' };

  constructor(private employeeService: EmployeeService) {}

  async submitForm(): Promise<void> {
    if (this.employee.id === 0) {
      // Adding a new employee
      await this.employeeService.createEmployeeData(this.employee);
    } else {
      // Updating an existing employee
      this.employeeService.updateEmployee(this.employee);
    }

    // Clear the form after submission or update
    this.resetForm();
  }

  resetForm(): void {
    this.employee = { id: 0, name: '', title: '', body: '' };
  }
}
