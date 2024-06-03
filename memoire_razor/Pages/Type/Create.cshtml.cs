using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class CreateTypeModel : PageModel
    {
        [BindProperty]
        public Models.Type Type { get; set; }
        public void OnGet()
        {
            TempData["response"] = null;
            TempData["isSucess"] = null;
        }

        public async Task<IActionResult> OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            HttpClient client = new()
            {
                BaseAddress = new Uri("https://localhost:7009")
            };
            HttpResponseMessage response = await client.PostAsJsonAsync("api/type", Type);
            if (!response.IsSuccessStatusCode)
            {
                TempData["isSucess"] = false;
                TempData["response"] = await response.Content.ReadAsStringAsync();
            }
            else
            {
                TempData["isSucess"] = true;
                TempData["response"] = "Type created with sucess";
            }
            return Page();
        }
    }
}
