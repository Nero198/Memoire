using dataAccess.Context;
using dataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_memoire;

[Route("api/[controller]")]
[ApiController]
public class PublishingHouseController(MemoireContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllPublishingHouse()
    {
        return Ok(await context.PublishingHouses.ToArrayAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPublishingHouseById(int id)
    {
        return Ok(await context.PublishingHouses.FirstOrDefaultAsync(x=>x.Id == id));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreatePublishingHouse([FromBody]PublishingHouse p)
    {
        await context.PublishingHouses.AddAsync(p);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeletePublishingHouse(int id)
    {
        PublishingHouse? PublishingHouse = await context.PublishingHouses.FirstOrDefaultAsync(x => x.Id == id);
        if (PublishingHouse is not null)
        {
            context.PublishingHouses.Remove(PublishingHouse);
            int sucess = await context.SaveChangesAsync();
            if (sucess == 1)
            {
                return Ok();
            }
            return Problem();
        }
        return Problem("No PublishingHouse has been found with this Id");
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePublishingHouse(PublishingHouse PublishingHouse)
    {
        context.PublishingHouses.Update(PublishingHouse);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }
}

