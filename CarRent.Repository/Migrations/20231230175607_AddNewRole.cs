using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddNewRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08b4346b-c4cb-496d-9f97-d0f1267ee55c", null, "CarDetailsEditor", "CARDETAILSEDITOR" },
                    { "36d24478-b65f-4927-a09f-8591f33658d6", null, "CarEditor", "CAREDITOR" },
                    { "47987923-3ce5-480b-b228-4e87e4f1209f", null, "UserViewer", "USERVIEWER" },
                    { "6e8cc9d9-4d1a-4500-902f-95c9f9d2ae59", null, "UserEditor", "USEREDITOR" },
                    { "bbc534c2-08cd-4daf-bbd3-7c74a7ac0e59", null, "PageEditor", "PAGEEDITOR" },
                    { "f5ecd564-dbf6-4f3f-b5c7-1cd8f989ca70", null, "PriceListEditor", "PRICELISTEDITOR" },
                    { "f64f8dc8-3b44-40e6-bcb2-41b8958866b4", null, "CarAdd", "CARADD" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08b4346b-c4cb-496d-9f97-d0f1267ee55c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36d24478-b65f-4927-a09f-8591f33658d6");
         
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47987923-3ce5-480b-b228-4e87e4f1209f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e8cc9d9-4d1a-4500-902f-95c9f9d2ae59");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbc534c2-08cd-4daf-bbd3-7c74a7ac0e59");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5ecd564-dbf6-4f3f-b5c7-1cd8f989ca70");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f64f8dc8-3b44-40e6-bcb2-41b8958866b4");

        }
    }
}
