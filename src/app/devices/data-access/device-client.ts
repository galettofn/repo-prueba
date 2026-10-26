import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Device, DeviceFormModel } from "./device";

@Service()
export class DeviceClient {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/devices';

  getAllDevices() {
    return this.http.get<Device[]>(this.url);
  }

  getDeviceById(id: number | string) {
    return this.http.get<Device>(this.url + '/' + id);
  }

  addDevice(newProduct: DeviceFormModel) {
    return this.http.post<Device>(this.url, newProduct);
  }

  editDevice(edittedProduct: DeviceFormModel, id: number | string) {
    return this.http.patch<Device>(this.url + '/' + id, edittedProduct);
  }

  deleteDevice(id: number | string) {
    return this.http.delete<Device>(this.url + '/' + id);
  }
}