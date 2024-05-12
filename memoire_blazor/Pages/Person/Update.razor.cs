using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Person;

public partial class Update : ComponentBase
{
    [Parameter]
    public int Id { get; set; }
    
    [Inject] 
    public IToastService toastService { get; set; }

    private dataAccess.Entities.Person? person = null;
    HttpClient _client = new ()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        person = await _client.GetFromJsonAsync<dataAccess.Entities.Person>($"api/Person/{Id}");
    }

    public async Task UpdatePerson()
    {
        HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Person",person);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("Person sucessfully created");
    }
}