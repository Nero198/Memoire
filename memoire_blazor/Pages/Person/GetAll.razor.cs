using System.Net.Http.Json;
using Blazored.Toast.Services;
using Microsoft.AspNetCore.Components;

namespace memoire_blazor.Pages.Person;

public partial class GetAll : ComponentBase
{
    private dataAccess.Entities.Person[] persons = [];
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
        persons = await _client.GetFromJsonAsync<dataAccess.Entities.Person[]>("api/person") ?? [];
    }

    private void GoTo(int id)
    {
        Navigation.NavigateTo($"/Update/{id}");
    }
    private async Task DeletePerson(int id)
    {
        HttpResponseMessage response = await _client.DeleteAsync($"api/person/{id}");
        if (!response.IsSuccessStatusCode)
        {
            string errorMessage = await response.Content.ReadAsStringAsync();
            toastService.ShowError(errorMessage);
        }
        persons = await _client.GetFromJsonAsync<dataAccess.Entities.Person[]>("api/person") ?? [];
        toastService.ShowSuccess("Person sucessfully deleted");
    }
    private string GetGender(bool isMan)
    {
        return isMan ? "Male" : "Female";
    }
}