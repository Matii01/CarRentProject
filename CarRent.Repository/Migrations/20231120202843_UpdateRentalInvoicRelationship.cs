using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRentalInvoicRelationship : Migration
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
                keyValue: "77b2efb5-c9c6-43c8-ae23-0ca5a762cdf2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85338a7f-475e-4665-99d9-634348c67e2e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e5d76231-112a-45f7-8f46-7124ade0290e");

            migrationBuilder.RenameTable(
                name: "Rental",
                newName: "Rentals");

            migrationBuilder.RenameIndex(
                name: "IX_Rental_CarId",
                table: "Rentals",
                newName: "IX_Rentals_CarId");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceItemId",
                table: "Rentals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rentals",
                table: "Rentals",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "InvoiceItems",
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
                    table.PrimaryKey("PK_InvoiceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoiceItems_Invoices_InvoiceId",
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
                    { "07d04ae1-aa35-4bbb-8589-8a375eb7b840", null, "Worker", "WORKER" },
                    { "0bbe1a6a-4c0c-4162-84db-8ee42ad4ddfb", null, "User", "USER" },
                    { "7945fcfd-d1d1-46d2-844b-2c9dfb8c9bcd", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_InvoiceItemId",
                table: "Rentals",
                column: "InvoiceItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_InvoiceId",
                table: "InvoiceItems",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Cars_CarId",
                table: "Rentals",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_InvoiceItems_InvoiceItemId",
                table: "Rentals",
                column: "InvoiceItemId",
                principalTable: "InvoiceItems",
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
                name: "FK_Rentals_InvoiceItems_InvoiceItemId",
                table: "Rentals");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRentals_Rentals_RentalId",
                table: "UserRentals");

            migrationBuilder.DropTable(
                name: "InvoiceItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rentals",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_InvoiceItemId",
                table: "Rentals");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07d04ae1-aa35-4bbb-8589-8a375eb7b840");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0bbe1a6a-4c0c-4162-84db-8ee42ad4ddfb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7945fcfd-d1d1-46d2-844b-2c9dfb8c9bcd");

            migrationBuilder.DropColumn(
                name: "InvoiceItemId",
                table: "Rentals");

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
                    { "77b2efb5-c9c6-43c8-ae23-0ca5a762cdf2", null, "Administrator", "ADMINISTRATOR" },
                    { "85338a7f-475e-4665-99d9-634348c67e2e", null, "User", "USER" },
                    { "e5d76231-112a-45f7-8f46-7124ade0290e", null, "Worker", "WORKER" }
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
