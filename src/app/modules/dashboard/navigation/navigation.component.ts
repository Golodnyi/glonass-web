import { Component, OnDestroy } from '@angular/core';
import { CompaniesService } from '../../../services/companies.service';
import { SubdivisionsService } from '../../../services/subdivisions.service';
import { CarsService } from '../../../services/cars.service';
import { MsgService } from '../../../services/msg';
import { Router } from '@angular/router';
import { Company } from '../../../models/Company';
import { TreePipe } from '../../../pipes/tree.pipe';
import { Subdivision } from '../../../models/Subdivision';
import { Car } from '../../../models/Car';
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

  constructor(private companiesService: CompaniesService,
              private subdivisionsService: SubdivisionsService,
              private carsService: CarsService,
              private msgService: MsgService,
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
  }

  public onNodeExpand(event: any) {
    const obj = event.node.data;
    if (obj instanceof Company) {
      if (this.ss) {
        this.ss.unsubscribe();
      }
      this.ss = this.subdivisionsService.all(obj.id, true).subscribe(
        subdivisions => {
          event.node.children = this.tree.transform(subdivisions);
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
      this.cas = this.carsService.all(parentObj[0].id, obj.id, true, true).subscribe(
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

  public isCar(car: Car) {
    return car instanceof Car;
  }
}
