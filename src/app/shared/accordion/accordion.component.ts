import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() isVisited: boolean;
  @Input() title: string;
  @Input() ishidden: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}