import {AfterViewInit, Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  loading = false;

  constructor(
    private router: Router
  ) {
      this.loading = true;
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd || event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }
}
