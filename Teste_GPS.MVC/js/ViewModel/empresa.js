"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Empresa =
/*#__PURE__*/
function () {
  function Empresa() {
    _classCallCheck(this, Empresa);
  }

  _createClass(Empresa, [{
    key: "FindCnpj",
    value: function FindCnpj(cnpj, callback, fail) {
      cnpj = cnpj.replace(/[^\d]+/g, '');
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) callback(JSON.parse(this.responseText));else fail({
            'Status': 'ERROR',
            'Message': 'Erro ao se conectar com serviço'
          });
        }
      };

      xhr.open("GET", "/empresa/ConsultarCNPJAsync?cnpj=".concat(cnpj), true);
      xhr.send();
    }
  }, {
    key: "Listar",
    value: function Listar(callback) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
        } else {
          callback([]);
        }
      };

      xhr.open("GET", "/empresa/Listar", true);
      xhr.send();
    }
  }, {
    key: "Cadastrar",
    value: function Cadastrar(empresas, callback) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
        }
      };

      xhr.open("POST", "/empresa/Cadastrar", true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        empresas: empresas
      }));
    }
  }, {
    key: "ValidarCnpj",
    value: function ValidarCnpj(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');
      if (cnpj == '') return false;
      if (cnpj.length != 14) return false;
      if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999") return false;
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;

      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }

      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return false;
      return true;
    }
  }]);

  return Empresa;
}();

var vwEmpresa = new Vue({
  el: '#empresa',
  data: {
    cnpj: '',
    empresas: [],
    empresasFila: [],
    empresasCadastradas: []
  },
  methods: {
    addFila: function addFila(cnpj) {
      this.empresasFila.push({
        loading: true,
        'cnpj': cnpj,
        Message: ''
      });
    },
    FindCnpj: function FindCnpj() {
      var _this = this;

      var empresa = new Empresa();

      if (this.empresas.map(function (e) {
        return e.Cnpj;
      }).indexOf(this.cnpj) >= 0) {
        alert('CNPJ ja Adicionado');
        return;
      }

      if (empresa.ValidarCnpj(this.cnpj)) {
        var cnpj = this.cnpj;
        this.addFila(cnpj);
        empresa.FindCnpj(this.cnpj, function (json) {
          /*Mantem o valor em memoria*/
          if (json.Situacao == "ATIVA") {
            _this.empresasFila = _this.empresasFila.filter(function (value) {
              value.cnpj != json.Cnpj;
            });

            _this.empresas.push(json);

            _this.cnpj = "";
          } else {
            _this.setErromessageCnpj(json.Message, cnpj);
          }
        }, function (json) {
          _this.setErromessageCnpj(json.Message, cnpj);
        });
      } else {
        setErromessageCnpj('CNPJ Invalido', this.cnpj);
      }
    },
    setErromessageCnpj: function setErromessageCnpj(msg, cnpj) {
      this.empresasFila.forEach(function (item) {
        if (item.cnpj == cnpj) {
          item.Message = msg;
          item.loading = false;
        }
      });
    },
    Cadastrar: function Cadastrar() {
      var empresa = new Empresa();

      if (this.empresas.length == 0) {
        alert('Adicione pelo menos 1 CNPJ');
        return;
      }

      empresa.Cadastrar(this.empresas, function (result) {
        if (result.Status == "OK") {
          alert("Empresas Cadastradas com sucesso");
          window.location.href = window.location.href;
        } else alert(result.Message);
      });
    },
    Listar: function Listar() {
      var _this2 = this;

      this.isLoading = true;
      var empresa = new Empresa();
      empresa.Listar(function (result) {
        if (result.length > 0) {
          _this2.empresasCadastradas = result;
        }

        _this2.isLoading = false;
      });
    },
    remover: function remover(empresa) {
      this.empresas = this.empresas.filter(function (item) {
        return item.Cnpj != empresa.Cnpj;
      });
    }
  }
});
vwEmpresa.Listar();