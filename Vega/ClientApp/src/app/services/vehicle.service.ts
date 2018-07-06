import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from '../models/saveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<any>('/api/makes');
  }

  getFeatures() {
    return this.http.get<any>('/api/features');
  }

  create(vehicle) {
    return this.http.post<any>('/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get<any>('/api/vehicles/' + id);
  }

  update(vehicle:SaveVehicle) {
    return this.http.put <any>('/api/vehicles/' + vehicle.id, vehicle);
  }

  delete(id) {
    return this.http.delete<any>('/api/vehicles/' + id);
  }
}
