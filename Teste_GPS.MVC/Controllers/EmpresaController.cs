using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Teste_GPS.MVC.Controllers
{
    public class EmpresaController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        [HttpPost]
        public ActionResult Cadastrar(List<Domain.Entities.Empresa> empresas)
        {
            using (var client = new Infra.Data.Repositories.EmpresaRepository())
            {
                var feed = new Services.FeedBack { Message = "Erro ao cadastrar", Status = "ERRO" };

                try
                {
                    empresas.ForEach((item) =>
                    {
                        if (client.GetByCNPJ(item.Cnpj) == null)
                            client.Add(item);
                    });

                    feed.Status = "OK";
                    return Json(feed);
                }
                catch (Exception ex)
                {
                    return Json(feed);
                }
            }
        }

        [HttpGet]
        public ActionResult Listar()
        {
            using (var client = new Infra.Data.Repositories.EmpresaRepository())
            {
                try
                {
                    var empresas = client.GetAll().ToList();                  

                    return Json(empresas, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json("{}", JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpGet]
        public async Task<ActionResult> ConsultarCNPJAsync(string cnpj)
        {
            using (var client = new Services.ReceitaWS.Empresa())
            {
                try
                {
                    var result = await client.ConsultarCNPJAsync(cnpj);

                    return Json(Newtonsoft.Json.JsonConvert.DeserializeObject<Domain.Entities.Empresa>(result), JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    var feed = new Services.FeedBack
                    {
                        Status = "ERRO",
                        Message = "Erro ao se conectar com serviço"
                    };
                    return Json(feed, JsonRequestBehavior.AllowGet);
                }
            }
        }
    }
}