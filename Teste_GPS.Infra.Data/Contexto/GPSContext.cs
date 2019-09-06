using System;
using System.Collections.Generic;
using System.Data.Entity;
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

    }
}
