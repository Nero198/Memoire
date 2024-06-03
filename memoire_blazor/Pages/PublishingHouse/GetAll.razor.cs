using System.Net.Http.Json;
using Blazored.Toast.Services;
using dataAccess.Entities;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.PublishingHouse;

public partial class GetAll : ComponentBase
{
    private dataAccess.Entities.PublishingHouse[] PublishingHouses = [];
    [Inject]
    public NavigationManager Navigation {get; set;}
    
    [Inject] 
    public IToastService toastService { get; set; }
    HttpClient _client = new()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        PublishingHouses = await _client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse[]>("api/publishingHouse") ?? [];
    }

    private void GoTo(int id)
    {
        Navigation.NavigateTo($"/publishingHouse/Update/{id}");
    }
    private async Task DeletePerson(int id)
    {
        HttpResponseMessage response = await _client.DeleteAsync($"api/PublishingHouse/{id}");
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        PublishingHouses = await _client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse[]>("api/publishingHouse") ?? [];
        toastService.ShowSuccess("Publishing House sucessfully deleted");
    }
}