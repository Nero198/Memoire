using dataAccess.Context;
using dataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API_memoire;

[Route("api/[controller]")]
[ApiController]
public class PersonController(MemoireContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllPerson()
    {
        return Ok(await context.Persons.ToArrayAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPersonById(int id)
    {
        return Ok(await context.Persons.FirstOrDefaultAsync(x=>x.Id == id));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreatePerson([FromBody]Person p)
    {
        await context.Persons.AddAsync(p);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeletePerson(int id)
    {
        Person? person = await context.Persons.FirstOrDefaultAsync(x => x.Id == id);
        if (person is not null)
        {
            context.Persons.Remove(person);
            int sucess = await context.SaveChangesAsync();
            if (sucess == 1)
            {
                return Ok();
            }
            return Problem();
        }
        return Problem("No person has been found with this Id");
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePerson(Person person)
    {
        context.Persons.Update(person);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }
}

