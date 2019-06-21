import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { Board } from '../models/board';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  constructor(private http: HttpClient) { }

  getAll<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  } 

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}

export const API_BASE_URL = "http://localhost:4000/";
export const API_LISTS_URL = API_BASE_URL + "lists";
export const API_BOARDS_URL = API_BASE_URL + "boards";
export const API_CARDS_URL = API_BASE_URL + "cards";
export const API_CHECKLISTS_URL = API_BASE_URL + "checklists";
export const API_CHECKLIST_ITEMS_URL = API_BASE_URL + "checklistItems";