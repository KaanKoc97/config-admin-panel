import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddConfigComponent } from './components/add-config/add-config.component';
import { ModifyDeviceComponent } from './components/modify-device/modify-device.component';

const routes: Routes = [
  { path: '', component: TutorialsListComponent },
  { path: 'addProject', component: AddTutorialComponent },
  { path: 'addDevice', component: AddDeviceComponent },
  { path: 'addConfig', component: AddConfigComponent },
  { path: 'modifyDevice', component: ModifyDeviceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
