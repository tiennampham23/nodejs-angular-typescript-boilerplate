import { Injectable } from '@angular/core';
import {CredentialsService} from './credentials.service';
import {Credentials} from '../../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private credentialsService: CredentialsService
  ) { }

  get isAuthenticated(): boolean {
    return !!this.credentialsService.isAuthenticated;
  }

  get credentials(): Credentials | null {
    return this.credentialsService.getCredentials;
  }
  get email(): string | null {
    return this.credentialsService.email;
  }

  login(context: Credentials, remember?: boolean): void {
    this.credentialsService.setCredentials(context, remember);
  }

  logout(): void {
    this.credentialsService.setCredentials(null);
  }
}
