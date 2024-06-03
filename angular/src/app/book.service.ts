import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7009/api/book';

  constructor(private http: HttpClient) { }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, book);
  }
}
