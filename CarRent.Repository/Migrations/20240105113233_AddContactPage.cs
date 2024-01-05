using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddContactPage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "ContactPage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PageDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddressTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddressIcon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AddressDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneIcon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailIcon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactSectionTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextRowOne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextRowTwo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactPage", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactPage");
        }
    }
}
