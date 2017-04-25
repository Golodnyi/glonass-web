import {Pipe, PipeTransform} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {ITree} from '../models/interface/ITree';
import {isUndefined} from 'util';

@Pipe({name: 'tree'})
export class TreePipe implements PipeTransform {
  transform(data: ITree[], leaf?: boolean, selectable?: boolean): TreeNode[] {
    const items: TreeNode[] = [];
    if (isUndefined(data)) {
      return items;
    }

    data.forEach(function (item) {
      items.push(
        {
          'label': item.name,
          'type': item.getClassName(),
          'data': item.id,
          'expandedIcon': 'fa-folder-open',
          'collapsedIcon': 'fa-folder',
          'leaf': leaf || false,
          'selectable': selectable || false,
        }
      );
    });
    return items;
  }
}
