import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialCapitalValue: string = '';

  constructor(private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this._countriesService.cachStore.byCapital.countries;
    this.initialCapitalValue= this._countriesService.cachStore.byCapital.term;

  }

  public searchByCapital(value: string) {
    this.isLoading = true;
    this._countriesService.searchByCapital(value).subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
        this.initialCapitalValue = value;
      }
    );

    console.log("Value by Capital")
    console.log({ value });
  }

}
