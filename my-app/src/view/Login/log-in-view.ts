import { inject } from 'aurelia-framework';
import {AuthService} from "../../service/auth-service";
@inject(AuthService)
export class Login {
  username = '';
  password = '';
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login() {
    this.authService.login(this.username, this.password);
  }
}
