using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4f883ad9-17c1-4c17-8030-915afbc46c3d", null, "Administrator", "ADMINISTRATOR" },
                    { "b6ca5465-eebe-4bf5-b12f-6ab58764607f", null, "Worker", "WORKER" },
                    { "ce99d36c-4529-47df-8f41-3bba6d634557", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f883ad9-17c1-4c17-8030-915afbc46c3d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6ca5465-eebe-4bf5-b12f-6ab58764607f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce99d36c-4529-47df-8f41-3bba6d634557");
        }
    }
}
