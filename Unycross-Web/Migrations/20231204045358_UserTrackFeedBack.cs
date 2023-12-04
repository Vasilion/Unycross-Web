using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Unycross_Web.Migrations
{
    public partial class UserTrackFeedBack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Tracks",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "slug",
                table: "Tracks",
                newName: "Slug");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Tracks",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "longitude",
                table: "Tracks",
                newName: "Longitude");

            migrationBuilder.RenameColumn(
                name: "latitude",
                table: "Tracks",
                newName: "Latitude");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Tracks",
                newName: "Description");

            migrationBuilder.AddColumn<string>(
                name: "Rating",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Terrain",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UsersTrackFeedBack",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrackId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Terrain = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    Review = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersTrackFeedBack", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersTrackFeedBack");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "Terrain",
                table: "Tracks");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Tracks",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Slug",
                table: "Tracks",
                newName: "slug");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tracks",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "Tracks",
                newName: "longitude");

            migrationBuilder.RenameColumn(
                name: "Latitude",
                table: "Tracks",
                newName: "latitude");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Tracks",
                newName: "description");
        }
    }
}
