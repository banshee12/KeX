import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'kex-star-rating',
  templateUrl: './kex-star-rating.component.html',
  styleUrl: './kex-star-rating.component.scss'
})
export class KexStarRatingComponent {
  @Input() rating: number = 1;
  @Input() starCount: number = 5;
  @Input() color: string = '';
  @Input() edit = false;
  @Output() ratingUpdated = new EventEmitter();

  public ratingArr : number[] = [];
  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    if(this.edit){
      this.rating = rating;
      this.ratingUpdated.emit(rating);
    }
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getTooltipText(ratingId: number) {
    return 'tst';
  }
}
