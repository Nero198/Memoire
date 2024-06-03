using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace memoire_razor.Pages.Person
{
    public class UpdateBookModel : PageModel
    {

        [BindProperty]
        public Models.Book Book { get; set; }
        public List<SelectListItem> PublishingHouses { get; set; }
        public List<SelectListItem> Persons { get; set; }
        public List<SelectListItem> Types { get; set; }
        HttpClient _client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        public async Task<IActionResult> OnGet(int id)
        {
            Book = await _client.GetFromJsonAsync<Models.Book>($"api/Book/{id}");
            PublishingHouses = (await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name.ToString() }).ToList();
            Persons = (await _client.GetFromJsonAsync<Models.Person[]>("api/Person"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Lastname.ToString() }).ToList();
            Types = (await _client.GetFromJsonAsync<Models.Type[]>("api/Type"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Label.ToString() }).ToList();
            if (Book == null)
            {
                return RedirectToPage("/Index");
            }
            return Page();
        }

        public async Task<IActionResult> OnPost(int id)
        {
            HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Book", Book);
            if (!response.IsSuccessStatusCode)
            {
                string errorMessage = await response.Content.ReadAsStringAsync();
            }
            PublishingHouses = (await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name.ToString() }).ToList();
            Persons = (await _client.GetFromJsonAsync<Models.Person[]>("api/Person"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Lastname.ToString() }).ToList();
            Types = (await _client.GetFromJsonAsync<Models.Type[]>("api/Type"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Label.ToString() }).ToList();
            return Page();
        }
    }
}
