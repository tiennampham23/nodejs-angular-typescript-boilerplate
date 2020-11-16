import { Injectable } from '@angular/core';

@Injectable()
export class EnvironmentService {
  private BASE_URL: string;

  get baseUrl() {
    return this.BASE_URL;
  }

}
