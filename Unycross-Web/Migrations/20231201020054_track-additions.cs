using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unycross_Web.Migrations
{
    public partial class trackadditions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "latitude",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "longitude",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "latitude",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "longitude",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "name",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "slug",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Tracks");
        }
    }
}
