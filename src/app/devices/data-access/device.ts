export interface Device {
  id: string;
  modelName: string;
  category: string;
  salePrice: number;
  brand: string;
  material: string;
  isInStore: boolean;
  notes: string;
  cupProfile: string;
}

export type DeviceFormModel = Omit<Device, 'id'>;