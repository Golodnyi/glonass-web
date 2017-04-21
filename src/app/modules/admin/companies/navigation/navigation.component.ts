import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {CompaniesService} from '../../../../services/companies.service';
import {SubdivisionsService} from '../../../../services/subdivisions.service';
import {CarsService} from '../../../../services/cars.service';
import {MsgService} from '../../../../services/msg';
import {EnginesService} from '../../../../services/engines.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public companies: TreeNode[];
  public node: TreeNode;

  constructor(private companiesService: CompaniesService, private subdivisionsService: SubdivisionsService, private carsService: CarsService, private msgService: MsgService, private enginesService: EnginesService, private router: Router) {
  }

  /**
   * TODO: разобраться каким образом можно перезагружать компонент
   * из другого компонента, нужно для актуализации информации
   * после ее редактированяи в дочерних модулях/компонентах
   */
  ngOnInit() {
    this.companiesService.getCompaniesAsTree(false, true).subscribe(
      tree => {
        this.companies = tree;
      },
      error => {
        this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
      }
    );
  }

  public onNodeExpand(event: any) {
    if (event.node) {
      if (event.node.type === 'company') {
        this.subdivisionsService.getSubdivisionsAsTree(event.node.data, false, true).subscribe(
          tree => {
            event.node.children = tree;
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      } else if (event.node.type === 'subdivision') {
        this.carsService.getCarsAsTree(event.node.parent.data, event.node.data, false, true).subscribe(
          tree => {
            event.node.children = tree;
          },
          error => {
            this.msgService.notice(MsgService.ERROR, 'Ошибка', error);
          }
        );
      } else if (event.node.type === 'car') {
        this.enginesService.getEngineAsTree(event.node.parent.parent.data, event.node.parent.data, event.node.data, true, true).subscribe(
          tree => {
            event.node.children = tree;
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
    this.router.navigate(['/admin/companies/' + object.type + '/' + object.data]);
  }
}
