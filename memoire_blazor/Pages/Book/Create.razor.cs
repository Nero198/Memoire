using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Book;

public partial class Create : ComponentBase
{
    [Inject] 
    public IToastService toastService { get; set; }
    private dataAccess.Entities.Book book = new();
    private dataAccess.Entities.Person[] persons = null;
    private dataAccess.Entities.Type[] types = null;
    private dataAccess.Entities.PublishingHouse[] publishingHouses = null;
    HttpClient client = new()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        persons = await client.GetFromJsonAsync<dataAccess.Entities.Person[]>($"api/person") ?? [];
        types = await client.GetFromJsonAsync<dataAccess.Entities.Type[]>($"api/type") ?? [];
        publishingHouses = await client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse[]>($"api/publishingHouse") ?? [];
    }
    private async Task PostData()
    {
        
        HttpResponseMessage response = await client.PostAsJsonAsync("api/book", book);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("Book sucessfully created");
        
    }

}