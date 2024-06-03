using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Book;

public partial class Update : ComponentBase
{
    [Parameter]
    public int Id { get; set; }
    
    [Inject] 
    public IToastService toastService { get; set; }
    [Inject]
    public NavigationManager Navigation { get; set; }

    private dataAccess.Entities.Book? book = null;
    private dataAccess.Entities.Person[] persons = null;
    private dataAccess.Entities.Type[] types = null;
    private dataAccess.Entities.PublishingHouse[] publishingHouses = null;
    HttpClient _client = new ()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        book = await _client.GetFromJsonAsync<dataAccess.Entities.Book>($"api/Book/{Id}");
        persons = await _client.GetFromJsonAsync<dataAccess.Entities.Person[]>($"api/person") ?? [];
        types = await _client.GetFromJsonAsync<dataAccess.Entities.Type[]>($"api/type") ?? [];
        publishingHouses = await _client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse[]>($"api/publishingHouse") ?? [];
    }

    public async Task UpdateBook()
    {
        HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Book",book);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("Book sucessfully updated");
        Navigation.NavigateTo($"/Book/GetAll");
    }
}