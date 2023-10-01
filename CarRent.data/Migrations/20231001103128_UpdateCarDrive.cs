using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCarDrive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CarDrives",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "CarDrives");
        }
    }
}
