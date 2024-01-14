import {Redirect} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {AuthService} from "../service/auth-service";
import {EventAggregator} from "aurelia-event-aggregator";

@inject(AuthService, EventAggregator)
export class AuthorizeStep {

  constructor(private authService: AuthService, private eventAggregator: EventAggregator) {
    this.authService = authService;
  }
  run(navigationInstruction: { config: any }, next: any): Promise<any> {
    const isLoggedIn: boolean = this.authService.isAuthenticated;

    // Currently active route config
    const currentRoute = navigationInstruction.config;

    // Settings object will be preserved during navigationn
    const loginRequired: boolean = currentRoute.settings && currentRoute.settings.auth === true;

    if (isLoggedIn === false && loginRequired === true) {
      return next.cancel(new Redirect('login'));
    }

    const publicOnly: boolean = currentRoute.settings && currentRoute.settings.publicOnly === true;
    if (isLoggedIn === true && publicOnly === true) {
      return next.cancel(new Redirect('home'));
    }

    return Promise.resolve(next());
  }
}
