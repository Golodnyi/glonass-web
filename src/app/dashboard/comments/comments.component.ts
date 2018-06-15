import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../shared/models/car.model';
import { CommentsService } from '../../admin/monitoring/shared/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentsService]
})
export class CommentsComponent implements OnChanges {
  @Input() car: Car;
  public comments = [];
  constructor(private commentsService: CommentsService) { }

  ngOnChanges(changes: any) {
    if (changes.car.currentValue === null) {
      return;
    }
    this.commentsService.all(this.car.id).subscribe(comments => {
      this.comments = comments;
    });
  }

}
