using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.data.Migrations
{
    /// <inheritdoc />
    public partial class AddCarDrive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarDriveId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CarDrives",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarDrives", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarDriveId",
                table: "Cars",
                column: "CarDriveId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarDrives_CarDriveId",
                table: "Cars",
                column: "CarDriveId",
                principalTable: "CarDrives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarDrives_CarDriveId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "CarDrives");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CarDriveId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarDriveId",
                table: "Cars");
        }
    }
}
