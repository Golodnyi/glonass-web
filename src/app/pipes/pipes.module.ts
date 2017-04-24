import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreePipe} from './tree.pipe';
import {DropDownPipe} from './dropdown.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TreePipe, DropDownPipe],
  exports: [TreePipe, DropDownPipe],
})
export class PipesModule {
}
