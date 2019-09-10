
class Empresa {
    FindCnpj(cnpj, callback, fail) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200)
                    callback(JSON.parse(this.responseText));
                else
                    fail({ 'Status': 'ERROR', 'Message': 'Erro ao se conectar com serviço' });
            }

        };
        xhr.open("GET", `/empresa/ConsultarCNPJAsync?cnpj=${cnpj}`, true);
        xhr.send();
    }

    Listar(callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200)
                    callback(JSON.parse(this.responseText));
                else {
                    callback([]);
                }
            }

        };
        xhr.open("GET", `/empresa/Listar`, true);
        xhr.send();
    }

    Cadastrar(empresas, callback) {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }

        };
        xhr.open("POST", `/empresa/Cadastrar`, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ empresas: empresas }));
    }

    ValidarCnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14) 
            return false;

        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    }
}

const vwEmpresa = new Vue({
    el: '#empresa',
    data: {
        cnpj: '',
        empresas: [],
        empresasFila: [],
        empresasCadastradas: [],
        empresaDestaque: {},
        isLoadingList: false,
        isLoading: false
    },
    methods: {
        addFila(cnpj) {
            this.empresasFila.push({ loading: true, 'cnpj': cnpj, Message: '' })
        },
        FindCnpj() {
            const empresa = new Empresa();
            if (this.empresas.map((e) => { return e.Cnpj }).indexOf(this.cnpj) >= 0) {
                alert('CNPJ ja Adicionado');
                return;
            }

            if (empresa.ValidarCnpj(this.cnpj)) {
                var cnpj = this.cnpj;
                this.addFila(cnpj);
                empresa.FindCnpj(this.cnpj, (json) => {
                    /*Mantem o valor em memoria*/                   
                        this.empresasFila = this.empresasFila.filter(value => { value.cnpj !== json.Cnpj; });
                        this.empresas.push(json);
                        this.cnpj = "";
                    
                    
                }, json => { this.setErromessageCnpj(json.Message, cnpj); });
            }
            else {
                this.setErromessageCnpj('CNPJ Invalido', this.cnpj);
            }
        },
        setErromessageCnpj(msg, cnpj) {
            this.empresasFila.forEach(item => {
                if (item.cnpj == cnpj) {
                    item.Message = msg;
                    item.loading = false;
                }
            });
        },
        Cadastrar() {

            const empresa = new Empresa();
            if (this.empresas.length == 0) {
                alert('Adicione pelo menos 1 CNPJ');
                return;
            }
            this.isLoading = true;
            empresa.Cadastrar(this.empresas, result => {
                if (result.Status == "OK") {
                    alert("Empresas Cadastradas com sucesso");
                    window.location.href = window.location.href;
                }
                else
                    alert(result.Message);

                this.isLoading = false;
            });

        },
        Listar() {
            this.isLoadingList = true;
            const empresa = new Empresa();
            empresa.Listar(result => {
                if (result.length > 0) {
                    this.empresasCadastradas = result;
                }
                this.isLoadingList = false;
            });

        },
        CarregarDetalhe(item) {
            this.empresaDestaque = item;
        },
        FecharDetalhe() {
            this.empresaDestaque = {};
        },
        remover(empresa) {
            this.empresas = this.empresas.filter(item => {
                return item.Cnpj !== empresa.Cnpj;
            });
        }
    }
});

vwEmpresa.Listar();