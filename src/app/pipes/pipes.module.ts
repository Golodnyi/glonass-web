import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreePipe} from './tree.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TreePipe],
  exports: [TreePipe],
})
export class PipesModule {
}
