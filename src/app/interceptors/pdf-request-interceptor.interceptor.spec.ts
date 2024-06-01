import { TestBed } from '@angular/core/testing';

import { PdfRequestInterceptorInterceptor } from './pdf-request-interceptor.interceptor';

describe('PdfRequestInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PdfRequestInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PdfRequestInterceptorInterceptor = TestBed.inject(PdfRequestInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
