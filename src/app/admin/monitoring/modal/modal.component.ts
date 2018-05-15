import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { Comment } from '../shared/comment.model';
import { CommentForm } from './shared/comment.form';
import { MsgService } from '../../../shared/services/msg';
import { FormGroup } from '@angular/forms';

@Component({
    selector   : 'app-admin-modal',
    templateUrl: 'modal.component.html',
    styleUrls  : ['modal.component.css'],
    providers  : [CommentsService, CommentForm]
})
export class ModalComponent implements OnChanges {
    @Input() show: boolean;
    @Input() car: number;
    @Output() hideComments = new EventEmitter();
    public form: FormGroup;
    private message: string;

    public comments: Comment[] = [];

    constructor(private commentsService: CommentsService,
                private commentForm: CommentForm,
                private msg: MsgService) {
        this.update();
        this.form = this.commentForm.create();
        this.form.valueChanges.subscribe((data) => {
            this.message = data.message;
        });
    }

    public hideModal() {
        this.show = false;
        this.hideComments.emit(false);
    }

    ngOnChanges(event: any) {
        this.update();
    }

    private update() {
        if (this.car !== undefined) {
            this.commentsService.all(this.car).subscribe(
                comments => {
                    this.comments = comments;
                }
            );
        }
    }

    public onSubmit() {
        this.commentsService.create(this.car, this.message).subscribe(
            () => {
                this.update();
                this.msg.notice(MsgService.SUCCESS, 'Успех', 'Комментарий добавлен');
            }
        );
    }
}
