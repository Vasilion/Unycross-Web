using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unycross_Web.Migrations
{
    public partial class userTableamaNum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AmaNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmaNumber",
                table: "Users");
        }
    }
}
