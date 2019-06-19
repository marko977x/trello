import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  constructor(private http: HttpClient) { }

  getAllLists(): Observable<List[]> {
    return this.http.get<List[]>(API_LISTS_URL);
  }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(API_BOARDS_URL);
  }
}

export const API_BASE_URL = "http://localhost:4000/";
export const API_LISTS_URL = API_BASE_URL + "lists";
export const API_BOARDS_URL = API_BASE_URL + "boards";