import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, WritableSignal, signal } from '@angular/core';
import { dashBoard, publicBoard } from '../interfaces/dashBoard.interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  dataDash: WritableSignal<dashBoard[]> = signal([]);
  searchDash: WritableSignal<dashBoard[]> = signal([]);
  dataPublicboard: WritableSignal<publicBoard[]> = signal([]);

  constructor(private http: HttpClient) {}

  getDataDashboard(): Observable<dashBoard[]> {
    return this.http.get<dashBoard[]>(`${this.apiUrl}/dashboard`).pipe(
      tap((data) => {
        this.dataDash.set(data);
        this.searchDash.set(data);
      })
    );
  }

  postDataDashboard(data: dashBoard): Observable<dashBoard> {
    return this.http.post<dashBoard>(`${this.apiUrl}/dashboard`, data).pipe(
      tap((newData) => {
        const currentData = this.dataDash();
        currentData.push(newData);
        this.dataDash.set(currentData);
      })
    );
  }

  deleteDataDashboard(id: string | undefined): Observable<dashBoard> {
    return this.http.delete<dashBoard>(`${this.apiUrl}/dashboard/${id}`);
  }

  getDataPublicboardById(id: string): Observable<publicBoard[]> {
    return this.http.get<publicBoard>(`${this.apiUrl}/dashboard/${id}`).pipe(
      map((card) => [card]),
      tap((data) => {
        this.dataPublicboard.set(data);
      })
    );
  }

  getDataPublicboard(): Observable<publicBoard[]> {
    return this.http.get<publicBoard[]>(`${this.apiUrl}/publicboard`).pipe(
      tap((data) => {
        this.dataPublicboard.set(data);
      })
    );
  }

  postDataPublicboard(data: publicBoard): Observable<publicBoard> {
    return this.http.post<publicBoard>(`${this.apiUrl}/publicboard`, data).pipe(
      tap((newData) => {
        const currentData = this.dataPublicboard();
        currentData.push(newData);
        this.dataPublicboard.set(currentData);
      })
    );
  }


}
