import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Auto } from "../interfaces/auto";

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  /**
   * The API url configured in the environment file.
   * @private
   */
  private apiURL = environment.apiURL;

  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the Autos list from the backend.
   */
  public getAutos(): Observable<Auto[]> {
    return this.httpClient.get<Auto[]>(`${this.apiURL}/all`);
  }
}
