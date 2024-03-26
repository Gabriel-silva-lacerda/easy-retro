import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, WritableSignal, signal } from '@angular/core';
import {
  Notes,
  DashBoard,
  PublicBoard,
} from '../interfaces/dashBoard.interface';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  dataDash: WritableSignal<DashBoard[]> = signal([]);
  searchDash: WritableSignal<DashBoard[]> = signal([]);
  dataPublicboard: WritableSignal<PublicBoard[]> = signal([]);
  dataNotes: WritableSignal<Notes[]> = signal([]);

  constructor(private http: HttpClient) {}

  getDataDashboard(): Observable<DashBoard[]> {
    return this.http.get<DashBoard[]>(`${this.apiUrl}/dashboard`).pipe(
      tap((data) => {
        this.dataDash.set(data);
        this.searchDash.set(data);
      })
    );
  }

  getDataPublicboardById(id: string | undefined): Observable<PublicBoard[]> {
    return this.http.get<PublicBoard>(`${this.apiUrl}/dashboard/${id}`).pipe(
      map((card) => [card]),
      tap((data) => {
        this.dataPublicboard.set(data);
      })
    );
  }

  getDataPublicboardById2(id: string | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notes?id_card=${id}`).pipe(
      tap((data) => {
        // console.log(data);

        this.dataNotes.set(data);
      })
    );
  }

  getDataPublicboard(): Observable<PublicBoard[]> {
    return this.http.get<PublicBoard[]>(`${this.apiUrl}/publicboard`).pipe(
      tap((data) => {
        this.dataPublicboard.set(data);
      })
    );
  }

  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(`${this.apiUrl}/notes`).pipe(
      tap((data) => {
        this.dataNotes.set(data);
      })
    );
  }

  postDataDashboard(data: DashBoard): Observable<DashBoard> {
    return this.http.post<DashBoard>(`${this.apiUrl}/dashboard`, data).pipe(
      tap((newData) => {
        const currentData = this.dataDash();
        currentData.push(newData);
        this.dataDash.set(currentData);
      })
    );
  }

  postDataPublicboard(data: PublicBoard): Observable<PublicBoard> {
    return this.http.post<PublicBoard>(`${this.apiUrl}/publicboard`, data).pipe(
      tap((newData) => {
        const currentData = this.dataPublicboard();
        currentData.push(newData);
        this.dataPublicboard.set(currentData);
      })
    );
  }

  postNotes(data: Notes): Observable<Notes> {
    return this.http.post<Notes>(`${this.apiUrl}/notes`, data).pipe(
      tap((newData) => {
        // const currentData = this.dataNotes();
        // currentData.push(newData);
        // this.dataNotes.set(currentData);

      })
    );
  }

  deleteDataDashboard(id: string | undefined): Observable<DashBoard> {
    return this.http.delete<DashBoard>(`${this.apiUrl}/dashboard/${id}`);
  }

  deleteNotes(id: string | undefined): Observable<Notes> {
    return this.http.delete<Notes>(`${this.apiUrl}/notes/${id}`);
  }

  updateNotes(note: any): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/notes/${note.id}`, note);
  }
}
