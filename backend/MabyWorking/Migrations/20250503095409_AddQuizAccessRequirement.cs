using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace mabyWorking.Migrations
{
    public partial class AddQuizAccessRequirement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "quizaccessrequirements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuizId = table.Column<int>(type: "integer", nullable: false),
                    RequiredStatusId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_quizaccessrequirements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_quizaccessrequirements_quizes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "quizes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_quizaccessrequirements_statuses_RequiredStatusId",
                        column: x => x.RequiredStatusId,
                        principalTable: "statuses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_quizaccessrequirements_QuizId",
                table: "quizaccessrequirements",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_quizaccessrequirements_RequiredStatusId",
                table: "quizaccessrequirements",
                column: "RequiredStatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "quizaccessrequirements");
        }
    }
}
