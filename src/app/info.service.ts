import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private _informationUrl = "http://localhost:3000/api/information";
  private _characterUrl = "http://localhost:3000/api/character";
  constructor(private http: HttpClient) { }

  getInformation() {
    return this.http.get<any>(this._informationUrl)
  }

  getCharacter() {
    return this.http.get<any>(this._characterUrl)
  }
}
