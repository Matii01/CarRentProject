using CarRent.data.DTO;
using CarRent.data.Models.CarRent;
using CarRent.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRent.api.Controllers
{
    [Route("[controller]")]
    public class CarTypeController : BaseController
    {
        public CarTypeController(CarRentContext context) : base(context)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetCarTypes()
        {
            var carTypes = await _context.CarsTypes.ToListAsync();

            return Ok(carTypes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCarTypes([FromBody] CarTypeDto carType)
        {
            CarType newType = new() { Name = carType.Name, IsActive = true };

            await _context.CarsTypes.AddAsync(newType);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCarTypes(int id, [FromBody] CarTypeDto carType)
        {
            var toUpdate = await _context.CarsTypes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();

            if (toUpdate is null)
            {
                return NotFound();
            }

            toUpdate.Name = carType.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCarTypes(int id)
        {
            var toDelete = await _context.CarsTypes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();

            if (toDelete is null)
            {
                return NotFound();
            }

            toDelete.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
