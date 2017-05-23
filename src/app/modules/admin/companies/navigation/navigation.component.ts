import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../../services/companies.service';
import { SubdivisionsService } from '../../../../services/subdivisions.service';
import { CarsService } from '../../../../services/cars.service';
import { MsgService } from '../../../../services/msg';
import { EnginesService } from '../../../../services/engines.service';
import { Router } from '@angular/router';
import { TreePipe } from '../../../../pipes/tree.pipe';
import { Company } from '../../../../models/Company';
import { Subdivision } from '../../../../models/Subdivision';
import { Car } from '../../../../models/Car';
import { Engine } from '../../../../models/Engine';

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
              private enginesService: EnginesService,
              private router: Router,
              private tree: TreePipe) {
    this.companiesService.all(true).subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  ngOnInit() {
  }

  public onNodeExpand(event: any) {
    const obj = event.node.data;
    if (obj instanceof Company) {
      this.subdivisionsService.all(obj.id, true).subscribe(
        subdivision => {
          event.node.children = this.tree.transform(subdivision, false, true);
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    } else if (obj instanceof Subdivision) {
      const parentObj = [event.node.parent.data];
      this.carsService.all(parentObj[0].id, obj.id).subscribe(
        cars => {
          event.node.children = this.tree.transform(cars, false, true);
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    } else if (obj instanceof Car) {
      const parentObj = [];
      parentObj.push(event.node.parent.data);
      parentObj.push(event.node.parent.parent.data);
      this.enginesService.get(parentObj[1].id, parentObj[0].id, obj.id).subscribe(
        engine => {
          if (engine.id) {
            event.node.children = this.tree.transform([engine], true, true);
          }
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    }
  }

  public onNodeSelect(event: any) {
    const obj = event.node.data;
    if (obj instanceof Company) {
      this.router.navigate([
        '/admin/companies/company/', obj.id
      ]);
    } else if (obj instanceof Subdivision) {
      const parentObj = [event.node.parent.data];
      this.router.navigate([
        '/admin/companies/company/', parentObj[0].id,
        'subdivision', obj.id
      ]);
    } else if (obj instanceof Car) {
      const parentObj = [];
      parentObj.push(event.node.parent.data);
      parentObj.push(event.node.parent.parent.data);
      this.router.navigate([
        '/admin/companies/company/', parentObj[1].id,
        'subdivision', parentObj[0].id,
        'car', obj.id
      ]);
    } else if (obj instanceof Engine) {
      const parentObj = [];
      parentObj.push(event.node.parent.data);
      parentObj.push(event.node.parent.parent.data);
      parentObj.push(event.node.parent.parent.parent.data);
      this.router.navigate([
        '/admin/companies/company/', parentObj[2].id,
        'subdivision', parentObj[1].id,
        'car', parentObj[0].id,
        'engine', obj.id
      ]);
    }
  }
}
