﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SPS.AEM.Database.Contexts;

namespace SPS.AEM.Web.Migrations
{
    [DbContext(typeof(AemDatabaseContext))]
    partial class AemDatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SPS.AEM.Database.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LoadTypeId")
                        .HasColumnType("int");

                    b.Property<string>("MobileNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RRNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TransformerId")
                        .HasColumnType("int");

                    b.Property<int>("VillageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoadTypeId");

                    b.HasIndex("TransformerId");

                    b.HasIndex("VillageId");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.District", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("District");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Bagalkot"
                        });
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Feeder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SectionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("Feeder");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.LoadType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LoadType");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Login", b =>
                {
                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("UserId");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Section", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StationId");

                    b.ToTable("Section");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Station", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DistrictId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TalukaId")
                        .HasColumnType("int");

                    b.Property<int>("VillageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DistrictId");

                    b.HasIndex("TalukaId");

                    b.HasIndex("VillageId");

                    b.ToTable("Station");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Taluka", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DistrictId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DistrictId");

                    b.ToTable("Taluka");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DistrictId = 1,
                            Name = "Bagalkot"
                        },
                        new
                        {
                            Id = 2,
                            DistrictId = 1,
                            Name = "Badami"
                        },
                        new
                        {
                            Id = 3,
                            DistrictId = 1,
                            Name = "Mudhol"
                        },
                        new
                        {
                            Id = 4,
                            DistrictId = 1,
                            Name = "Jamakhandi"
                        },
                        new
                        {
                            Id = 5,
                            DistrictId = 1,
                            Name = "Hunagunda"
                        },
                        new
                        {
                            Id = 6,
                            DistrictId = 1,
                            Name = "Bilgi"
                        },
                        new
                        {
                            Id = 7,
                            DistrictId = 1,
                            Name = "Guledgudda"
                        },
                        new
                        {
                            Id = 8,
                            DistrictId = 1,
                            Name = "RabakaviBanahatti"
                        });
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Transformer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FeederId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FeederId");

                    b.ToTable("Transformer");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Village", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TalukaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TalukaId");

                    b.ToTable("Village");
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Customer", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.LoadType", "LoadType")
                        .WithMany("Customers")
                        .HasForeignKey("LoadTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SPS.AEM.Database.Entities.Transformer", "Transformer")
                        .WithMany()
                        .HasForeignKey("TransformerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SPS.AEM.Database.Entities.Village", "Village")
                        .WithMany()
                        .HasForeignKey("VillageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Feeder", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.Section", "Section")
                        .WithMany("Feeders")
                        .HasForeignKey("SectionId")
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Login", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Section", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.Station", "Station")
                        .WithMany("Sections")
                        .HasForeignKey("StationId")
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Station", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.District", "District")
                        .WithMany("Stations")
                        .HasForeignKey("DistrictId")
                        .IsRequired();

                    b.HasOne("SPS.AEM.Database.Entities.Taluka", "Taluka")
                        .WithMany("Stations")
                        .HasForeignKey("TalukaId")
                        .IsRequired();

                    b.HasOne("SPS.AEM.Database.Entities.Village", "Village")
                        .WithMany("Stations")
                        .HasForeignKey("VillageId")
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Taluka", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.District", "District")
                        .WithMany("Talukas")
                        .HasForeignKey("DistrictId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Transformer", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.Feeder", "Feeder")
                        .WithMany("Transformers")
                        .HasForeignKey("FeederId")
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.User", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SPS.AEM.Database.Entities.Village", b =>
                {
                    b.HasOne("SPS.AEM.Database.Entities.Taluka", "Taluka")
                        .WithMany("Villages")
                        .HasForeignKey("TalukaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
