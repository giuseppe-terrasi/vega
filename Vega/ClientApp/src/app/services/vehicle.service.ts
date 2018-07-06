import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from '../models/saveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint: string = '/api/vehicles';

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<any>('/api/makes');
  }

  getFeatures() {
    return this.http.get<any>('/api/features');
  }

  create(vehicle) {
    return this.http.post<any>(this.vehiclesEndpoint, vehicle);
  }

  getVehicle(id) {
    return this.http.get<any>(this.vehiclesEndpoint + '/' + id);
  }

  update(vehicle:SaveVehicle) {
    return this.http.put<any>(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  delete(id) {
    return this.http.delete<any>(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter) {
    return this.http.get<any>(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
