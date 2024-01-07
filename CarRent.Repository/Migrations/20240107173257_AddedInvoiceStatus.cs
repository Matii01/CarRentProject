using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddedInvoiceStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PaidAmount",
                table: "InvoicesItems",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "InvoiceStatus",
                table: "Invoices",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaidAmount",
                table: "InvoicesItems");

            migrationBuilder.DropColumn(
                name: "InvoiceStatus",
                table: "Invoices");
        }
    }
}
