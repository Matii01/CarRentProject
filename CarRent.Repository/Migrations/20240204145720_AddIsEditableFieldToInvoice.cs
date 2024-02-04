﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRent.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddIsEditableFieldToInvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEditable",
                table: "Invoices",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEditable",
                table: "Invoices");
        }
    }
}
