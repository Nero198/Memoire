using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class UpdateTypeModel : PageModel
    {

        [BindProperty]
        public Models.Type Type { get; set; }
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public async Task<IActionResult> OnGet(int id)
        {
            Type = await _client.GetFromJsonAsync<Models.Type>($"api/Type/{id}");
            if (Type == null)
            {
                return RedirectToPage("/Index");
            }
            return Page();
        }

        public async Task<IActionResult> OnPost(int id)
        {
            HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Type", Type);
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            return Page();
        }
    }
}
