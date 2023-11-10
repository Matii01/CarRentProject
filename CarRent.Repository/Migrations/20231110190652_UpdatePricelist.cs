using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePricelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0a9ddf01-e35c-4baa-aef9-3820638e252a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91c1fa57-396e-4c28-8b2e-899be6d20e91");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "db7747da-0beb-40a9-a207-a9853ad8d5c6");

            migrationBuilder.DropColumn(
                name: "DateFrom",
                table: "PricesList");

            migrationBuilder.DropColumn(
                name: "DateTo",
                table: "PricesList");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PricesList",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "015019d4-2d2f-425b-af43-cd6d50de155b", null, "User", "USER" },
                    { "7195a07f-cd31-4971-a6bb-4ea46bc91ccf", null, "Administrator", "ADMINISTRATOR" },
                    { "dada1792-3bda-482c-90f4-f725e63d91ab", null, "Worker", "WORKER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "015019d4-2d2f-425b-af43-cd6d50de155b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7195a07f-cd31-4971-a6bb-4ea46bc91ccf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dada1792-3bda-482c-90f4-f725e63d91ab");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PricesList");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateFrom",
                table: "PricesList",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTo",
                table: "PricesList",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0a9ddf01-e35c-4baa-aef9-3820638e252a", null, "Administrator", "ADMINISTRATOR" },
                    { "91c1fa57-396e-4c28-8b2e-899be6d20e91", null, "Worker", "WORKER" },
                    { "db7747da-0beb-40a9-a207-a9853ad8d5c6", null, "User", "USER" }
                });
        }
    }
}
