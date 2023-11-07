using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddDataTimeForPricelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20ba00d4-9db6-4f3e-a986-82073d284ba8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c1cedf01-788f-4c93-89f9-2faab2f861fc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eff12ee8-82f3-4baa-b9ac-ca07c985b4d7");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "20ba00d4-9db6-4f3e-a986-82073d284ba8", null, "Administrator", "ADMINISTRATOR" },
                    { "c1cedf01-788f-4c93-89f9-2faab2f861fc", null, "Worker", "WORKER" },
                    { "eff12ee8-82f3-4baa-b9ac-ca07c985b4d7", null, "User", "USER" }
                });
        }
    }
}
