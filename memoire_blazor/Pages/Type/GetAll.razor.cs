using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Type;

public partial class GetAll : ComponentBase
{
    private dataAccess.Entities.Type[] types = [];
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
        types = await _client.GetFromJsonAsync<dataAccess.Entities.Type[]>("api/type") ?? [];
    }

    private void GoTo(int id)
    {
        Navigation.NavigateTo($"/Type/Update/{id}");
    }
    private async Task DeleteType(int id)
    {
        HttpResponseMessage response = await _client.DeleteAsync($"api/type/{id}");
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        types = await _client.GetFromJsonAsync<dataAccess.Entities.Type[]>("api/type") ?? [];
        toastService.ShowSuccess("Type sucessfully deleted");
    }
}