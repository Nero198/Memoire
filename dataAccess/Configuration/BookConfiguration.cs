using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dataAccess.Configuration;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("T_book", "dbo");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .IsRequired();
        
        builder.Property(x => x.Title)
            .HasColumnName("title")
            .HasColumnType("varchar(max)")
            .IsRequired();

        builder.Property(x => x.PublishingHouseId)
            .HasColumnName("publishing_house_id")
            .IsRequired();

        builder.Property(x => x.PersonId)
            .HasColumnName("person_id")
            .IsRequired();

        builder.Property(x => x.TypeId)
            .HasColumnName("type_id")
            .IsRequired();

        builder.Property(x => x.ReleaseYear)
            .HasColumnName("release_year")
            .IsRequired();

        builder.HasOne(x=>x.Person)
            .WithMany(x=>x.Books)
            .HasForeignKey(x=>x.PersonId)
            .IsRequired();

        builder.HasOne(x => x.Type)
            .WithMany(x => x.Books)
            .HasForeignKey(x => x.TypeId)
            .IsRequired();

        builder.HasOne(x => x.PublishingHouse)
            .WithMany(x => x.Books)
            .HasForeignKey(x => x.PublishingHouseId)
            .IsRequired();


    }
}