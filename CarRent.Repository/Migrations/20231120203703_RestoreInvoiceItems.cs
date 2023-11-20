using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class RestoreInvoiceItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rental_Cars_CarId",
                table: "Rental");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRentals_Rental_RentalId",
                table: "UserRentals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rental",
                table: "Rental");

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

            migrationBuilder.RenameTable(
                name: "Rental",
                newName: "Rentals");

            migrationBuilder.RenameIndex(
                name: "IX_Rental_CarId",
                table: "Rentals",
                newName: "IX_Rentals_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rentals",
                table: "Rentals",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "InvoicesItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceId = table.Column<int>(type: "int", nullable: false),
                    Rabat = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Net = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Gross = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    VAT = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    VATValue = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoicesItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoicesItems_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f22d9f3-a26c-4efb-99d0-a59e054a3513", null, "Administrator", "ADMINISTRATOR" },
                    { "5292d8dc-b8e9-40e0-a218-8487b7bdeed2", null, "Worker", "WORKER" },
                    { "f7dac01e-edfc-4b8b-87af-1043ff2cc235", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvoicesItems_InvoiceId",
                table: "InvoicesItems",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Cars_CarId",
                table: "Rentals",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRentals_Rentals_RentalId",
                table: "UserRentals",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Cars_CarId",
                table: "Rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRentals_Rentals_RentalId",
                table: "UserRentals");

            migrationBuilder.DropTable(
                name: "InvoicesItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rentals",
                table: "Rentals");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f22d9f3-a26c-4efb-99d0-a59e054a3513");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5292d8dc-b8e9-40e0-a218-8487b7bdeed2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7dac01e-edfc-4b8b-87af-1043ff2cc235");

            migrationBuilder.RenameTable(
                name: "Rentals",
                newName: "Rental");

            migrationBuilder.RenameIndex(
                name: "IX_Rentals_CarId",
                table: "Rental",
                newName: "IX_Rental_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rental",
                table: "Rental",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36be74c2-1619-44f2-8ebf-5230ad5ceafa", null, "Administrator", "ADMINISTRATOR" },
                    { "6a063352-e55e-4030-b2e8-b83f9560f514", null, "User", "USER" },
                    { "b468ec47-74ec-4be4-9869-6f5844c7e4a8", null, "Worker", "WORKER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Rental_Cars_CarId",
                table: "Rental",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRentals_Rental_RentalId",
                table: "UserRentals",
                column: "RentalId",
                principalTable: "Rental",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
