using FluentMigrator;
using FluentMigrator.Infrastructure;

namespace PlanetRepo.Migrations
{
    public class PlanetsMigration : Migration
    {
        private const string tabPlanets = "Planets";

        public override void Up()
        {
            Create.Table(tabPlanets)
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("name").AsString()
                .WithColumn("lastVisitDate").AsDateTime()
                .WithColumn("radius").AsDouble();
        }

        public override void Down()
        {
            Delete.Table(tabPlanets);
        }
    }
}
