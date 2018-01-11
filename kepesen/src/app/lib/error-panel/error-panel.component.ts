import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.css']
})
export class ErrorPanelComponent implements OnInit {

  @Input() active : boolean;
  @Input() message : string;

  constructor() { }

  ngOnInit() {
  }

}
