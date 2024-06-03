using dataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dataAccess.Configuration;

public class TypeConfiguration : IEntityTypeConfiguration<Entities.Type>
{
    public void Configure(EntityTypeBuilder<Entities.Type> builder)
    {
        builder.ToTable("TR_type", "dbo");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .IsRequired();
        
        builder.Property(x => x.Label)
            .HasColumnName("label")
            .HasColumnType("varchar(max)")
            .IsRequired();

        builder.HasMany(x => x.Books)
            .WithOne(x => x.Type)
            .HasForeignKey(x => x.TypeId)
            .IsRequired();
    }
}