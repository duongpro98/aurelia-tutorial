import { autoinject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {EmployeeService, Employee} from "../service/employee-service";
import {ValidationController, ValidationControllerFactory, ValidationRules} from "aurelia-validation";
import {validationMessages} from 'aurelia-validation';

@autoinject
export class EmployeeForm {
  @bindable employee: Employee = { id: 0, name: '', title: '', body: '' };
  private validationController: ValidationController;
  constructor(private employeeService: EmployeeService, private controllerFactory: ValidationControllerFactory, private router: Router) {
    this.validationController = controllerFactory.createForCurrentScope();
    this.router = router;
    validationMessages['required'] = `\${$displayName} is required!`;
    validationMessages['maxLength'] = `\${$displayName} is maxLength!`;
    ValidationRules
      .ensure('name').displayName('Name baby').required().maxLength(5)
      .ensure('title').displayName('Title baby').required().maxLength(5)
      .ensure('body').displayName('Body baby').required().maxLength(5)
      // Add more rules for other fields as needed
      .on(this.employee);
  }

  async submitForm(): Promise<void> {
    const validationResult = await this.validationController.validate();
    if(validationResult.valid){
      if (this.employee.id === 0) {
        // Adding a new employee
        await this.employeeService.createEmployeeData(this.employee);
      } else {
        // Updating an existing employee
        this.employeeService.updateEmployee(this.employee);
      }
      this.resetForm();
      this.router.navigateToRoute('employee');
    } else {
      console.log("validate false ", validationResult.results)
    }
    // Clear the form after submission or update
  }

  resetForm(): void {
    this.employee = { id: 0, name: '', title: '', body: '' };
  }
}
