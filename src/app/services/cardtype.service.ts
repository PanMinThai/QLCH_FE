import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CardType } from '../models/cardtype.model';

@Injectable({
  providedIn: 'root'
})
export class CardtypeService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  GetAll() {
      return this.http.get<CardType[]>(this.baseUrl + 'CardType'  );
    }
  
  GetbyId(id: string) {
    return this.http.get<CardType>(`${this.baseUrl}CardType/${id}`);
  }
  
  CreateCardType(_data: CardType) {
    return this.http.post(this.baseUrl + 'CardType', _data );
  }
  UpdateCardType(_data: CardType) {
    return this.http.put(`${this.baseUrl}CardType/${_data.id}`, _data);
  }
  
   DeleteCardType(id: string) {
    return this.http.delete(`${this.baseUrl}CardType/${id}`);
  }
}
