import { Component, input, output } from '@angular/core';
import { Device } from '../../data-access/device';

@Component({
  imports: [],
  selector: 'app-device-card',
  styleUrl: './device-card.css',
  templateUrl: './device-card.html',
})
export class DeviceCard {
  public readonly device = input.required<Device>();
  public readonly navigationSelected = output<string | number>();
}
