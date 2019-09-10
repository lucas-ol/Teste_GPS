using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
namespace Teste_GPS.Services.ReceitaWS
{
    public class Empresa:IDisposable
    {
        public async Task<string> ConsultarCNPJAsync(string cnpj)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($@"https://www.receitaws.com.br/v1/cnpj/{cnpj}");
                return await response.Content.ReadAsStringAsync();
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
