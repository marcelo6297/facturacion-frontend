import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Facturacion V0.1';
  showSideNav = false;
  toogleSideNav() {
      this.showSideNav = !this.showSideNav;
  }
}
