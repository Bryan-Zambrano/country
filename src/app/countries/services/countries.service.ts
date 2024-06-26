import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  public cachStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: undefined, countries: [] },

  };
  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem("cacheStore", JSON.stringify(this.cachStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem("cacheStore")) return;
    this.cachStore = JSON.parse(localStorage.getItem("cacheStore")!);
  }

  private getCountriesHttpRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([])),
        delay(2000)
      );;
  }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`;
    return this.httpClient.get<Country[]>(url).
      pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }


  searchByCapital(queryTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${queryTerm}`;
    return this.getCountriesHttpRequest(url)
      .pipe(
        tap(countries => this.cachStore.byCapital = { term: queryTerm, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchByCountry(queryTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${queryTerm}`;
    return this.getCountriesHttpRequest(url)
      .pipe(
        tap(countries => this.cachStore.byCountries = { term: queryTerm, countries }),
        tap(() => this.saveToLocalStorage())
      );;
  }


  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesHttpRequest(url)
      .pipe(
        tap(countries => this.cachStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }



}
