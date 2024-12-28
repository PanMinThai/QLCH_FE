import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Employee, EmployeeUpdate } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
    constructor(private http: HttpClient) { }
    baseUrl = environment.apiUrl;
    GetAll() {
        return this.http.get<Employee[]>(this.baseUrl + 'Employee'  );
      }
    
      GetbyId(id: string) {
        return this.http.get<Employee>(`${this.baseUrl}Employee/${id}`);
      }

    // UpdateEmployee(_data: EmployeeUpdate, id:string) {
    //   return this.http.put(`${this.baseUrl}Employee/${id}`, _data).subscribe();
    // }
    UpdateEmployee(_data: EmployeeUpdate) {
      return this.http.put(`${this.baseUrl}Employee`, _data);
    }
    
  
     DeleteEmployee(id: string) {
      return this.http.delete(`${this.baseUrl}Employee/${id}`);
    }
}
