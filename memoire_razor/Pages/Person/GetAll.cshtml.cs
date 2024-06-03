using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class GetAllModel : PageModel
    {
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public Models.Person[] Persons { get; set; }
        public async Task OnGet()
        {
            Persons = await _client.GetFromJsonAsync<Models.Person[]>("api/person") ?? [];
        }
        public async Task<IActionResult> OnPostDelete(int id)
        {

            HttpResponseMessage response = await _client.DeleteAsync($"api/person/{id}");
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            Persons = await _client.GetFromJsonAsync<Models.Person[]>("api/person") ?? [];
            return RedirectToPage();
        }
    }
}
