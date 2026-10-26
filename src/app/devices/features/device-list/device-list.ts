import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DeviceClient } from '../../data-access/device-client';
import { DeviceCard } from '../../iu/device-card/device-card';

@Component({
  selector: 'app-device-list',
  imports: [DeviceCard],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList {
  private readonly client = inject(DeviceClient);
  protected readonly router = inject(Router);
  private readonly devices = toSignal(this.client.getAllDevices());

  protected readonly categories: string[] = ['Moka', 'Sifón japonés', 'Origami', 'AeroPress', 'Chemex', 'V60', 'Espresso'];
  protected readonly categoryFilter = signal<string>('');
  protected readonly sortOrder = signal<'asc' | 'desc' | string>('asc');

  protected readonly filteredDevices = computed(() => {
    const devices = this.devices() || [];

    const filtered = devices.filter((device) => {
      const categoryFilter = this.categoryFilter();
      return categoryFilter ? device.category === categoryFilter : true;
    });

    switch (this.sortOrder()) {
      case 'asc':
        return filtered.sort((a, b) => a.salePrice - b.salePrice);
      case 'desc':
        return filtered.sort((a, b) => b.salePrice - a.salePrice);
      default:
        return filtered;
    }
  });

  navigateToDetails(id: string | number) {
  this.router.navigate(['/productos', id]);
}

  protected readonly deviceAmout = computed(() => {
    return this.filteredDevices().length;
  });
}