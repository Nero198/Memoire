import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = 'https://localhost:7009/api/type';

  constructor(private http: HttpClient) { }

  addType(type: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, type);
  }
  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateType(type: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, type);
  }
}
