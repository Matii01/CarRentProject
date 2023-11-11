using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePricelistItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0fc7ee42-fc39-40ec-adff-1d1855e0f529");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79fb2c6e-4e32-496e-885e-204aff248dcf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0b764d5-ce51-4b74-8fa9-33798a8f587b");

            migrationBuilder.AddColumn<decimal>(
                name: "OverlimitFee",
                table: "PricelistItems",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3ea690c3-0dc0-4afa-a39d-6ea89b9291b6", null, "Worker", "WORKER" },
                    { "c795cf5f-5599-4532-b29e-f202012aa1e1", null, "Administrator", "ADMINISTRATOR" },
                    { "c8d896d3-b3f0-4b68-899c-658ead4067af", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3ea690c3-0dc0-4afa-a39d-6ea89b9291b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c795cf5f-5599-4532-b29e-f202012aa1e1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8d896d3-b3f0-4b68-899c-658ead4067af");

            migrationBuilder.DropColumn(
                name: "OverlimitFee",
                table: "PricelistItems");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0fc7ee42-fc39-40ec-adff-1d1855e0f529", null, "User", "USER" },
                    { "79fb2c6e-4e32-496e-885e-204aff248dcf", null, "Worker", "WORKER" },
                    { "f0b764d5-ce51-4b74-8fa9-33798a8f587b", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
