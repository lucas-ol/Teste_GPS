using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teste_GPS.Infra.Data.EntityConfig
{
    class AtividadeConfiguration : EntityTypeConfiguration<Domain.Entities.Atividade>
    {
        public AtividadeConfiguration()
        {
            HasKey(x => x.Id);
            Property(x => x.Code).IsRequired();
        }
    }
}
