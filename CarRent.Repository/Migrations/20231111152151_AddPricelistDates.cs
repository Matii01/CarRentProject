using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddPricelistDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "PricelistDates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriceListId = table.Column<int>(type: "int", nullable: false),
                    DateFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricelistDates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PricelistDates_PricesList_PriceListId",
                        column: x => x.PriceListId,
                        principalTable: "PricesList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0fc7ee42-fc39-40ec-adff-1d1855e0f529", null, "User", "USER" },
                    { "79fb2c6e-4e32-496e-885e-204aff248dcf", null, "Worker", "WORKER" },
                    { "f0b764d5-ce51-4b74-8fa9-33798a8f587b", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PricelistDates_PriceListId",
                table: "PricelistDates",
                column: "PriceListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PricelistDates");

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
    }
}
