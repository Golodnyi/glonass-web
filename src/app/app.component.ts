import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: '<app-navigation></app-navigation><div class="container"><router-outlet></router-outlet></div>',
})
export class AppComponent {
  title = 'app works!';
}
