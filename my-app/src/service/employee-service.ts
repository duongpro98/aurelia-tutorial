import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export interface Employee {
  id?: number;
  name?: string;
  title: string;
  body: string;
}
@inject(EventAggregator)
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', body: 'IT' },
    { id: 2, name: 'Jane Smith', title: 'Marketing Specialist', body: 'Marketing' },
    { id: 3, name: 'Bob Johnson', title: 'HR Manager', body: 'HR' },
  ];

  constructor(private eventAggregator: EventAggregator) {}
  async getEmployeeData(): Promise<Employee[]> {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(employee => employee.id === id);
  }

  async createEmployeeData(employee: Employee): Promise<void> {
    employee.id = this.employees.length > 0 ? this.employees[this.employees.length - 1].id + 1 : 1;
    this.employees.push(employee);
    // this.eventAggregator.publish('employeesUpdated', { employees: this.employees });
    // console.log("published ", this.employees)
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(employee => employee.id !== id);
  }
}
