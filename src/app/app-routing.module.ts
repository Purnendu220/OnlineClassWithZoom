import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveClassComponent } from './live-class/live-class.component';


const routes: Routes = [ {
  path: 'liveClass/:id/:courseId/:token/:role',
  component: LiveClassComponent,
   pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
