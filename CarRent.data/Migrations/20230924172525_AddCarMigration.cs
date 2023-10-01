using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.data.Migrations
{
    /// <inheritdoc />
    public partial class AddCarMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AirConditioningTypeId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "AverageCombustion",
                table: "Cars",
                type: "float(18)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "CarMake",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "CarMileage",
                table: "Cars",
                type: "float(18)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "CarModel",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CarTypeId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EngineTypeId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GearBoxTypeId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KilometrLimitId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfDoors",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSeats",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "OverlimitFee",
                table: "Cars",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "TrunkCapacity",
                table: "Cars",
                type: "float(18)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "YearOfProduction",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AirConditions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirConditions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarsTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarsTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EngineTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EngineTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GearboxTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GearboxTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KilometrLimits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LimitValue = table.Column<decimal>(type: "decimal(18,2)", maxLength: 64, precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KilometrLimits", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_AirConditioningTypeId",
                table: "Cars",
                column: "AirConditioningTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarTypeId",
                table: "Cars",
                column: "CarTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_EngineTypeId",
                table: "Cars",
                column: "EngineTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_GearBoxTypeId",
                table: "Cars",
                column: "GearBoxTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cars_KilometrLimitId",
                table: "Cars",
                column: "KilometrLimitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_AirConditions_AirConditioningTypeId",
                table: "Cars",
                column: "AirConditioningTypeId",
                principalTable: "AirConditions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_CarsTypes_CarTypeId",
                table: "Cars",
                column: "CarTypeId",
                principalTable: "CarsTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_EngineTypes_EngineTypeId",
                table: "Cars",
                column: "EngineTypeId",
                principalTable: "EngineTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_GearboxTypes_GearBoxTypeId",
                table: "Cars",
                column: "GearBoxTypeId",
                principalTable: "GearboxTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_KilometrLimits_KilometrLimitId",
                table: "Cars",
                column: "KilometrLimitId",
                principalTable: "KilometrLimits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_AirConditions_AirConditioningTypeId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_CarsTypes_CarTypeId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_EngineTypes_EngineTypeId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_GearboxTypes_GearBoxTypeId",
                table: "Cars");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_KilometrLimits_KilometrLimitId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "AirConditions");

            migrationBuilder.DropTable(
                name: "CarsTypes");

            migrationBuilder.DropTable(
                name: "EngineTypes");

            migrationBuilder.DropTable(
                name: "GearboxTypes");

            migrationBuilder.DropTable(
                name: "KilometrLimits");

            migrationBuilder.DropIndex(
                name: "IX_Cars_AirConditioningTypeId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_CarTypeId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_EngineTypeId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_GearBoxTypeId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_KilometrLimitId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "AirConditioningTypeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "AverageCombustion",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarMake",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarMileage",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarModel",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "CarTypeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "EngineTypeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "GearBoxTypeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "KilometrLimitId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "NumberOfDoors",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "NumberOfSeats",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "OverlimitFee",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "TrunkCapacity",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "YearOfProduction",
                table: "Cars");
        }
    }
}
