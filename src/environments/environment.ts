// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyDsnO2rl8WVWoMhbAt5lTvaCh6Boq58OTk',
    authDomain: 'agrofrost-a5c31.firebaseapp.com',
    databaseURL: 'https://agrofrost-a5c31-default-rtdb.firebaseio.com',
    projectId: 'agrofrost-a5c31',
    storageBucket: 'agrofrost-a5c31.appspot.com',
    messagingSenderId: '237140780954',
    appId: '1:237140780954:web:e4a7a86854b68f6efffc23',
    measurementId: 'G-06RF9JV7VW',
  },
  gcpApi: {
    web: {
      client_id:
        '66417452803-goil61145cvfq64c2r69fhm4a52l3sb9.apps.googleusercontent.com',
    },
  },
  datosAbiertosGovco : {
    clientID : '26r4brc5txfzavbq6pb84e8d8',
    apiKey : '24jqq5wjj90iqwaayd2u0dbygbv5r9db0xq4s98oqla1yqp1tf',
    appTtoken : '5lXvVAUcBJ5ovX7n4ZsGqBreY'
  }

};

// https://www.datos.gov.co/es/profile/edit/developer_settings => para obtner creendiclaes
//https://dev.socrata.com/foundry/www.datos.gov.co/2pnw-mmge 

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
