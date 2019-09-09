
class Empresa {
    FindCnpj(cnpj, callback, fail) {
        const jsonp = function (url, callback) {
            var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                callback(data);
            };

            var script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        }

        cnpj = cnpj.replace(/[^\d]+/g, '');
       // xhr.open('GET', `https://www.receitaws.com.br/v1/cnpj/${cnpj}?callback=jsonp`);
        jsonp('https://www.receitaws.com.br/v1/cnpj/${cnpj}', function (data) {
            callback(data);
        });
    };
        
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
        isLoading: false
    },
    methods: {
        addFila(cnpj) {
            this.empresasFila.push({ cnpj: cnpj, isLoading :true})
        },
        FindCnpj() {
            this.isLoading = true;
            const empresa = new Empresa();
            if (empresa.ValidarCnpj(this.cnpj)) {
                var cnpj = this.cnpj;
              this.addFila(cnpj);
                empresa.FindCnpj(this.cnpj, (json) => {
                /*Mantem o valor em memoria*/
                    if (json.situacao == "ATIVA") {
                        this.empresasFila = this.empresasFila.filter(value => { value.cnpj != json.cnpj; });
                        this.empresas.push(json);
                    }
                    else {
                        this.setErromessageCnpj(json.message, cnpj);
                    }
                }, () => { this.setErromessageCnpj(json, cnpj); });
            }
            else {
                alert('CNPJ Invalido');
                this.isLoading = false;
            }
        },
        setErromessageCnpj(msg,cnpj) {
            this.empresasFila.forEach(item => {
                if (item.cnpj == cnpj) {
                    item.message = msg;
                    item.isLoading = false;
                }
            });
        }
    }
});