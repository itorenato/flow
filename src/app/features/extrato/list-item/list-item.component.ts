import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() data!: string;
  @Input() nome!: string;
  @Input() descricao!: string;
  @Input() categoria!: string;
  @Input() tipo!: string;
  @Input() valor!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
