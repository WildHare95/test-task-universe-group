
export const environment = {
  url: 'http://95.217.134.12:4010/create-pdf',
  API_KEY: '78684310-850d-427a-8432-4a6487f6dbc4',
  dbConfig: {
    name: 'PDFDateBase',
    version: 1,
    objectStoresMeta: [
      {
        store: 'pdfFiles',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'data', keypath: 'data', options: { unique: false } }
        ]
      }
    ]
  }
};
