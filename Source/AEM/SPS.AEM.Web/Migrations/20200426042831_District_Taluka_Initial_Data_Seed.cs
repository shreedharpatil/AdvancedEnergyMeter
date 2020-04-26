using Microsoft.EntityFrameworkCore.Migrations;

namespace SPS.AEM.Web.Migrations
{
    public partial class District_Taluka_Initial_Data_Seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "District",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Bagalkot" });

            migrationBuilder.InsertData(
                table: "Taluka",
                columns: new[] { "Id", "DistrictId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Bagalkot" },
                    { 2, 1, "Badami" },
                    { 3, 1, "Mudhol" },
                    { 4, 1, "Jamakhandi" },
                    { 5, 1, "Hunagunda" },
                    { 6, 1, "Bilgi" },
                    { 7, 1, "Guledgudda" },
                    { 8, 1, "RabakaviBanahatti" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Taluka",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "District",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
