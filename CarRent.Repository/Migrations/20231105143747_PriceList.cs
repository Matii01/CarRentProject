using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class PriceList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "PricesList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricesList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PricesList_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PricelistItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PriceListId = table.Column<int>(type: "int", nullable: false),
                    Days = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PricelistItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PricelistItems_PricesList_PriceListId",
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
                    { "20ba00d4-9db6-4f3e-a986-82073d284ba8", null, "Administrator", "ADMINISTRATOR" },
                    { "c1cedf01-788f-4c93-89f9-2faab2f861fc", null, "Worker", "WORKER" },
                    { "eff12ee8-82f3-4baa-b9ac-ca07c985b4d7", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PricelistItems_PriceListId",
                table: "PricelistItems",
                column: "PriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_PricesList_CarId",
                table: "PricesList",
                column: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PricelistItems");

            migrationBuilder.DropTable(
                name: "PricesList");

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
    }
}
