using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teste_GPS.Infra.Data.EntityConfig
{
    public class EmpresaConfiguration : EntityTypeConfiguration<Domain.Entities.Empresa>
    {
        public EmpresaConfiguration()
        {
            HasKey(x => x.Id);

            Property(x => x.Nome).IsRequired().HasMaxLength(150);
            Property(x => x.DataCadastro).IsRequired().IsOptional();

            Property(x => x.Cnpj).IsRequired().HasMaxLength(15);
            Property(x => x.Email).IsRequired().HasMaxLength(100);
            Property(x => x.Cep).IsRequired();
            
        }
    }
}
