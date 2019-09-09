using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste_GPS.Domain.Entities;

namespace Teste_GPS.Infra.Data.Contexto
{
    public class GPSContext : DbContext
    {
        public GPSContext()
            : base("sql")
        {

        }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Atividade> Atividades { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<Qsa> Qsas  { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Properties<string>().Configure(x => x.HasMaxLength(100));

            modelBuilder.Configurations.Add(new EntityConfig.EmpresaConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.QsaConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.AtividadeConfiguration());
        }
    }
}
