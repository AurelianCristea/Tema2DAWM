import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './Table/table/table.component';

const routes: Routes = [{
  path:'',
  loadChildren:()=> import ('./Table/table/table.component').then(m=>m.TableComponent)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
