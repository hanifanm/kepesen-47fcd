import { Component, OnInit, Input } from '@angular/core';

export interface ITableProp {
  label: string,
  key: string
}

export interface IRowAction {
  label: string,
  key: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() model: ITableProp[];
  @Input() collections: any[];
  @Input() rowAction: IRowAction[];
  @Input() onRowAction: any;
  @Input() onRefresh: any;

  filter: string = '';

  constructor() { }

  ngOnInit() {

  }

  getCollectionsFiltered() {
    if (this.filter === '') return this.collections
    else {
      return this.collections.filter(c => {
        for (let i = 0; i < this.model.length; i++) {
          let key = this.model[i].key
          if (c[key].toString().toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
            return true;
          }
        }
        return false;
      });
    }
  }

}
