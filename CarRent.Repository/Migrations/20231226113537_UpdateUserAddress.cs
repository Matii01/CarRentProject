using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Addresses",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Addresses",
                newName: "FirstName");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Addresses",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Addresses",
                newName: "Email");

        }
    }
}
