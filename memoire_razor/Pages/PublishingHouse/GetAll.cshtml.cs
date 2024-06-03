using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class GetAllPublishingHouseModel : PageModel
    {
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public Models.PublishingHouse[] PublishingHouses { get; set; }
        public async Task OnGet()
        {
            PublishingHouses = await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse") ?? [];
        }
        public async Task<IActionResult> OnPostDelete(int id)
        {

            HttpResponseMessage response = await _client.DeleteAsync($"api/PublishingHouse/{id}");
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            PublishingHouses = await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse") ?? [];
            return RedirectToPage();
        }
    }
}
