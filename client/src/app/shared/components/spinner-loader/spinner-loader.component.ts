import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})
export class SpinnerLoaderComponent implements OnInit {
  @Input() diameter: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
