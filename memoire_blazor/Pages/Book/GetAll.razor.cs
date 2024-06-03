using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Book;

public partial class GetAll : ComponentBase
{
    private dataAccess.Entities.Book[] books = [];
    private dataAccess.Entities.Person[] persons = null;
    private dataAccess.Entities.Type[] types = null;
    private dataAccess.Entities.PublishingHouse[] publishingHouses = null;
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
        books = await _client.GetFromJsonAsync<dataAccess.Entities.Book[]>("api/Book") ?? []; 
        persons = await _client.GetFromJsonAsync<dataAccess.Entities.Person[]>($"api/person") ?? [];
        types = await _client.GetFromJsonAsync<dataAccess.Entities.Type[]>($"api/type") ?? [];
        publishingHouses = await _client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse[]>($"api/publishingHouse") ?? [];
    }

    private void GoTo(int id)
    {
        Navigation.NavigateTo($"/Book/Update/{id}");
    }
    private async Task DeleteBook(int id)
    {
        HttpResponseMessage response = await _client.DeleteAsync($"api/Book/{id}");
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        books = await _client.GetFromJsonAsync<dataAccess.Entities.Book[]>("api/Book") ?? [];
        toastService.ShowSuccess("Book sucessfully deleted");
    }
    private string GetGender(bool isMan)
    {
        return isMan ? "Male" : "Female";
    }
}