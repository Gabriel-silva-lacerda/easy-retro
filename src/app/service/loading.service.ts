import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubjectMap: { [key: string]: BehaviorSubject<boolean> } = {};
  isLoading$ = this.isLoadingSubject.asObservable();

  setLoadingState(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
  setLoadingForId(id: string, isLoading: boolean): void {
    if (!this.isLoadingSubjectMap[id]) {
      this.isLoadingSubjectMap[id] = new BehaviorSubject<boolean>(false);
    }
    this.isLoadingSubjectMap[id].next(isLoading);
  }

  isLoadingForId(id: string): Observable<boolean> {
    if (!this.isLoadingSubjectMap[id]) {
      this.isLoadingSubjectMap[id] = new BehaviorSubject<boolean>(false);
    }
    return this.isLoadingSubjectMap[id].asObservable();
  }
}
