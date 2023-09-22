import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  constructor(private countriesServices: CountriesService) {}

  public countries: Country[] = [];

  searchByCountry(country: string): void {
    this.countriesServices
      .searchCountry(country)
      .subscribe((countries) => (this.countries = countries));
  }
}
