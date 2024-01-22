using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVisible",
                table: "Cars",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVisible",
                table: "Cars");
        }
    }
}
