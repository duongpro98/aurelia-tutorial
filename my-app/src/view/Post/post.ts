import {PostService} from "../../service/post-service";
import { autoinject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
@autoinject
export class Post {
  slug: string | undefined;

  private apiService: PostService;
  @bindable private employees: any;
  private newPost = { title: '', body: '' };

  constructor(apiService: PostService) {
    this.apiService = apiService;
  }

  async activate(params: { slug?: string }) {
    this.slug = params.slug;
    // await this.fetchData();
  }

  async bind() {
    await this.fetchData();
  }

  // async attached() {
  //   await this.fetchData();
  // }
  async fetchData() {
    try {
      this.employees = await this.apiService.getEmployeeData();
      console.log('Employee Data:', this.employees);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  }

  async createNewPost() {
    try {
      const createdPost = await this.apiService.createEmployeeData(this.newPost);
      console.log('New post created:', createdPost);

      // After creating the post, refresh the list
      await this.fetchData();

      // Clear input fields
      this.newPost = { title: '', body: '' };
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  }
}
