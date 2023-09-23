import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  private getResponseBySetting(
    option: string,
    term: string
  ): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/${option}/${term}`)
      .pipe(catchError(() => of([])));
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getResponseBySetting('capital', term).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries }))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getResponseBySetting('name', term).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getResponseBySetting('region', region).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
