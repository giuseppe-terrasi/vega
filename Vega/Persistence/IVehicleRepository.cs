﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Persistence
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);

        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);

        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}