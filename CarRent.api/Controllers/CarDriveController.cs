﻿using CarRent.data.DTO;
using CarRent.Repository;
using CarRent.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.api.Controllers
{
    public class CarDriveController : BaseController
    {
        public CarDriveController(IServiceManager service)
            : base(service)
        {

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetCarDrives()
        {
            var list = await _services.CarDriveService.GetAllAsync(false);
            return Ok(list);
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveCarDrives()
        {
            var list = await _services.CarDriveService.GetAllActiveAsync(false);
            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetCarDriveById(int id)
        {
            var carDrive = await _services.CarDriveService.GetAsync(id, false); 
            return Ok(carDrive);
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateCarDrive([FromBody] CarDriveDto carDrive)
        {
            var createdCarDrive = await _services.CarDriveService.CreateAsync(carDrive);
            return CreatedAtAction(nameof(CreateCarDrive), createdCarDrive);
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarDrive(int id, [FromBody] CarDriveDto carDrive)
        {
            await _services.CarDriveService.UpdateAsync(id, carDrive, trackChanges: true);

            return NoContent();
        }

        [Authorize(Roles = "Administrator,CarDetailsEditor")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCarDrive(int id)
        {
            await _services.CarDriveService.DeleteAsync(id);
            return NoContent();
        }
    }
}
