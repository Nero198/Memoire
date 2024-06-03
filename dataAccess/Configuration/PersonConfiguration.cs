using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dataAccess.Configuration;

public class PersonConfiguration : IEntityTypeConfiguration<Person>
{
    public void Configure(EntityTypeBuilder<Person> builder)
    {
        builder.ToTable("T_person", "dbo");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .IsRequired();
        
        builder.Property(x => x.Lastname)
            .HasColumnName("lastname")
            .HasColumnType("varchar(max)")
            .IsRequired();
        
        builder.Property(x => x.Firstname)
            .HasColumnName("firstname")
            .HasColumnType("varchar(max)")
            .IsRequired();
                
        builder.Property(x => x.DateOfBirth)
            .HasColumnName("date_of_birth")
            .HasColumnType("date")
            .IsRequired();
        
        builder.Property(x => x.IsMan)
            .HasColumnName("is_man")
            .HasColumnType("bit")
            .IsRequired();

        builder.HasMany(x => x.Books)
            .WithOne(x => x.Person)
            .HasForeignKey(x => x.PersonId)
            .IsRequired();
    }
}