using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dataAccess.Configuration;

public class PublishingHouseConfiguration : IEntityTypeConfiguration<PublishingHouse>
{
    public void Configure(EntityTypeBuilder<PublishingHouse> builder)
    {
        builder.ToTable("T_publishing_house", "dbo");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .IsRequired();
        
        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasColumnType("varchar(max)")
            .IsRequired();

        builder.Property(x => x.StartYear)
            .HasColumnName("start_year")
            .IsRequired();

        builder.HasMany(x => x.Books)
            .WithOne(x => x.PublishingHouse)
            .HasForeignKey(x => x.PublishingHouseId)
            .IsRequired();
    }
}