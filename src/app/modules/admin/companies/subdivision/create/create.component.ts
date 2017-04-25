import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../../models/Company';
import {MsgService} from '../../../../../services/msg';
import {AuthService} from '../../../../../services/auth.service';
import {CompaniesService} from '../../../../../services/companies.service';
import {Subdivision} from '../../../../../models/Subdivision';
import {SubdivisionsService} from '../../../../../services/subdivisions.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-subdivision-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class SubdivisionCreateComponent implements OnInit {

  public subdivision: Subdivision = new Subdivision();
  public ru: any;
  public companies: Company[];
  public matchCompanies: Company[];

  constructor(private authService: AuthService,
              private msg: MsgService,
              private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.subdivision.author = user;
      }
    );
    this.companiesService.getCompanies(false).subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public create() {
    /**
     * TODO: использовать валидаторы форм
     */
    if (isUndefined(this.subdivision.name)) {
      this.msg.notice(MsgService.ERROR, 'Заполинте все поля', 'Заполните название подразделения');
      return false;
    } else if (isUndefined(this.subdivision.company_id)) {
      this.msg.notice(MsgService.ERROR, 'Заполинте все поля', 'Укажите компанию');
      return false;
    }
    this.subdivisionsService.create(this.subdivision).subscribe(
      subdivision => {
        this.subdivision = subdivision;
        this.companiesService.resync().subscribe();
        this.msg.notice(MsgService.SUCCESS, 'Создано', 'Подразделение ' + subdivision.name + ' создано');
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
}
