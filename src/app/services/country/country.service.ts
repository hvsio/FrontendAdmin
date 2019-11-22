import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Country } from '../../models/Country';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countriesUrl:string = 'http://35.193.212.114:8000/countries';
  countriesLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Countries
  getCountries():Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countriesUrl}`);
  }

  // Delete Country
  deleteCountry(country:Country):Observable<Country> {
    const url = `${this.countriesUrl}/${country.id}`;
    return this.http.delete<Country>(url, httpOptions);
  }

  // Add Country
  addCountry(country:Country):Observable<Country> {
    return this.http.post<Country>(this.countriesUrl, country, httpOptions);
  }

  // Update Country
  updateCountry(country: Country):Observable<any> {
    const url = `${this.countriesUrl}`;
    return this.http.put(url, country, httpOptions);
  }
}
