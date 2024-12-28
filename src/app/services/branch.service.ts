import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  GetAll() {
      return this.http.get<Branch[]>(this.baseUrl + 'Branch'  );
    }
  
  GetbyId(id: string) {
    return this.http.get<Branch>(`${this.baseUrl}Branch/${id}`);
  }
  
  CreateBranch(_data: Branch) {
    return this.http.post(this.baseUrl + 'Branch', _data );
  }
  UpdateBranch(_data: Branch) {
    return this.http.put(`${this.baseUrl}Branch/${_data.id}`, _data);
  }
  
   DeleteBranch(id: string) {
    //return this.http.delete(this.baseUrl + 'Branch?id=' + id);
    return this.http.delete(`${this.baseUrl}Branch/${id}`);
  }
}
