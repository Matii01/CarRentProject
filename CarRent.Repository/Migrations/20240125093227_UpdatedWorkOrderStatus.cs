using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedWorkOrderStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDefaultForCanceled",
                table: "WorkOrderStatus",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDefaultForCompleated",
                table: "WorkOrderStatus",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDefaultForNew",
                table: "WorkOrderStatus",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDefaultForCanceled",
                table: "WorkOrderStatus");

            migrationBuilder.DropColumn(
                name: "IsDefaultForCompleated",
                table: "WorkOrderStatus");

            migrationBuilder.DropColumn(
                name: "IsDefaultForNew",
                table: "WorkOrderStatus");
        }
    }
}
