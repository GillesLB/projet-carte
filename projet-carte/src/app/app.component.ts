import { Component } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor() {
    const config = {
      apiKey: 'AIzaSyB4rfI6SA7GEv4GNWqnHGUtJOA4S4gPb-Q',
      authDomain: 'projet-carte-ab2a9.firebaseapp.com',
      databaseURL: 'https://projet-carte-ab2a9.firebaseio.com/',
      projectId: 'projet-carte-ab2a9',
      storageBucket: 'projet-carte-ab2a9.appspot.com',
    };
    firebase.initializeApp(config);
  }

}
