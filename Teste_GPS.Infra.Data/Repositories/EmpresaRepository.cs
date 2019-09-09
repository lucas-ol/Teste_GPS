using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste_GPS.Domain.Entities;
using Teste_GPS.Domain.Interfaces;
using Teste_GPS.Infra.Data.Contexto;

namespace Teste_GPS.Infra.Data.Repositories
{
    public class EmpresaRepository : RepositoryBase<Empresa>, IEmpresaRepository
    {
        public void AddRange(IEnumerable<Empresa> empresas) {
            using (var ctx = new GPSContext())
            {
                ctx.Empresas.AddRange(empresas);
                ctx.SaveChanges();
            }
        }
    }
}
