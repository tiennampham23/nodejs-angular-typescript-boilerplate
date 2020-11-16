import { Injectable } from '@angular/core';
import { UserCreateDto } from '@authentication-based/core/dtos';
import { ResponseApi, UserInterface } from '@authentication-based/core/interfaces';
import { fmt } from '@authentication-based/core/utils/helper';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

const router = {
  getAll: `/user/getAll`,
  getOne: `/user/getOne/{userId}`,
  update: `/user/update/{userId}`,
  delete: `/user/delete/{userId}`,
  create: `/user/create`,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private baseService: BaseService
  ) {
  }

  loadUsers(): Observable<ResponseApi<UserInterface[]>> {
    return this.baseService.get(router.getAll);
  }

  loadUserById(userId: number): Observable<ResponseApi<UserInterface>> {
    const uri = fmt(router.getOne, {userId});
    return this.baseService.get(uri);
  }

  createUser(user: UserCreateDto): Observable<ResponseApi<boolean>> {
    return this.baseService.post(router.create, user);
  }

  updateUser(userId: number, user: UserCreateDto): Observable<ResponseApi<boolean>> {
    const uri = fmt(router.update, {userId});
    return this.baseService.put(uri, user);
  }

  deleteUser(userId: number): Observable<ResponseApi<boolean>> {
    const uri = fmt(router.delete, {userId});
    return this.baseService.delete(uri);
  }

}
