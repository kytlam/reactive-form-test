import { Component } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataSource: any;

  constructor() {
    this.dataSource = AspNetData.createStore({
        key: 'Id',
        loadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales'
    });
  }
}
