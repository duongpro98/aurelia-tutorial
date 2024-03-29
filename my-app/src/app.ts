import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {AuthService} from "./service/auth-service";
import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import {AuthorizeStep} from "./pipeline-step/authorize-step";
@inject(AuthService, EventAggregator)
export class App {
  router?: Router;
  message = 'Welcome to the Home Page!';
  private subscription: Subscription;
  constructor(private authService: AuthService, private eventAggregator: EventAggregator) {}

  canActivate(): void {
    if (!this.authService.getIsAuthenticated()) {
      // Redirect to login if not authenticated
      window.location.href = '#/login';
    }else {
      window.location.href = '#/home';
    }
  }

  attached(): void {
    this.subscription = this.eventAggregator.subscribe('authStateChanged', (event) => {
      if (event.isAuthenticated) {
        this.authService.isAuthenticated = true;
        this.authService.currentUser = event.currentUser;
        window.location.href = '#/home';
      } else {
        this.authService.isAuthenticated = false;
        this.authService.currentUser = null;
        window.location.href = '#/login';
      }
    });
  }

  detached(): void {
    this.subscription.dispose();
  }

  logout() {
    this.authService.logout();
    window.location.href = '#/login';
  }
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('view/Home/home'), title: 'Home' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('view/Login/log-in-view'), title: 'Log In' },
      { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('view/About/about'), title: 'About' },
      { route: 'employee', name: 'employee', moduleId: PLATFORM.moduleName('view/Employee/employee'), title: 'Employee' },
      { route: 'employee/create', name: 'employee-create', moduleId: PLATFORM.moduleName('view/Employee/employee-create'), title: 'Create Employee', settings: {
        auth: true
        } },
      { route: 'employee/edit/:slug', name: 'employee-edit', moduleId: PLATFORM.moduleName('view/Employee/employee-edit'), title: 'Edit Employee', settings: {
        auth: true
        } },
    ]);
  }
}
