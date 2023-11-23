using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddRabats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0edf4df3-d754-4d88-8db9-968ec17d7c6e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67e2c7b7-4779-46bc-bf31-0c8a3f20fec8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa336f36-bcf1-4a5c-8ade-b0c5a41eb9f1");

            migrationBuilder.CreateTable(
                name: "RabatForUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserAccountId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RabatPercentValue = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DateOfExpiration = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsUsed = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RabatForUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rabats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RabatPercentValue = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    DateFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rabats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rabats_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "534708b7-f776-4b6a-bf55-e902dfa39339", null, "Administrator", "ADMINISTRATOR" },
                    { "acc5b68d-d48e-4d0e-88ff-23214a85f614", null, "Worker", "WORKER" },
                    { "c6363f62-5f58-4026-b3ec-1ecb91609f59", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rabats_CarId",
                table: "Rabats",
                column: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RabatForUsers");

            migrationBuilder.DropTable(
                name: "Rabats");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "534708b7-f776-4b6a-bf55-e902dfa39339");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "acc5b68d-d48e-4d0e-88ff-23214a85f614");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c6363f62-5f58-4026-b3ec-1ecb91609f59");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0edf4df3-d754-4d88-8db9-968ec17d7c6e", null, "Administrator", "ADMINISTRATOR" },
                    { "67e2c7b7-4779-46bc-bf31-0c8a3f20fec8", null, "User", "USER" },
                    { "aa336f36-bcf1-4a5c-8ade-b0c5a41eb9f1", null, "Worker", "WORKER" }
                });
        }
    }
}
