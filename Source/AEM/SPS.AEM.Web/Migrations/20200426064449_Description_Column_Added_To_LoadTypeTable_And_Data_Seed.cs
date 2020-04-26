using Microsoft.EntityFrameworkCore.Migrations;

namespace SPS.AEM.Web.Migrations
{
    public partial class Description_Column_Added_To_LoadTypeTable_And_Data_Seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "LoadType",
                nullable: true);

            migrationBuilder.InsertData(
                table: "LoadType",
                columns: new[] { "Id", "Description", "Type" },
                values: new object[,]
                {
                    { 1, "Load test 1", "LT1" },
                    { 2, "Load test 2", "LT2" },
                    { 3, "Load test 3", "LT3" },
                    { 4, "Load test 4", "LT4" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LoadType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LoadType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "LoadType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "LoadType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "Description",
                table: "LoadType");
        }
    }
}
