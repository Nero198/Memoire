using memoire_razor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace memoire_razor.Pages.Person
{
    public class CreateBookModel : PageModel
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
        public async Task OnGet()
        {
            TempData["response"] = null;
            TempData["isSucess"] = null;
            PublishingHouses = (await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse"))?.Select(x=> new SelectListItem { Value= x.Id.ToString(), Text=x.Name.ToString() }).ToList();
            Persons = (await _client.GetFromJsonAsync<Models.Person[]>("api/Person"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Lastname.ToString() }).ToList();
            Types = (await _client.GetFromJsonAsync<Models.Type[]>("api/Type"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Label.ToString() }).ToList();
        }

        public async Task<IActionResult> OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            HttpResponseMessage response = await _client.PostAsJsonAsync("api/Book", Book);
            if (!response.IsSuccessStatusCode)
            {
                TempData["isSucess"] = false;
                TempData["response"] = await response.Content.ReadAsStringAsync();
            }
            else
            {
                TempData["isSucess"] = true;
                TempData["response"] = "Book created with sucess";
            }
            PublishingHouses = (await _client.GetFromJsonAsync<Models.PublishingHouse[]>("api/PublishingHouse"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Name.ToString() }).ToList();
            Persons = (await _client.GetFromJsonAsync<Models.Person[]>("api/Person"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Lastname.ToString() }).ToList();
            Types = (await _client.GetFromJsonAsync<Models.Type[]>("api/Type"))?.Select(x => new SelectListItem { Value = x.Id.ToString(), Text = x.Label.ToString() }).ToList();
            return Page();
        }
    }
}
