import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private searchDataSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  setSearchData(searchData: string): void {
    this.searchDataSubject.next(searchData);
  }

  getSearchData(): BehaviorSubject<string> {
    return this.searchDataSubject;
  }
}
