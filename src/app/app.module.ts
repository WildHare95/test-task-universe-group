import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PdfJsViewerModule } from "ng2-pdfjs-viewer";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { PdfRequestInterceptorInterceptor } from "./interceptors/pdf-request-interceptor.interceptor";
import { FormsModule } from "@angular/forms";
import { NgxIndexedDBModule } from "ngx-indexed-db";
import { initFlowbite } from "flowbite";
import { environment as env } from "../environments/environment.development";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfJsViewerModule,
    HttpClientModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(env.dbConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PdfRequestInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    initFlowbite();
  }
}
