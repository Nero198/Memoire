using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class GetAllTypeModel : PageModel
    {
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public Models.Type[] Types { get; set; }
        public async Task OnGet()
        {
            Types = await _client.GetFromJsonAsync<Models.Type[]>("api/type") ?? [];
        }
        public async Task<IActionResult> OnPostDelete(int id)
        {

            HttpResponseMessage response = await _client.DeleteAsync($"api/Type/{id}");
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            Types = await _client.GetFromJsonAsync<Models.Type[]>("api/Type") ?? [];
            return RedirectToPage();
        }
    }
}
