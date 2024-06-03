using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class GetAllBookModel : PageModel
    {
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public Models.Book[] Books { get; set; }
        public Models.Type[] Types { get; set; }
        public Models.Person[] Persons { get; set; }
        public Models.PublishingHouse[] PublishingHouses { get; set; }
        public async Task OnGet()
        {
            Books = await _client.GetFromJsonAsync<Models.Book[]>("api/Book") ?? [];
            Types = await _client.GetFromJsonAsync<Models.Type[]>("api/Type") ?? [];
            Persons = await _client.GetFromJsonAsync<Models.Person[]>("api/Person") ?? [];
            PublishingHouses = await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse") ?? [];
        }
        public async Task<IActionResult> OnPostDelete(int id)
        {

            HttpResponseMessage response = await _client.DeleteAsync($"api/book/{id}");
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            Books = await _client.GetFromJsonAsync<Models.Book[]>("api/Book") ?? [];
            return RedirectToPage();
        }
    }
}
