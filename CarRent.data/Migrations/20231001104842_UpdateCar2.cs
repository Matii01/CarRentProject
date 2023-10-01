using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCar2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarMake",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "CarMakeId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CarMakes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarMakes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarMakeId",
                table: "Cars",
                column: "CarMakeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarMakes_CarMakeId",
                table: "Cars",
                column: "CarMakeId",
                principalTable: "CarMakes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarMakes_CarMakeId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "CarMakes");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CarMakeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarMakeId",
                table: "Cars");

            migrationBuilder.AddColumn<string>(
                name: "CarMake",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
