import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {

  @Input() ratings!: number ;

  constructor() { }

  ngOnInit(): void {
  }

}
