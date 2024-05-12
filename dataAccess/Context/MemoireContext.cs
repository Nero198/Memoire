using dataAccess.Configuration;
using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace dataAccess.Context;

public class MemoireContext : DbContext
{
    public DbSet<Person> Persons { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MemoireContext).Assembly);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("server=localhost;Database=memoire;integrated security=SSPI;Encrypt=false;");
    }

}