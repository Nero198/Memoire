namespace dataAccess.Entities;

public class Person
{
    public int? Id { get; set; }
    public string Lastname { get; set; }
    public string Firstname { get; set; }
    public DateTime DateOfBirth { get; set; }
    public bool IsMan { get; set; }
}