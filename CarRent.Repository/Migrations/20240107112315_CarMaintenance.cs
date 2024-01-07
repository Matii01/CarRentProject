using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class CarMaintenance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remark",
                table: "Rentals",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "CarMaintenances",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remark",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "CarMaintenances");
        }
    }
}
