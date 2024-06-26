import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialCountryValue: string = ""

  constructor(private _countriesService: CountriesService) { }
  ngOnInit(): void {
    this.countries = this._countriesService.cachStore.byCountries.countries;
    this.initialCountryValue = this._countriesService.cachStore.byCountries.term;
  }

  public searchByCountry(value: string) {

    this._countriesService.searchByCountry(value).subscribe(
      countries => {
        this.countries = countries;
        //this._countriesService.cachStore.byCountries = { term: value, countries };
        //this.initialCountryValue = value;
      }
    );

    console.log("Value by Country")
    console.log({ value });
  }

}
