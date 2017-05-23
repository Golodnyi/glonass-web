import { Component } from '@angular/core';
import { Company } from '../../../../../models/Company';
import { MsgService } from '../../../../../services/msg';
import { CompaniesService } from '../../../../../services/companies.service';
import { Subdivision } from '../../../../../models/Subdivision';
import { SubdivisionsService } from '../../../../../services/subdivisions.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SubdivisionUpdateForm } from '../../../../../forms/subdivision/update.form';

@Component({
  selector: 'app-subdivision-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [SubdivisionUpdateForm]
})

export class SubdivisionUpdateComponent {

  public subdivision: Subdivision;
  public companies: Company[];
  public form: FormGroup;
  public submit: boolean;

  constructor(private msg: MsgService,
              private subdivisionsService: SubdivisionsService,
              private route: ActivatedRoute,
              private companiesService: CompaniesService,
              private subdivisionUpdateForm: SubdivisionUpdateForm) {
    this.route.params.subscribe(params => {
      const company_id: number = +params['company'];
      const subdivision_id: number = +params['subdivision'];
      this.subdivisionsService.get(company_id, subdivision_id).subscribe(
        subdivision => {
          this.subdivision = subdivision;
          this.form = this.subdivisionUpdateForm.create(this.subdivision);
          this.form.valueChanges.subscribe((data) => {
            this.subdivision.name = data.name;
          });
        },
        error => {
          this.msg.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    });
    this.companiesService.all(false).subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onSubmit() {
    this.subdivisionsService.update(this.subdivision).subscribe(
      subdivision => {
        this.subdivision = subdivision;
        this.submit = false;
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Подразделение успешно изменено');
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public delete() {
    if (confirm('Вы действительно хотите удалить подразделение?')) {
      this.subdivisionsService.delete(this.subdivision).subscribe(
        () => {
        },
        error => {
          this.msg.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    }
  }
}
