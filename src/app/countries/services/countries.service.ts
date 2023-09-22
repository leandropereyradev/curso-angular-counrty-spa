import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://restcountries.com/v3.1';

  private getResponseBySetting(
    option: string,
    term: string
  ): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/${option}/${term}`)
      .pipe(catchError(() => of([])));
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getResponseBySetting('capital', term);
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getResponseBySetting('name', term);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getResponseBySetting('region', region);
  }
}
