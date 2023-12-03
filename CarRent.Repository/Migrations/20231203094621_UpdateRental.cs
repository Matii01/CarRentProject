using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRental : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RentalStatusId",
                table: "Rentals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_RentalStatusId",
                table: "Rentals",
                column: "RentalStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_RentalStatuses_RentalStatusId",
                table: "Rentals",
                column: "RentalStatusId",
                principalTable: "RentalStatuses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_RentalStatuses_RentalStatusId",
                table: "Rentals");

            migrationBuilder.DropIndex(
                name: "IX_Rentals_RentalStatusId",
                table: "Rentals");

            migrationBuilder.DropColumn(
                name: "RentalStatusId",
                table: "Rentals");
        }
    }
}
