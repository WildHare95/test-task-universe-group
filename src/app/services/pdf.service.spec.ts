import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PDFService } from './pdf.service';
import { environment as env } from '../../environments/environment.development';

describe('PDFService', () => {
  let service: PDFService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PDFService]
    });

    service = TestBed.inject(PDFService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate PDF from text', (done: DoneFn) => {
    const dummyText = 'Test text';
    const dummyBlob = new Blob(['Test Content'], { type: 'application/pdf' });

    service.generatePDFFromText(dummyText).subscribe((response) => {
      expect(response).toEqual(dummyBlob);
      done();
    });

    const req = httpMock.expectOne(env.url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ text: dummyText });
    req.flush(dummyBlob);
  });
});
