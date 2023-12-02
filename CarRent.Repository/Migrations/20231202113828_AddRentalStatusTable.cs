using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddRentalStatusTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarMaintenances_AspNetUsers_WorkerId",
                table: "CarMaintenances");

            migrationBuilder.DropIndex(
                name: "IX_CarMaintenances_WorkerId",
                table: "CarMaintenances");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "471aa901-8ef2-4cc9-bdad-d758a390146c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aabe32f-5ffe-4b86-92c8-f28a37cb97df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c206774c-c3a1-4e1f-a743-e09f7c06a69d");

            migrationBuilder.DropColumn(
                name: "WorkerId",
                table: "CarMaintenances");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "CarMaintenances",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "RentalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalStatuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2160568f-032a-4a29-bdf7-98cfd701f0de", null, "Worker", "WORKER" },
                    { "cecfe46d-7fbd-488d-a897-1311809f8234", null, "Administrator", "ADMINISTRATOR" },
                    { "f8ddde54-923a-4b80-ab07-5df2404f1ba0", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenances_UserId",
                table: "CarMaintenances",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarMaintenances_AspNetUsers_UserId",
                table: "CarMaintenances",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarMaintenances_AspNetUsers_UserId",
                table: "CarMaintenances");

            migrationBuilder.DropTable(
                name: "RentalStatuses");

            migrationBuilder.DropIndex(
                name: "IX_CarMaintenances_UserId",
                table: "CarMaintenances");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2160568f-032a-4a29-bdf7-98cfd701f0de");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cecfe46d-7fbd-488d-a897-1311809f8234");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8ddde54-923a-4b80-ab07-5df2404f1ba0");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "CarMaintenances",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkerId",
                table: "CarMaintenances",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "471aa901-8ef2-4cc9-bdad-d758a390146c", null, "Administrator", "ADMINISTRATOR" },
                    { "9aabe32f-5ffe-4b86-92c8-f28a37cb97df", null, "User", "USER" },
                    { "c206774c-c3a1-4e1f-a743-e09f7c06a69d", null, "Worker", "WORKER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenances_WorkerId",
                table: "CarMaintenances",
                column: "WorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarMaintenances_AspNetUsers_WorkerId",
                table: "CarMaintenances",
                column: "WorkerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
