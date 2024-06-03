using dataAccess.Context;
using dataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_memoire;

[Route("api/[controller]")]
[ApiController]
public class BookController(MemoireContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllBook()
    {
        return Ok(await context.Books.ToArrayAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookById(int id)
    {
        return Ok(await context.Books.FirstOrDefaultAsync(x=>x.Id == id));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateBook([FromBody]Book p)
    {
        await context.Books.AddAsync(p);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteBookn(int id)
    {
        Book? Book = await context.Books.FirstOrDefaultAsync(x => x.Id == id);
        if (Book is not null)
        {
            context.Books.Remove(Book);
            int sucess = await context.SaveChangesAsync();
            if (sucess == 1)
            {
                return Ok();
            }
            return Problem();
        }
        return Problem("No Book has been found with this Id");
    }

    [HttpPut]
    public async Task<IActionResult> UpdateBook(Book Book)
    {
        context.Books.Update(Book);
        int sucess = await context.SaveChangesAsync();
        if (sucess == 1)
        {
            return Ok();
        }
        return Problem();
    }
}

