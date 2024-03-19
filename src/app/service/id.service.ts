import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  private idSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  id$: Observable<string | null> = this.idSubject.asObservable();

  constructor() {}

  setId(id: string | null): void {
    this.idSubject.next(id);
  }
}
