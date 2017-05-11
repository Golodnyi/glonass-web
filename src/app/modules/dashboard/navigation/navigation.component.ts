import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies.service';
import { SubdivisionsService } from '../../../services/subdivisions.service';
import { CarsService } from '../../../services/cars.service';
import { MsgService } from '../../../services/msg';
import { Router } from '@angular/router';
import { Company } from '../../../models/Company';
import { TreePipe } from '../../../pipes/tree.pipe';
import { Subdivision } from '../../../models/Subdivision';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public companies: Company[];

  constructor(private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService,
              private carsService: CarsService,
              private msgService: MsgService,
              private router: Router,
              private tree: TreePipe) {
  }

  ngOnInit() {
    this.companiesService.all().subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onNodeExpand(event: any) {
    const obj = event.node.data;
    if (obj instanceof Company) {
      this.subdivisionsService.all(obj.id).subscribe(
        subdivisions => {
          event.node.children = this.tree.transform(subdivisions);
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    } else if (obj instanceof Subdivision) {
      const parentObj = [event.node.parent.data];
      this.carsService.all(parentObj[0].id, obj.id).subscribe(
        cars => {
          event.node.children = this.tree.transform(cars, true, true);
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    }
  }

  public onNodeSelect(event: any) {
    const obj = event.node.data;
    this.router.navigate(['dashboard/charts/' + obj.id]);
  }
}
