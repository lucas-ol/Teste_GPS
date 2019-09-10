
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teste_GPS.Domain.Entities
{
    public class Empresa
    {  
        public int Id { get; set; }
        [Newtonsoft.Json.JsonProperty("atividade_principal")]
        public virtual List<Atividade> AtividadePrincipal { get; set; }
        public string DataSituacao { get; set; }
        public string Complemento { get; set; }
        public string Nome { get; set; }
        public string Uf { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        [Newtonsoft.Json.JsonProperty("atividades_secundarias")]     
        public virtual List<Atividade> AtividadesSecundarias { get; set; }
        public virtual List<Qsa> Qsa { get; set; }
       
        public string Situacao { get; set; }
        public string Bairro { get; set; }
        public string Logradouro { get; set; }
        public long Numero { get; set; }
        public string Cep { get; set; }
        public string Municipio { get; set; }
        public string Porte { get; set; }
        public string Abertura { get; set; }
        public string NaturezaJuridica { get; set; }
        public string Fantasia { get; set; }
        public string Cnpj { get; set; }
        public DateTime? UltimaAtualizacao { get; set; }
        public string Status { get; set; }
        public string Tipo { get; set; }
        public string Efr { get; set; }
        public string MotivoSituacao { get; set; }
        public string SituacaoEspecial { get; set; }
        public string DataSituacaoEspecial { get; set; }
        public string CapitalSocial { get; set; }    
        public virtual Billing Billing { get; set; }
        public DateTime? DataCadastro { get; set; }

    }
}
