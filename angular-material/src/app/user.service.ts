import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  getList():Observable<any[]>{
    return this.http.get<any[]>(this.userApi+'users/')
  }
  getUserById(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.userApi+'userById/'+id)
  }
  deleteUserById(id:number):Observable<any[]>{
    return this.http.delete(this.userApi+'deleteUser/'+id , {responseType: 'text'}).pipe(map((response:any) => response));
  }

  addUser(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.userApi+'addUser/', data)
  }

  updateUser(data:any):Observable<any[]>{
    return this.http.put<any[]>(this.userApi+'updateUser/', data)
  }
}
