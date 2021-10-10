using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SPS.AEM.Web.Migrations
{
    public partial class Create_Table_Device : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Device",
                columns: table => new
                {
                    RRNo = table.Column<string>(maxLength: 100, nullable: false),
                    DeviceId = table.Column<string>(maxLength: 1000, nullable: false),
                    HubName = table.Column<string>(maxLength: 1000, nullable: false),
                    RegisteredDateTime = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Device", x => x.RRNo);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Device");
        }
    }
}
