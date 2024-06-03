import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://localhost:7009/api/person';

  constructor(private http: HttpClient) { }

  addPerson(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }
  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updatePerson(person: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, person);
  }
}
