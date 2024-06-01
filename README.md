# Universe Group Technical Tasks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.9.

## Project Structure

Додаток складається з одного, головного, модуля **app.module.ts** та однієї компоненти `app.component.ts`. Де зібрані всі необхідні залежності.
Так само присутні два сервіси для роботи з локальним сховищем у вигляді indexedDB, **indexed-db.service.ts**, і сервіс за допомогою якого робиться запит на сервер, **pdf.service.ts**, і як результат на виході PDF файл введеного тексту.
Такий структор досить щоб покрити необхідний функціонал.

**app**:
  - **interceptors**
    - *pdf-request-interceptor.interceptor.ts*
  - **services**
    - *indexed-db.service.ts*
    - *pdf.service.ts*
  - *app.component.ts*
  - *app.module.ts*
  - *models.ts*

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

