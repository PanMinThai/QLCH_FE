import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CreateMembershipCard, MembershipCard } from '../models/membershipcard.model';

@Injectable({
  providedIn: 'root'
})

export class MembershipcardService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<MembershipCard[]>(this.baseUrl + 'MembershipCard'  );
  }
  GetbyId(id: string) {
    return this.http.get<MembershipCard>(`${this.baseUrl}MembershipCard/${id}`);
  }

  CreateMembershipCard(_data: CreateMembershipCard) {
    return this.http.post(this.baseUrl + 'MembershipCard', _data );
  }

  UpdateMembershipCard(_data: CreateMembershipCard) {
    return this.http.put(`${this.baseUrl}MembershipCard/${_data.id}`, _data);
  }

  DeleteMembershipCard(id: string) {
    return this.http.delete(`${this.baseUrl}MembershipCard/${id}`);
  }
}
