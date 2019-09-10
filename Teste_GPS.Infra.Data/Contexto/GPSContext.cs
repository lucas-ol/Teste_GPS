using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;
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
          

            modelBuilder.Properties<string>().Configure(x => x.HasMaxLength(500));

            modelBuilder.Configurations.Add(new EntityConfig.EmpresaConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.QsaConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.AtividadeConfiguration());
        }
        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entidade do tipo \"{0}\" no estado \"{1}\" tem os seguintes erros de validação:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Erro: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }
    }
}
