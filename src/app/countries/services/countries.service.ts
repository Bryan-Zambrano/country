import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";
  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`;
    return this.httpClient.get<Country[]>(url).
      pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }


  searchByCapital(queryTerm: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${queryTerm}`).
      pipe(
        catchError(error => of([]))
      );
  }

  searchByCountry(queryTerm: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${queryTerm}`).
      pipe(
        catchError(error => of([]))
      );
  }


  searchByRegion(queryTerm: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${queryTerm}`).
      pipe(
        catchError(error => of([]))
      );
  }



}
