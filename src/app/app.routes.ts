import { Routes } from '@angular/router';
import { DeviceList } from './devices/features/device-list/device-list';
import { DeviceDetails } from './devices/features/device-details/device-details';
import { DeviceForm } from './devices/features/device-form/device-form';

export const routes: Routes = [
    {path: '', redirectTo: '/device', pathMatch: 'full'},
    {path: 'device' , component: DeviceList},
    {path: 'device/agregar' , component: DeviceForm},
    {path: 'device/:id' , component: DeviceDetails},
    {path: '**', redirectTo: '/device'}
];
