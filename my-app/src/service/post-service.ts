//import { HttpClient, json } from 'aurelia-fetch-client';

export interface Employee {
  id?: number;
  name?: string;
  title: string;
  body: string;
}
export class PostService {
  // private httpClient: HttpClient;
  //
  // constructor() {
  //   this.httpClient = new HttpClient();
  //   this.httpClient.configure(config => {
  //     config
  //       .useStandardConfiguration()
  //       .withDefaults({
  //       mode: 'cors',
  //       credentials: 'include',
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           'mode' : 'no-cors',
  //         },
  //     })
  //   });
  // }
  //
  // async getEmployeeData(): Promise {
  //   try {
  //     const response = await this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw error;
  //   }
  // }
  //
  // async createEmployeeData(data: {title: string, body: string}): Promise<any> {
  //   try {
  //     console.log('data ', data);
  //     const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/posts', {
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error creating data:', error);
  //     throw error;
  //   }
  // }
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', body: 'IT' },
    { id: 2, name: 'Jane Smith', title: 'Marketing Specialist', body: 'Marketing' },
    { id: 3, name: 'Bob Johnson', title: 'HR Manager', body: 'HR' },
  ];

  async getEmployeeData(): Promise<Employee[]> {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(employee => employee.id === id);
  }

  async createEmployeeData(employee: Employee): Promise<void> {
    console.log("yo ??")
    employee.id = this.employees.length > 0 ? this.employees[this.employees.length - 1].id + 1 : 1;
    this.employees.push(employee);
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
