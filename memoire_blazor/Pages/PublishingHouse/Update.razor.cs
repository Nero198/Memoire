using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.PublishingHouse;

public partial class Update : ComponentBase
{
    [Parameter]
    public int Id { get; set; }
    
    [Inject] 
    public IToastService toastService { get; set; }

    private dataAccess.Entities.PublishingHouse? publishingHouse = null;
    HttpClient _client = new ()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        publishingHouse = await _client.GetFromJsonAsync<dataAccess.Entities.PublishingHouse>($"api/publishingHouse/{Id}");
    }

    public async Task UpdatePublishingHouse()
    {
        HttpResponseMessage response = await _client.PutAsJsonAsync($"api/PublishingHouse", publishingHouse);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("PublishingHouse sucessfully updated");
    }
}