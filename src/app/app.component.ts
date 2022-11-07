import { Component } from '@angular/core';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCcqoPC73QzBtZYp92ePIE8h_vR12BcmXU',
  databaseURL: 'https://angularchat-17c74-default-rtdb.asia-southeast1.firebasedatabase.app'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';

  constructor() {
    firebase.initializeApp(config);
  }
}
