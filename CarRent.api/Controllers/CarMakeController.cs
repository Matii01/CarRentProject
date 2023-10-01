using CarRent.data.Models.CarRent;
using CarRent.data.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CarRent.api.Controllers
{

    // ToDo create service 

    [Route("[controller]")]
    public class CarMakeController : BaseController
    {
        public CarMakeController(CarRentContext context) : base(context)
        {
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetCarMakes()
        {
            var list = await _context.CarMakes.ToListAsync();

            return Ok(list);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetCarMakesById(int id)
        {
            var carMake = await _context.CarMakes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();

            if(carMake is null)
            {
                return NotFound();
            }

            return Ok(carMake);
        }

        [HttpGet(Name = "CarMake")]
        public async Task<IActionResult> GetActiveCarMakes()
        {
            var list = await _context.CarMakes.Where(x => x.IsActive).ToListAsync();

            if (list.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCarMake([FromBody] CarMakeDto carMake)
        {
            CarMake newCarMake = new() { Name = carMake.Name, Description = carMake.Description, IsActive = true};
            
            await _context.CarMakes.AddAsync(newCarMake);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateCarMake), carMake);
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateCarMake(int id, [FromBody] CarMakeDto carMake)
        {
            var toUpdate = await _context.CarMakes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();

            if (toUpdate is null)
            {
                return NotFound();
            }
            
            toUpdate.Name = carMake.Name;
            toUpdate.Description = carMake.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCarMake(int id)
        {
            var toDelete = await _context.CarMakes.Where(x => x.Id.Equals(id)).SingleOrDefaultAsync();
            if (toDelete == null)
            {
                return NotFound();
            }

            toDelete.IsActive=false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
