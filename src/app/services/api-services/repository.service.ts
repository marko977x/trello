import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_BASE_URL = "http://localhost:4000/";
export const API_LISTS_URL = API_BASE_URL + "lists";
export const API_BOARDS_URL = API_BASE_URL + "boards";
export const API_CARDS_URL = API_BASE_URL + "cards";
export const API_CHECKLISTS_URL = API_BASE_URL + "checklists";
export const API_CHECKLIST_ITEMS_URL = API_BASE_URL + "checklistItems";
export const API_USERS_URL = API_BASE_URL + "users";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  addOne<T>(data: T, url: string): Observable<T> {
    return this.http.post<T>(url, data);
  }

  getOne<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  updateOne<T>(data: T, url: string): Observable<T> {
    return this.http.put<T>(url, data);
  }

  deleteOne<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  getAll<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }
}
