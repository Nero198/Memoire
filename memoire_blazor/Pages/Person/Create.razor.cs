using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Person;

public partial class Create : ComponentBase
{
    [Inject] 
    public IToastService toastService { get; set; }
    private dataAccess.Entities.Person person = new();
    private async Task PostData()
    {
        HttpClient client = new()
        {
            BaseAddress = new Uri("https://localhost:7009")
        };
        HttpResponseMessage response = await client.PostAsJsonAsync("api/person", person);
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        toastService.ShowSuccess("Person sucessfully created");
        
    }

}