import { Component } from '@angular/core';
import { Company } from '../../../../../models/Company';
import { MsgService } from '../../../../../services/msg';
import { AuthService } from '../../../../../services/auth.service';
import { CompaniesService } from '../../../../../services/companies.service';
import { Subdivision } from '../../../../../models/Subdivision';
import { SubdivisionsService } from '../../../../../services/subdivisions.service';
import { FormGroup } from '@angular/forms';
import { SubdivisionCreateForm } from '../../../../../forms/subdivision/create.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subdivision-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [SubdivisionCreateForm]
})

export class SubdivisionCreateComponent {

  public subdivision: Subdivision = new Subdivision();
  public companies: Company[];
  public form: FormGroup;
  public submit: boolean;

  constructor(private authService: AuthService,
              private msg: MsgService,
              private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService,
              private subdivisionCreateForm: SubdivisionCreateForm,
              private router: Router) {
    this.form = this.subdivisionCreateForm.create(this.subdivision);
    this.form.valueChanges.subscribe((data) => {
      this.subdivision = data;
      this.authService.getCurrentUser().subscribe(
        user => {
          this.subdivision.author = user;
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
    this.submit = true;
    this.subdivisionsService.create(this.subdivision).take(1).subscribe(
      subdivision => {
        this.subdivision = subdivision;
        this.submit = false;
        this.msg.notice(MsgService.SUCCESS, 'Создано', 'Подразделение ' + subdivision.name + ' создано');
        this.router.navigate(
          [
            '/admin/companies/company',
            this.subdivision.company_id,
            'subdivision',
            this.subdivision.id
          ]);
      },
      error => {
        this.submit = false;
        this.msg.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }
}
