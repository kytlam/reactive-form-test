import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const ASSETS_FOLDER: string = "assets";

@Injectable({
  providedIn: 'root'
})
export class JsonCallService {

  constructor(private _http: HttpClient) { }

  /**
   * getJsonFile
   */
  public getJsonFile = (filename: string): Observable<any> => {
    return this._http.get<any>(`${ASSETS_FOLDER}/${filename}.json`);
  };

}