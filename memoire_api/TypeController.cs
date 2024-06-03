using dataAccess.Context;
using dataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_memoire;

[Route("api/[controller]")]
[ApiController]
public class TypeController(MemoireContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllType()
    {
        return Ok(await context.Types.ToArrayAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTypeById(int id)
    {
        return Ok(await context.Types.FirstOrDefaultAsync(x=>x.Id == id));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateType([FromBody]dataAccess.Entities.Type p)
    {
        await context.Types.AddAsync(p);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteType(int id)
    {
        dataAccess.Entities.Type? Type = await context.Types.FirstOrDefaultAsync(x => x.Id == id);
        if (Type is not null)
        {
            context.Types.Remove(Type);
            int sucess = await context.SaveChangesAsync();
            if (sucess == 1)
            {
                return Ok();
            }
            return Problem();
        }
        return Problem("No Type has been found with this Id");
    }

    [HttpPut]
    public async Task<IActionResult> UpdateType(dataAccess.Entities.Type Type)
    {
        context.Types.Update(Type);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }
}

