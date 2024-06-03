using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class UpdateModel : PageModel
    {

        [BindProperty]
        public Models.Person Person { get; set; }
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public async Task<IActionResult> OnGet(int id)
        {
            Person = await _client.GetFromJsonAsync<Models.Person>($"api/Person/{id}");
            if (Person == null)
            {
                return RedirectToPage("/Index");
            }
            return Page();
        }

        public async Task<IActionResult> OnPost(int id)
        {
            HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Person", Person);
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            return Page();
        }
    }
}
