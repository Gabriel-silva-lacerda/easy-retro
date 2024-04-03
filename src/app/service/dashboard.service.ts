import { environment } from './../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Notes, Board, Card } from '../interfaces/dashBoard.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  dataBoards: WritableSignal<Board[]> = signal([]);
  dataCards: WritableSignal<Card[]> = signal([]);
  searchBoard: WritableSignal<Board[]> = signal([]);
  searchNotes: WritableSignal<Card[]> = signal([]);

  constructor(private http: HttpClient) {}

  getDataBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/boards`).pipe(
      tap((data) => {
        this.dataBoards.set(data);
        this.searchBoard.set(data);
      })
    );
  }

  getDataCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/cards`).pipe(
      tap((data) => {
        this.dataCards.set(data);
      })
    );
  }

  postDataBoards(data: Board): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/boards`, data).pipe(
      tap((newData) => {
        const currentData = this.dataBoards();
        currentData.push(newData);
        this.dataBoards.set(currentData);
      })
    );
  }

  postDataCards(data: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, data).pipe(
      tap((newData) => {
        const currentData = this.dataCards();
        currentData.push(newData);
        this.dataCards.set(currentData);
      })
    );
  }

  deleteData<T>(id: string | undefined, param: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${param}/${id}`);
  }

  updateCard(note: any): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/cards/${note.id}`, note);
  }
}

// deleteBoard(id: string | undefined): Observable<DashBoard> {
//   return this.http.delete<DashBoard>(`${this.apiUrl}/boards/${id}`);
// }

// deleteCard(id: string | undefined): Observable<Notes> {
//   return this.http.delete<Notes>(`${this.apiUrl}/cards/${id}`);
// }

// getNotes(obj?: any): Observable<Notes[]> {
//   let params = new HttpParams();

//   if (obj) {
//     Object.entries(obj).forEach(
//       ([key, value]) =>
//         (params = value ? params.set(key, value.toString()) : params)
//     );
//   }

//   return this.http.get<Notes[]>(`${this.apiUrl}/notes`, { params }).pipe(
//     tap((data) => {
//       this.dataNotes.set(data);
//     })
//   );
// }
