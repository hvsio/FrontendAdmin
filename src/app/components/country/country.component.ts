import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {CountryService} from '../../services/country/country.service';

import {Country} from 'src/app/models/Country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  @Input() country: Country;
  @Output() deleteCountry: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(private countryService:CountryService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    return {
      country: true,
      'is-allowed': this.country.allowed
    };
  }

  onToggle(country) {
    // Toggle in UI
    country.allowed = !country.allowed;
    // Toggle on server
    this.countryService.updateCountry(country).subscribe(country => console.log(country));
  }

  onDelete(country) {
    this.deleteCountry.emit(country);
  }
}
