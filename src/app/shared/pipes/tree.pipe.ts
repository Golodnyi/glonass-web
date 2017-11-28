import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { ITree } from '../models/tree.model';
import { isUndefined } from 'util';

@Pipe({ name: 'tree' })
export class TreePipe implements PipeTransform {
  transform(data: ITree[], leaf = false, selectable = false, expanded = false): TreeNode[] {
    const items: TreeNode[] = [];
    if (isUndefined(data)) {
      return items;
    }

    data.forEach(function (item) {
      items.push(
        {
          data: item,
          expandedIcon: 'fa-folder-open',
          expanded: expanded,
          collapsedIcon: 'fa-folder',
          leaf: leaf || false,
          selectable: selectable || false,
        }
      );
    });
    return items;
  }
}
