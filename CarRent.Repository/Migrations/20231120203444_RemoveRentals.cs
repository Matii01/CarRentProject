using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class RemoveRentals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "77b2efb5-c9c6-43c8-ae23-0ca5a762cdf2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85338a7f-475e-4665-99d9-634348c67e2e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e5d76231-112a-45f7-8f46-7124ade0290e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36be74c2-1619-44f2-8ebf-5230ad5ceafa", null, "Administrator", "ADMINISTRATOR" },
                    { "6a063352-e55e-4030-b2e8-b83f9560f514", null, "User", "USER" },
                    { "b468ec47-74ec-4be4-9869-6f5844c7e4a8", null, "Worker", "WORKER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36be74c2-1619-44f2-8ebf-5230ad5ceafa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a063352-e55e-4030-b2e8-b83f9560f514");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b468ec47-74ec-4be4-9869-6f5844c7e4a8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "77b2efb5-c9c6-43c8-ae23-0ca5a762cdf2", null, "Administrator", "ADMINISTRATOR" },
                    { "85338a7f-475e-4665-99d9-634348c67e2e", null, "User", "USER" },
                    { "e5d76231-112a-45f7-8f46-7124ade0290e", null, "Worker", "WORKER" }
                });
        }
    }
}
