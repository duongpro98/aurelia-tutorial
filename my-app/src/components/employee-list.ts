import { bindable, inject } from 'aurelia-framework';
import {EmployeeService} from "../service/employee-service";

@inject(EmployeeService)
export class EmployeeList {
  @bindable employees;

  constructor(private employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  async delete(id: number) {
    this.employeeService.deleteEmployee(id);
    this.employees = await this.employeeService.getEmployeeData();
  }
}
