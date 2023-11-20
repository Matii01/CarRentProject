using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class RentalInvoiceItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "RentalId",
                table: "InvoicesItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0edf4df3-d754-4d88-8db9-968ec17d7c6e", null, "Administrator", "ADMINISTRATOR" },
                    { "67e2c7b7-4779-46bc-bf31-0c8a3f20fec8", null, "User", "USER" },
                    { "aa336f36-bcf1-4a5c-8ade-b0c5a41eb9f1", null, "Worker", "WORKER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvoicesItems_RentalId",
                table: "InvoicesItems",
                column: "RentalId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoicesItems_Rentals_RentalId",
                table: "InvoicesItems",
                column: "RentalId",
                principalTable: "Rentals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoicesItems_Rentals_RentalId",
                table: "InvoicesItems");

            migrationBuilder.DropIndex(
                name: "IX_InvoicesItems_RentalId",
                table: "InvoicesItems");

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

            migrationBuilder.DropColumn(
                name: "RentalId",
                table: "InvoicesItems");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f22d9f3-a26c-4efb-99d0-a59e054a3513", null, "Administrator", "ADMINISTRATOR" },
                    { "5292d8dc-b8e9-40e0-a218-8487b7bdeed2", null, "Worker", "WORKER" },
                    { "f7dac01e-edfc-4b8b-87af-1043ff2cc235", null, "User", "USER" }
                });
        }
    }
}
