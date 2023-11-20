using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateInvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Rentals_RentalId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_RentalId",
                table: "Invoices");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1afbee00-6701-4c15-b25c-f3132a8815a9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d63934dd-0cef-42c3-a93e-eefc6a5f4864");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8239aa7-42c5-46a8-b6a1-10ea8d2dbf2c");

            migrationBuilder.DropColumn(
                name: "Gross",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Net",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "RentalId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "VAT",
                table: "Invoices");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "16289721-d55f-416b-973a-7c729e31f23a", null, "User", "USER" },
                    { "864d7dae-0eb7-4685-bb4e-84a6ecc20d75", null, "Worker", "WORKER" },
                    { "ecbcad93-dc61-4e00-ac74-3f19b7dbc237", null, "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "16289721-d55f-416b-973a-7c729e31f23a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "864d7dae-0eb7-4685-bb4e-84a6ecc20d75");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ecbcad93-dc61-4e00-ac74-3f19b7dbc237");

            migrationBuilder.AddColumn<decimal>(
                name: "Gross",
                table: "Invoices",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Net",
                table: "Invoices",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "RentalId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "VAT",
                table: "Invoices",
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
                    { "1afbee00-6701-4c15-b25c-f3132a8815a9", null, "Worker", "WORKER" },
                    { "d63934dd-0cef-42c3-a93e-eefc6a5f4864", null, "User", "USER" },
                    { "f8239aa7-42c5-46a8-b6a1-10ea8d2dbf2c", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_RentalId",
                table: "Invoices",
                column: "RentalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Rentals_RentalId",
                table: "Invoices",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
