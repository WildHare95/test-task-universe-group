import { TestBed } from '@angular/core/testing';

import { IndexedDBService } from './indexed-db.service';
import { NgxIndexedDBService } from "ngx-indexed-db";
import { environment as env } from '../../environments/environment.development';
import { IPDFFile } from "../models";
import { of } from "rxjs";

describe('IndexedDBService', () => {
  let service: IndexedDBService;
  let dbServiceSpy: jasmine.SpyObj<NgxIndexedDBService>;
  const storeKey = env.dbConfig.objectStoresMeta[0].store;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NgxIndexedDBService', ['add', 'getByID', 'getAll', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        IndexedDBService,
        { provide: NgxIndexedDBService, useValue: spy }
      ]
    });

    service = TestBed.inject(IndexedDBService);
    dbServiceSpy = TestBed.inject(NgxIndexedDBService) as jasmine.SpyObj<NgxIndexedDBService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a file', (done: DoneFn) => {
    const dummyFile: IPDFFile & { id: number } = { name: 'Test File', label: 'Test Label', data: new Blob(['Test Content'], { type: 'application/pdf' }), id: 1 };
    dbServiceSpy.add.and.returnValue(of(dummyFile));

    service.addFile(dummyFile).subscribe((file) => {
      expect(file).toEqual(dummyFile);
      expect(dbServiceSpy.add.calls.count()).toBe(1);
      expect(dbServiceSpy.add.calls.first().args[0]).toBe(storeKey);
      expect(dbServiceSpy.add.calls.first().args[1]).toBe(dummyFile);
      done();
    });
  });

  it('should get a file by id', (done: DoneFn) => {
    const dummyFile: IPDFFile = { name: 'Test File', label: 'Test Label', data: new Blob(['Test Content'], { type: 'application/pdf' }) };
    dbServiceSpy.getByID.and.returnValue(of(dummyFile));

    service.getFileById(1).subscribe((file) => {
      expect(file).toEqual(dummyFile);
      expect(dbServiceSpy.getByID.calls.count()).toBe(1);
      expect(dbServiceSpy.getByID.calls.first().args[0]).toBe(storeKey);
      expect(dbServiceSpy.getByID.calls.first().args[1]).toBe(1);
      done();
    });
  });

  it('should get all files', (done: DoneFn) => {
    const dummyFiles: (IPDFFile & { id: number })[] = [
      { id: 1, name: 'Test File 1', label: 'Test Label 1', data: new Blob(['Test Content 1'], { type: 'application/pdf' }) },
      { id: 2, name: 'Test File 2', label: 'Test Label 2', data: new Blob(['Test Content 2'], { type: 'application/pdf' }) }
    ];
    dbServiceSpy.getAll.and.returnValue(of(dummyFiles));

    service.getAllFiles().subscribe((files) => {
      expect(files).toEqual(dummyFiles);
      expect(dbServiceSpy.getAll.calls.count()).toBe(1);
      expect(dbServiceSpy.getAll.calls.first().args[0]).toBe(storeKey);
      done();
    });
  });

  it('should truncate a string', () => {
    const str = 'This is a very long string that needs to be truncated';
    const truncatedStr = service.truncateString(str, 10);
    expect(truncatedStr).toBe('This is a...');
  });

  it('should not truncate a short string', () => {
    const str = 'Short string';
    const truncatedStr = service.truncateString(str, 20);
    expect(truncatedStr).toBe(str);
  });
});
