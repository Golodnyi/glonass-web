import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../../models/Company';
import {MsgService} from '../../../../../services/msg';
import {CompaniesService} from '../../../../../services/companies.service';
import {Subdivision} from '../../../../../models/Subdivision';
import {SubdivisionsService} from '../../../../../services/subdivisions.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private msg: MsgService, private subdivisionsService: SubdivisionsService, private route: ActivatedRoute, private companiesService: CompaniesService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = +params['id'];
      this.subdivisionsService.get(id).subscribe(
        subdivision => {
          this.subdivision = subdivision;
        },
        error => {
          this.msg.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    });
    this.companiesService.getCompanies().subscribe(
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
    this.subdivisionsService.delete(this.subdivision).subscribe();
  }
}
