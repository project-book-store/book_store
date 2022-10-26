// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: `http://localhost:8080/api/public`,
  firebase : {
    apiKey: 'AIzaSyB8t97Kui38VEtP3lLSQX_8jxxS_YzlC4s',
    authDomain: 'book-store-5d4df.firebaseapp.com',
    projectId: 'book-store-5d4df',
    storageBucket: 'book-store-5d4df.appspot.com',
    messagingSenderId: '895188328847',
    appId: '1:895188328847:web:35e6d090068c073b7e6bfa',
    databaseURL: 'https://book-store-5d4df-default-rtdb.firebaseio.com/',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
