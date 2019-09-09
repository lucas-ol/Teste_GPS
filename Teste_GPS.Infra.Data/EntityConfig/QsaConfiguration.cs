

using System.Data.Entity.ModelConfiguration;

namespace Teste_GPS.Infra.Data.EntityConfig
{
    public class QsaConfiguration : EntityTypeConfiguration<Domain.Entities.Qsa>
    {
        public QsaConfiguration()
        {
            HasKey(x => x.Id);
            Property(x => x.Nome).IsRequired();
        }
    }
}
