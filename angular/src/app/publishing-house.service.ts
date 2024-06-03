import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishingHouseService {
  private apiUrl = 'https://localhost:7009/api/publishingHouse';

  constructor(private http: HttpClient) { }

  addPublishingHouse(publishingHouse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, publishingHouse);
  }
  getPublishingHouses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deletePublishingHouse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getPublishingHouseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updatePublishingHouse(publishingHouse: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, publishingHouse);
  }
}
