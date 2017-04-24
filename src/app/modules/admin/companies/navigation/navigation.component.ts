import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../../../services/companies.service';
import {SubdivisionsService} from '../../../../services/subdivisions.service';
import {CarsService} from '../../../../services/cars.service';
import {MsgService} from '../../../../services/msg';
import {EnginesService} from '../../../../services/engines.service';
import {Router} from '@angular/router';
import {TreePipe} from '../../../../pipes/tree.pipe';
import {Company} from '../../../../models/Company';

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
  }

  ngOnInit() {
    this.companiesService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onNodeExpand(event: any) {
    if (event.node) {
      if (event.node.type === 'Company') {
        this.subdivisionsService.getSubdivisions(event.node.data).subscribe(
          subdivision => {
            event.node.children = this.tree.transform(subdivision, false, true);
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      } else if (event.node.type === 'Subdivision') {
        this.carsService.getCars(event.node.parent.data, event.node.data).subscribe(
          cars => {
            event.node.children = this.tree.transform(cars, false, true);
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      } else if (event.node.type === 'Car') {
        this.enginesService.getEngine(event.node.parent.parent.data, event.node.parent.data, event.node.data).subscribe(
          engine => {
            event.node.children = this.tree.transform([engine], true, true);
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      }
    }
  }

  public onNodeSelect(event: any) {
    const object = event.node;
    this.router.navigate(['/admin/companies/' + object.type.toLowerCase() + '/' + object.data]);
  }
}
