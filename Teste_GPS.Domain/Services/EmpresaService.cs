using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste_GPS.Domain.Interfaces;

namespace Teste_GPS.Domain.Services
{
    public class EmpresaService:ServiceBase<Entities.Empresa>,Interfaces.Services.IEmpresaService
    {
        private readonly IEmpresaRepository _empresaRepository;
        public EmpresaService(IEmpresaRepository empresaRepository):
            base(empresaRepository)
        {
            _empresaRepository = empresaRepository;
        }
    }
}
