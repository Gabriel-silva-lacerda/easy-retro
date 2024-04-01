import { environment } from './../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  Notes,
  DashBoard,
  PublicBoard,
} from '../interfaces/dashBoard.interface';
import { Observable, Subject, forkJoin, map, tap } from 'rxjs';

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
    return this.http.get<DashBoard[]>(`${this.apiUrl}/boards`).pipe(
      tap((data) => {
        this.dataDash.set(data);
        this.searchDash.set(data);
      })
    );
  }

  getDataPublicboard(): Observable<PublicBoard[]> {
    return this.http.get<PublicBoard[]>(`${this.apiUrl}/cards`).pipe(
      tap((data) => {
        this.dataPublicboard.set(data);
      })
    );
  }

  getNotes(obj?: any): Observable<Notes[]> {
    let params = new HttpParams();

    if (obj) {
      Object.entries(obj).forEach(
        ([key, value]) =>
          (params = value ? params.set(key, value.toString()) : params)
      );
    }

    return this.http.get<Notes[]>(`${this.apiUrl}/notes`, { params }).pipe(
      tap((data) => {
        this.dataNotes.set(data);
      })
    );
  }

  postDataDashboard(data: DashBoard): Observable<DashBoard> {
    return this.http.post<DashBoard>(`${this.apiUrl}/boards`, data).pipe(
      tap((newData) => {
        const currentData = this.dataDash();
        currentData.push(newData);
        this.dataDash.set(currentData);
      })
    );
  }

  postDataPublicboard(data: PublicBoard): Observable<PublicBoard> {
    return this.http.post<PublicBoard>(`${this.apiUrl}/cards`, data).pipe(
      tap((newData) => {
        const currentData = this.dataPublicboard();
        currentData.push(newData);
        this.dataPublicboard.set(currentData);
      })
    );
  }

  postNotes(data: Notes): Observable<Notes> {
    return this.http.post<Notes>(`${this.apiUrl}/notes`, data);
  }

  deleteDataDashboard(id: string | undefined): Observable<DashBoard> {
    return this.http.delete<DashBoard>(`${this.apiUrl}/boards/${id}`);
  }

  deleteNotes(id: string | undefined): Observable<Notes> {
    console.log(id);

    return this.http.delete<Notes>(`${this.apiUrl}/notes/${id}`);
  }

  deletePublicBoard(id: string | undefined): Observable<Notes> {
    return this.http.delete<Notes>(`${this.apiUrl}/cards/${id}`);
  }

  updateNote(note: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/notes/${note.id}`, note);
  }

  updatePublicBoard(note: any): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/cards/${note.id}`, note);
  }
}
