import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceClient } from '../../data-access/device-client';
import { Device } from '../../data-access/device';
import { DeviceForm } from '../device-form/device-form';

@Component({
  selector: 'app-device-details',
  imports: [DeviceForm],
  templateUrl: './device-details.html',
  styleUrl: './device-details.css',
})
export class DeviceDetails implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly client = inject(DeviceClient);


  private readonly id = this.route.snapshot.paramMap.get('id')!;
  protected readonly device = signal<Device | undefined>(undefined);
  protected readonly isEditing = signal(false);

  ngOnInit() {
    this.client.getDeviceById(this.id).subscribe({
      next: (data) => this.device.set(data),
      error: () => {
        alert('Elemento no encontrado. Redirigiendo...');
        this.router.navigate(['/productos']);
      }
    });
  }

  onDeleted() {
    const { id } = this.device()!;
    this.client.deleteDevice(id).subscribe(() => {
      alert('Eliminado con éxito');
      this.router.navigate(['/productos']);
    });
  }

  volver() {
    this.router.navigate(['/productos']);
  }

  onEditedDevice(device: Device){
    this.isEditing.set(false);
    this.device.set(device);
  }

}