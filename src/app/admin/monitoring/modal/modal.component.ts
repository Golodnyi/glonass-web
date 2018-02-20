import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {CommentsService} from '../shared/comments.service';
import {Comment} from '../shared/comment.model';
import {isNumber} from 'util';

@Component({
    selector   : 'app-admin-modal',
    templateUrl: 'modal.component.html',
    styleUrls  : ['modal.component.css'],
    providers: [CommentsService]
})
export class ModalComponent implements OnChanges {
    @Input() show: boolean;
    @Input() car: number;
    @Output() hideComments = new EventEmitter();

    public comments: Comment[] = [];
    constructor(private commentsService: CommentsService) {
        this.update();
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
}
