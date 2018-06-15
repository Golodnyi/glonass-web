import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../../../../shared/models/car.model';
import { FormGroup } from '@angular/forms';
import { CommentsService } from '../../../../admin/monitoring/shared/comments.service';
import { CommentForm } from '../../shared/comment.form';

@Component({
  selector: 'app-append-comment',
  templateUrl: './append-comment.component.html',
  styleUrls: ['./append-comment.component.css'],
  providers: [CommentsService, CommentForm]
})
export class AppendCommentComponent {
  @Input() car: Car;
  @Input() visible: boolean;
  @Output() hide = new EventEmitter();
  public form: FormGroup;
  public submit: boolean;
  private comment: string;

  constructor(private commentsService: CommentsService, private commentForm: CommentForm) {
    this.form = this.commentForm.create();
    this.form.valueChanges
      .subscribe((data) => {
        this.submit = false;
        this.comment = data.comment;
      });
  }

  public onSubmit() {
    this.submit = true;
    this.commentsService.create(this.car.id, this.comment).subscribe(
      () => {
        this.submit = false;
        this.onHide();
      },
      () => {
        this.submit = false;
      }
    );
  }

  public onHide() {
    this.visible = false;
    this.hide.emit(true);
  }

  public onShow() {
    this.hide.emit(false);
  }

}
