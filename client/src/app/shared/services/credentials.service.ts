import { Injectable } from '@angular/core';
import {Credentials} from '../../core/interfaces';

export const CURRENT_USER = 'CURRENT_USER';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private credentials: Credentials | null = null;

  constructor() {
    const savedCredentials =
      sessionStorage.getItem(CURRENT_USER) ||
      localStorage.getItem(CURRENT_USER);
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
  }

  get isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get getCredentials(): Credentials | null {
    const savedCredentials =
      sessionStorage.getItem(CURRENT_USER) ||
      localStorage.getItem(CURRENT_USER);
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
    return this.credentials;
  }

  get email(): string {
    const credential = this.getCredentials;
    if (credential) {
      return credential.email;
    }
    return null;
  }

  setCredentials(credentials?: Credentials, remember?: boolean): void {
    this.credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(CURRENT_USER, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(CURRENT_USER);
      localStorage.removeItem(CURRENT_USER);
      localStorage.clear();
    }
  }
}
