import { Component, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {

  public companies: Company[];
  private cs: Subscription;
  private ss: Subscription;
  private cas: Subscription;
  private es: Subscription;

  constructor(private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService,
              private carsService: CarsService,
              private msgService: MsgService,
              private enginesService: EnginesService,
              private router: Router,
              private tree: TreePipe) {
    this.cs = this.companiesService.all(true).subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.cs) {
      this.cs.unsubscribe();
    }
    if (this.ss) {
      this.ss.unsubscribe();
    }
    if (this.cas) {
      this.cas.unsubscribe();
    }
    if (this.es) {
      this.es.unsubscribe();
    }
  }

  public onNodeExpand(event: any) {
    const obj = event.node.data;
    if (obj instanceof Company) {
      if (this.ss) {
        this.ss.unsubscribe();
      }
      this.ss = this.subdivisionsService.all(obj.id, true).subscribe(
        subdivision => {
          event.node.children = this.tree.transform(subdivision, false, true);
        },
        error => {
          this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
        }
      );
    } else if (obj instanceof Subdivision) {
      const parentObj = [event.node.parent.data];
      if (this.cas) {
        this.cas.unsubscribe();
      }
      this.cas = this.carsService.all(parentObj[0].id, obj.id, false, true).subscribe(
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
      if (this.es) {
        this.es.unsubscribe();
      }
      this.es = this.enginesService.get(parentObj[1].id, parentObj[0].id, obj.id, true).subscribe(
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
