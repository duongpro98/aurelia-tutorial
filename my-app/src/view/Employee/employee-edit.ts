import { bindable } from 'aurelia-framework';
import {EmployeeService} from "../../service/employee-service";
import { autoinject } from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject
export class EmployeeEdit {
  @bindable private employee: any;
  private apiService: EmployeeService;

  constructor(apiService: EmployeeService) {
    this.apiService = apiService;
  }

  activate(params: { slug?: string }) {
    this.employee = this.apiService.getEmployeeById(parseInt(params.slug));
  }
}
