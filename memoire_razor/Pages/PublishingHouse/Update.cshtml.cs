using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace memoire_razor.Pages.Person
{
    public class UpdatePublishingHouseModel : PageModel
    {

        [BindProperty]
        public Models.PublishingHouse PublishingHouse { get; set; }
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public async Task<IActionResult> OnGet(int id)
        {
            PublishingHouse = await _client.GetFromJsonAsync<Models.PublishingHouse>($"api/PublishingHouse/{id}");
            if (PublishingHouse == null)
            {
                return RedirectToPage("/Index");
            }
            return Page();
        }

        public async Task<IActionResult> OnPost(int id)
        {
            HttpResponseMessage response = await _client.PutAsJsonAsync($"api/PublishingHouse", PublishingHouse);
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            return Page();
        }
    }
}
