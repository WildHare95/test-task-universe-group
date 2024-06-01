import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { PdfRequestInterceptorInterceptor } from './pdf-request-interceptor.interceptor';
import { environment as env } from '../../environments/environment.development';

describe('PdfRequestInterceptorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: PdfRequestInterceptorInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add API key to request params', (done: DoneFn) => {
    const testUrl = 'https://api.example.com/test';

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne((request) =>
      request.url === testUrl && request.params.has('apiKey') && request.params.get('apiKey') === env.API_KEY
    );

    expect(req.request.method).toBe('GET');
    req.flush({});  // Respond with a dummy object
  });
});
