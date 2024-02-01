using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class CarEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarEquipment",
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
                    table.PrimaryKey("PK_CarEquipment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarCarEquipment",
                columns: table => new
                {
                    CarsEquipmentId = table.Column<int>(type: "int", nullable: false),
                    CarsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarCarEquipment", x => new { x.CarsEquipmentId, x.CarsId });
                    table.ForeignKey(
                        name: "FK_CarCarEquipment_CarEquipment_CarsEquipmentId",
                        column: x => x.CarsEquipmentId,
                        principalTable: "CarEquipment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarCarEquipment_Cars_CarsId",
                        column: x => x.CarsId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarEquipmentCars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarEquipmentId = table.Column<int>(type: "int", nullable: false),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarEquipmentCars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarEquipmentCars_CarEquipment_CarEquipmentId",
                        column: x => x.CarEquipmentId,
                        principalTable: "CarEquipment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarEquipmentCars_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarCarEquipment_CarsId",
                table: "CarCarEquipment",
                column: "CarsId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEquipmentCars_CarEquipmentId",
                table: "CarEquipmentCars",
                column: "CarEquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEquipmentCars_CarId",
                table: "CarEquipmentCars",
                column: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarCarEquipment");

            migrationBuilder.DropTable(
                name: "CarEquipmentCars");

            migrationBuilder.DropTable(
                name: "CarEquipment");
        }
    }
}
