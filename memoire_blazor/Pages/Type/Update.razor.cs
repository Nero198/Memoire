using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Type;

public partial class Update : ComponentBase
{
    [Parameter]
    public int Id { get; set; }
    
    [Inject] 
    public IToastService toastService { get; set; }

    private dataAccess.Entities.Type? type = null;
    HttpClient _client = new ()
    {
        BaseAddress = new Uri("https://localhost:7009")
    };
    protected override async Task OnInitializedAsync()
    {
        type = await _client.GetFromJsonAsync<dataAccess.Entities.Type>($"api/Type/{Id}");
    }

    public async Task UpdateType()
    {
        HttpResponseMessage response = await _client.PutAsJsonAsync($"api/Type", type);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("Type sucessfully updated");
    }
}