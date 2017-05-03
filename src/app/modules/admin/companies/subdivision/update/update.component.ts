import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../../models/Company';
import { MsgService } from '../../../../../services/msg';
import { CompaniesService } from '../../../../../services/companies.service';
import { Subdivision } from '../../../../../models/Subdivision';
import { SubdivisionsService } from '../../../../../services/subdivisions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subdivision-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class SubdivisionUpdateComponent implements OnInit {

  public subdivision: Subdivision;
  public ru: any;
  public companies: Company[];
  public matchCompanies: Company[];

  constructor(private msg: MsgService,
              private subdivisionsService: SubdivisionsService,
              private route: ActivatedRoute,
              private companiesService: CompaniesService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const company_id: number = +params['company'];
      const subdivision_id: number = +params['subdivision'];
      this.subdivisionsService.get(company_id, subdivision_id).subscribe(
        subdivision => {
          this.subdivision = subdivision;
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

  public save() {
    /**
     * TODO: использовать валидаторы форм
     */
    if (this.subdivision.name === null) {
      this.msg.notice(MsgService.ERROR, 'Заполинте все поля', 'Заполните название подразделения');
      return false;
    } else if (this.subdivision.company === null) {
      this.msg.notice(MsgService.ERROR, 'Заполинте все поля', 'Укажите компанию');
      return false;
    }
    this.subdivisionsService.update(this.subdivision).subscribe(
      subdivision => {
        this.subdivision = subdivision;
        this.companiesService.resync().subscribe();
        this.msg.notice(MsgService.SUCCESS, 'Сохранено', 'Подразделение успешно изменено');
      },
      error => {
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public search(event: any) {
    this.matchCompanies = this.companiesService.findByName(event.query, this.companies);
  }

  public onSelect(company: Company) {
    this.subdivision.company = company;
  }

  public delete() {
    if (confirm('Вы действительно хотите удалить подразделение?')) {
      this.subdivisionsService.delete(this.subdivision).subscribe(
        result => {
        },
        error => {
          this.msg.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    }
  }
}
