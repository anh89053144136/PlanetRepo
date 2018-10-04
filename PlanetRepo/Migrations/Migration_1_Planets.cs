using FluentMigrator;
using FluentMigrator.Infrastructure;

namespace PlanetRepo.Migrations
{
    [Migration(20181004000001)]
    public class PlanetsMigration : Migration
    {
        private const string tabPlanets = "Planets";

        public override void Up()
        {
            Create.Table(tabPlanets)
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("name").AsString()
                .WithColumn("lastVisitDate").AsDateTime().Nullable()
                .WithColumn("radius").AsDouble();
        }

        public override void Down()
        {
            Delete.Table(tabPlanets);
        }
    }
}
