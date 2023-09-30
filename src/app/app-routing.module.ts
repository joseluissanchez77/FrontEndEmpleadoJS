import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveComponent } from './user/save/save.component';
import { IndexComponent } from './user/index/index.component';
import { EditComponent } from './user/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  {path:'employee-save', component:SaveComponent},
  {path:'employee-edit/:id', component:EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
