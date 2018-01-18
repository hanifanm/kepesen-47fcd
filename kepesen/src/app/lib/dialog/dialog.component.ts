import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() onCancel : any;
  @Input() title : string;
  dialogTitle : string;

  constructor() { }

  ngOnInit() {
    this.dialogTitle = this.title? this.title : '';
  }

}
