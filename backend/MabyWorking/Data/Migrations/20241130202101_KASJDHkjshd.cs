using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mabyWorking.Data.Migrations
{
    /// <inheritdoc />
    public partial class KASJDHkjshd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationUserName",
                table: "AspNetUsers");
        }
    }
}
