import { Component, computed, inject, OnInit, output, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceClient } from '../../data-access/device-client';
import { Device } from '../../data-access/device';

@Component({
  selector: 'app-device-form',
  imports: [ReactiveFormsModule],
  templateUrl: './device-form.html',
  styleUrl: './device-form.css',
})
export class DeviceForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly client = inject(DeviceClient);

  protected readonly categories: string[] = ['Moka', 'Sifón japonés', 'Origami', 'AeroPress', 'Chemex', 'V60', 'Espresso'];

  public readonly editingDevice = input<Device | undefined>();
  protected readonly isEditing = computed(() => this.editingDevice() !== undefined);
  public readonly saved = output<Device>();

  protected readonly form = this.fb.nonNullable.group({
    modelName: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', Validators.required],
    salePrice: [0, [Validators.required, Validators.min(1000)]],
    brand: ['', [Validators.required, Validators.minLength(3)]],
    material: ['', [Validators.required, Validators.minLength(3)]],
    isInStore: [false, Validators.required],
    notes: ['', Validators.required],
    cupProfile: ['', Validators.required]
  });

  ngOnInit() {
    const device = this.editingDevice();
    if (device) {
      this.form.patchValue(device);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const editing = this.editingDevice();

    if (editing) {
      this.client.editDevice(value, editing.id).subscribe((updated) => {
        alert('Modificado con éxito');
        this.saved.emit(updated);
      });
    } else {
      this.client.addDevice(value).subscribe(() => {
        alert('Agregado con éxito');
        this.form.reset();
      });
    }
  }
}