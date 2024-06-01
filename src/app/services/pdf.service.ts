import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env }  from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor(private _http: HttpClient) { }

  public generatePDFFromText(text: string): Observable<Blob> {
    return this._http.post(env.url, {text}, {responseType: 'blob'})
  }
}

