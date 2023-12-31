using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserWorkerPaths : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserWorkerPaths_AspNetUsers_UserId",
                table: "UserWorkerPaths");

            migrationBuilder.DropIndex(
                name: "IX_UserWorkerPaths_UserId",
                table: "UserWorkerPaths");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserWorkerPaths");

            migrationBuilder.AlterColumn<string>(
                name: "UserAccountId",
                table: "UserWorkerPaths",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserAccountId",
                table: "UserWorkerPaths",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UserWorkerPaths",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkerPaths_UserId",
                table: "UserWorkerPaths",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserWorkerPaths_AspNetUsers_UserId",
                table: "UserWorkerPaths",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
