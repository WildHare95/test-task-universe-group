import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment as env} from "../../environments/environment.development";

@Injectable()
export class PdfRequestInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedParams = new HttpParams()
      .set('apiKey', env.API_KEY)

    const clonedRequest = request.clone({params: modifiedParams})

    return next.handle(clonedRequest);
  }
}
