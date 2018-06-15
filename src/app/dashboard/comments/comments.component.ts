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
  public displayAppendComment: boolean;

  constructor(private commentsService: CommentsService) { }

  ngOnChanges(changes: any) {
    if (changes.car.currentValue === null) {
      return;
    }

    this.updateComments(this.car);
  }

  private updateComments(car: Car) {
    this.commentsService.all(car.id).subscribe(comments => {
      this.comments = comments;
    });
  }

  public appendHide(hide: boolean) {
    if (hide) {
      this.updateComments(this.car);
      this.displayAppendComment = false;
    }
  }

  public showAppendComment() {
    this.displayAppendComment = true;
  }
}
