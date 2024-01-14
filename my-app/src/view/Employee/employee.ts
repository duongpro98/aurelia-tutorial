import {EmployeeService} from "../../service/employee-service";
import { autoinject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
@autoinject
export class Employee {
  slug: string | undefined;
  private loading: boolean;
  private apiService: EmployeeService;
  @bindable private employees: any;
  private newPost = { title: '', body: '' };
  private subscription: Subscription;
  constructor(apiService: EmployeeService, private eventAggregator: EventAggregator) {
    this.apiService = apiService;
  }

  async activate(params: { slug?: string }) {
    this.slug = params.slug;
    // await this.fetchData();
  }

  async bind() {
    await this.fetchData();
  }

  // attached(): void {
  // }

  async fetchData() {
    try {
      this.loading = true;
      setTimeout(async () => {
        this.employees = await this.apiService.getEmployeeData();
        this.loading = false;
        console.log('Employee Data:', this.employees);
      }, 1000);
      // this.employees = await this.apiService.getEmployeeData();
      // console.log('Employee Data:', this.employees);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  }

  async createNewPost() {
    try {
      const createdPost = await this.apiService.createEmployeeData(this.newPost);
      console.log('New employee created:', createdPost);

      // After creating the post, refresh the list
      await this.fetchData();

      // Clear input fields
      this.newPost = { title: '', body: '' };
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  }

  detached(): void {
    // this.subscription.dispose();
  }
}
