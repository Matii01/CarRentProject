using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddCarMaintenances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "CarMaintenances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarMaintenances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarMaintenances_AspNetUsers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CarMaintenances_Cars_CarId",
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
                    { "471aa901-8ef2-4cc9-bdad-d758a390146c", null, "Administrator", "ADMINISTRATOR" },
                    { "9aabe32f-5ffe-4b86-92c8-f28a37cb97df", null, "User", "USER" },
                    { "c206774c-c3a1-4e1f-a743-e09f7c06a69d", null, "Worker", "WORKER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenances_CarId",
                table: "CarMaintenances",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenances_WorkerId",
                table: "CarMaintenances",
                column: "WorkerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarMaintenances");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "471aa901-8ef2-4cc9-bdad-d758a390146c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aabe32f-5ffe-4b86-92c8-f28a37cb97df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c206774c-c3a1-4e1f-a743-e09f7c06a69d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "534708b7-f776-4b6a-bf55-e902dfa39339", null, "Administrator", "ADMINISTRATOR" },
                    { "acc5b68d-d48e-4d0e-88ff-23214a85f614", null, "Worker", "WORKER" },
                    { "c6363f62-5f58-4026-b3ec-1ecb91609f59", null, "User", "USER" }
                });
        }
    }
}
