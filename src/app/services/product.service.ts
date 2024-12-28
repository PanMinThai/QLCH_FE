import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Getall() {
    return this.http.get<Product[]>(this.baseUrl + 'Product'  );
  }

  // GetbyId(id:string) {
  //   return this.http.get<Product>(this.baseUrl + 'Product?id='+id);
  // }
  GetbyId(id: string) {
    return this.http.get<Product>(`${this.baseUrl}Product/${id}`);
  }

  CreateProduct(_data: Product) {
    return this.http.post(this.baseUrl + 'Product', _data );
  }

  // UpdateProduct(_data: Product) {
  //   return this.http.put(this.baseUrl + 'Product?id=' + _data.id, _data);
  // }
UpdateProduct(_data: Product) {
  return this.http.put(`${this.baseUrl}Product/${_data.id}`, _data);
}

  DeleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}Product/${id}`);
    //return this.http.delete(this.baseUrl + 'Product?id=' + id);
  }
}
