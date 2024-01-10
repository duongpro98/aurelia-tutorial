import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class AuthService {
  private accounts: { username: string; password: string }[] = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more accounts as needed
  ];

  isAuthenticated = false;
  currentUser: string | null = null;
  constructor(private eventAggregator: EventAggregator) {}
  login(username: string, password: string): boolean {
    const account = this.accounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (account) {
      this.isAuthenticated = true;
      this.currentUser = username;
      this.eventAggregator.publish('authStateChanged', { isAuthenticated: true, currentUser: username });
      console.log('Login successful!');
      return true;
    } else {
      this.isAuthenticated = false;
      this.currentUser = null;
      this.eventAggregator.publish('authStateChanged', { isAuthenticated: false, currentUser: null });
      console.log('Login failed. Invalid username or password.');
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.eventAggregator.publish('authStateChanged', { isAuthenticated: false, currentUser: null });
    console.log('Logout successful!');
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
