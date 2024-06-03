using dataAccess.Configuration;
using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace dataAccess.Context;

public class MemoireContext : DbContext
{
    public DbSet<Person> Persons { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<PublishingHouse> PublishingHouses { get; set; }
    public DbSet<Entities.Type> Types { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MemoireContext).Assembly);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost\\MSSQLSERVER08;Database=memoire;Trusted_Connection=True;TrustServerCertificate=True");
    }

}