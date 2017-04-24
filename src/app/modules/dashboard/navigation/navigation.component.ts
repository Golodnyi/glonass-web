import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {CompaniesService} from '../../../services/companies.service';
import {SubdivisionsService} from '../../../services/subdivisions.service';
import {CarsService} from '../../../services/cars.service';
import {MsgService} from '../../../services/msg';
import {Router} from '@angular/router';
import {Company} from '../../../models/Company';
import {TreePipe} from '../../../pipes/tree.pipe';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public companies: Company[];

  constructor(private companiesService: CompaniesService, private subdivisionsService: SubdivisionsService, private carsService: CarsService, private msgService: MsgService, private router: Router, private tree: TreePipe) {
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
          subdivisions => {
            event.node.children = this.tree.transform(subdivisions);
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      } else if (event.node.type === 'Subdivision') {
        this.carsService.getCars(event.node.parent.data, event.node.data).subscribe(
          cars => {
            event.node.children = this.tree.transform(cars, true, true);
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      }
    }
  }

  public onNodeSelect(event: any) {
    this.router.navigate(['dashboard/charts/' + event.node.data]);
  }
}
