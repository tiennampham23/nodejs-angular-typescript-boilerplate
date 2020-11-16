import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {AuthInterface, ResponseApi} from '../../core/interfaces';

const router = {
  login: `/auth/login`,
  checkAdmin: `/auth/checkAdmin`,
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  constructor(
    private baseService: BaseService
  ) { }

  login(user: AuthInterface): Observable<any> {
    return this.baseService.post(router.login, user);
  }

  checkAdmin(): Observable<ResponseApi<boolean>> {
    return this.baseService.get(router.checkAdmin);
  }
}
