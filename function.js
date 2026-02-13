const gerarPdf = document.getElementById('gerarPdf');
const trocarCinzaRoxo = document.getElementById('trocarCinzaRoxo');

document.addEventListener("DOMContentLoaded", function () {


    const limparButton = document.getElementById("limparCampos");
    if (limparButton) {
        limparButton.addEventListener("click", function () {
            const inputs = document.querySelectorAll("input, textarea, select");
            inputs.forEach(function (input) {
                if (
                    input.type === "radio" ||
                    input.type === "checkbox"
                ) {
                    input.checked = false;
                } else if (
                    input.id !== "dataHoje" &&
                    input.id !== "atendenteManual"
                ) {
                    input.value = "";
                }
            });
        });
    }



    // ✅ Enter para ir para o próximo campo
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });
    });

    // ✅ Login integrado
    const formLogin = document.getElementById('loginForm');
    const mensagemErro = document.getElementById('mensagemErro');

    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            e.preventDefault();

            const atendente = document.getElementById('atendenteLogin').value.trim();
            const senha = document.getElementById('senha').value;

            const atendentesValidos = ['Irandi', 'Celma', 'Winne', 'Filo', 'Vanessa', 'Euler', 'Solange'];
            const senhaValida = 'smtt1234';

            if (atendentesValidos.includes(atendente) && senha === senhaValida) {
                mensagemErro.textContent = '';

                // Atualiza o nome do atendente na interface
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('formularioSection').style.display = 'block';
                document.getElementById('nomeAtendenteSpan').textContent = atendente;
                document.getElementById('atendenteManual').value = atendente;

                // Atualiza protocolo também se existir
                if (campoProtocolo) {
                    campoProtocolo.value = atendente;
                }
            } else {
                mensagemErro.textContent = 'Atendente ou senha inválidos!';
            }
        });
    }
});

// Função para obter a data atual no formato YYYY-MM-DD
function obterDataAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

const bairrosPorCidade = {
    "ARACAJU": [
        "LAMARÃO", "PORTO DANTAS", "SOLEDADE", "DOM LUCIANO", "BUGIO",
        "OLARIA", "CENTENÁRIO", "JAPÃOZINHO", "CIDADE NOVA", "INDUSTRIAL",
        "PALESTINA", "AEROPORTO", "SANTOS DUMONT", "SANTO ANTÔNIO",
        "JOSÉ CONRADO DE ARAÚJO", "18 DO FORTE", "GETÚLIO VARGAS", "CAPUCHO",
        "SIQUEIRA CAMPOS", "CIRURGIA", "CENTRO A", "NOVO PARAÍSO", "SUÍSSA",
        "SÃO JOSÉ", "PEREIRA LOBO", "AMÉRICA", "13 DE JULHO", "SALGADO FILHO",
        "PONTO NOVO", "GRAGERU", "JABOTIANA", "JARDINS", "INÁCIO BARBOSA",
        "COROA DO MEIO", "SÃO CONRADO", "FAROLÂNDIA", "ATALAIA", "17 DE MARÇO",
        "ARUANA", "SANTA MARIA", "ROBALO", "SÃO JOSÉ DOS NÁUFRAGOS", "AREIA BRANCA",
        "MATAPUÃ", "GAMELEIRA", "MOSQUEIRO", "LUZIA", "MARIVAN"
    ],
    "SOCORRO": [
        "ALBANO FRANCO", "BOA VIAGEM", "CASTELO", "CENTRO S", "FERNANDO COLLOR",
        "GUAJARÁ", "ITACANEMA", "JARDIM", "JOÃO ALVES", "MANGABEIRA",
        "MARCOS FREIRE I", "MARCOS FREIRE II", "MARCOS FREIRE III", "NOVO HORIZONTE",
        "PAI ANDRÉ", "PALESTINA DE DENTRO", "PALESTINA DE FORA", "PARQUE DOS FARÓIS",
        "PIABETA", "PORTO GRANDE", "SANTA CECÍLIA", "SANTA INÊS", "SANTO INÁCIO",
        "SÃO BRÁS", "SOBRADO", "TABOCA", "TAIÇOCA DE DENTRO", "TAIÇOCA DE FORA",
        "BITA", "CALUMBI", "CAMARATUBA", "DISTRITO INDUSTRIAL", "LAVANDEIRA",
        "NOSSA SENHORA DO SOCORRO", "OITEIRO", "PALESTINA", "QUISSAMÃ"
    ],
    "BARRA DOS COQUEIROS": [
        "CENTRO", "ATALAIA NOVA", "ANTÔNIO PEDRO", "ESPAÇO TROPICAL",
        "MOISÉS GOMES", "OLIMAR", "PRAIA COSTA CANAL", "TOURO", "JATOBÁ", "CAPUÃ",
        "OLHOS D'ÁGUA", "PRISCO VIANA", "RECANTO ANDORINHAS", "SERIGY", "BEIRA RIO",
        "HILDETE FALCÃO BATISTA", "COSTA PARADISO", "BRISAS DA ATALAIA",
        "PARAÍSO DA BARRA", "LUAR DA BARRA", "SÃO BENEDITO", "BAIRRO BAIXO",
        "CAMINHO DA PRAIA", "SUZANA AZEVEDO", "ALPHAVILLE"
    ],
    "SÃO CRISTÓVÃO": [
        "ALDEIA", "ALTO DA COLINA", "ALTO DA DIVINEIA", "ALTO DE ITABAIANA",
        "ALTO SANTO ANTÔNIO", "ANINGAS", "ARAME I", "ARAME II",
        "ASSENTAMENTO NOVA CANAÃ", "BARREIRO", "CAÍPE VELHO", "CAJUEIRO", "CARDOSO",
        "CABRITA", "CAMBOATÁ", "CAMBOATÁ 2", "CENTRO HISTÓRICO", "COLÔNIA MIRANDA", "ROSA ELZE",
        "CRISTO REDENTOR", "ESTIVA", "FEIJÃO", "JOSÉ BATALHA DE GÓIS", "LAURO ROCHA",
        "MADALENA DE GÓIS", "MARCELO DÉDA", "MOSQUEIRO", "PARQUE SANTA RITA",
        "PEDREIRAS", "PINTOS", "QUISSAMÃ", "RECANTO DOS PASSARINHOS", "RITA CACETE",
        "TERRA DURA", "TINHARÉ", "UMBAUBÁ", "VALE DO AMANHECER", "VÁRZEA GRANDE", "EDUARDO GOMES"
    ]
};


function filtrarBairros() {
    const input = document.getElementById("bairro");
    const sugestoes = document.getElementById("sugestoesBairros");
    const textoDigitado = input.value.toLowerCase();

    sugestoes.innerHTML = '';

    for (const cidade in bairrosPorCidade) {
        bairrosPorCidade[cidade].forEach(bairro => {
            if (bairro.toLowerCase().includes(textoDigitado)) {
                const option = document.createElement("option");
                option.value = bairro;
                sugestoes.appendChild(option);
            }
        });
    }
}

document.getElementById("bairro").addEventListener("change", function () {
    const input = this;
    const valorDigitado = input.value.toLowerCase();
    let encontrado = false;

    for (const cidade in bairrosPorCidade) {
        const bairroCorreto = bairrosPorCidade[cidade].find(
            b => b.toLowerCase() === valorDigitado
        );
        if (bairroCorreto) {
            input.value = bairroCorreto;
            document.getElementById("cidade").value = cidade;
            document.getElementById("cidade").readOnly = true;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        document.getElementById("cidade").value = "";
        document.getElementById("cidade").readOnly = false;
    }
});


// Funções de formatação
function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
function formatarDataHoje(data) {
    const partes = data.split('-');
    const dia = partes[2];
    const mes = obterMesPorExtenso(partes[1]);
    const ano = partes[0];
    return `${dia} de ${mes} de ${ano}`;
}
function obterMesPorExtenso(mes) {
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return meses[parseInt(mes, 10) - 1];
}
function formatarTelefone(telefone) {
    const telLimpo = telefone.replace(/\D/g, '');

    // Se o campo estiver vazio, apenas retorna vazio sem alertar
    if (telLimpo === "") {
        return "";
    }

    // Verifica se tem pelo menos DDD (2 dígitos) + número (8 ou 9 dígitos)
    if (!/^\d{10,11}$/.test(telLimpo)) {
        alert("Número inválido ou sem DDD. Esperado: (99) 99999-9999 ou (99) 9999-9999.");
        return "";
    }

    // Formata números com 11 dígitos (celular)
    if (telLimpo.length === 11) {
        return telLimpo.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    }

    // Formata números com 10 dígitos (fixo)
    if (telLimpo.length === 10) {
        return telLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    // Se cair aqui, o número é inválido (mas essa parte provavelmente nunca será alcançada)
    alert("Número de telefone inválido.");
    return "";
}


function formatarCPF(cpf) {
    if (!cpf || typeof cpf !== 'string' && typeof cpf !== 'number') return '';
    const cpfLimpo = cpf.toString().replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return cpf; // retorna original se não tiver 11 dígitos
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

const textLines = [
    'ESTADO DE SERGIPE',
    'PREFEITURA MUNICIPAL DE ARACAJU',
    'SUPERINTENDÊNCIA MUNICIPAL DE TRANSPORTES E TRÂNSITO',
    'DIRETORIA ADMINISTRATIVA E FINANCEIRA',
    'NÚCLEO DE PERÍCIA MÉDICA'
];

// Função para carregar a imagem
function carregarImagem(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 2300;
            canvas.height = 920;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
    });
}

// Função para adicionar texto justificado
function adicionarTextoJustificado(doc, texto, largura, margem, yInicial) {
    const linhas = doc.splitTextToSize(texto, largura);
    let y = yInicial;

    linhas.forEach((linha) => {
        const palavras = linha.split(' ');
        const numPalavras = palavras.length;

        if (numPalavras > 1) {
            const larguraTotal = palavras.reduce((total, palavra) => total + doc.getTextWidth(palavra) + doc.getTextWidth(' '), 0);
            const espacoExtra = largura - larguraTotal;
            const espacos = numPalavras - 1;
            const espacoAdicional = espacoExtra / espacos;

            let x = margem;
            palavras.forEach((palavra) => {
                doc.text(palavra, x, y);
                x += doc.getTextWidth(palavra) + espacoAdicional + doc.getTextWidth(' ');
            });
        } else {
            doc.text(linha, margem, y);
        }

        y += 7;
    });
    return y; // Retorna a posição Y final
}

let autorizacao = false;

// Função para verificar a idade
function verificarIdade(nomeMae) {
    const dataNascimento = document.getElementById('dataNascimento').value;
    const hoje = new Date();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const mesNascimento = new Date(dataNascimento).getMonth();
    const diaNascimento = new Date(dataNascimento).getDate();

    // Calcula a idade
    let idade = hoje.getFullYear() - anoNascimento;

    // Ajusta a idade se ainda não tiver feito aniversário este ano
    if (hoje.getMonth() < mesNascimento || (hoje.getMonth() === mesNascimento && hoje.getDate() < diaNascimento)) {
        idade--;
    }

    let cpfResponsavel = null;
    let nomeOutroResponsavel = null; // Variável para o nome do outro responsável

    // Verifica se a idade é menor que 8
    if (idade < 18) {
        const mensagem = `É necessário fazer a autorização para catraca. Deseja fazer em nome de ${nomeMae}?`;
        autorizacao = confirm(mensagem);

        if (autorizacao) {
            cpfResponsavel = prompt(`Informe o CPF de ${nomeMae}:`);
            if (cpfResponsavel) {
                alert("Autorização em nome de " + nomeMae + " foi iniciada.");
            } else {
                alert("Autorização não foi feita.");
            }
        } else {
            nomeOutroResponsavel = prompt("Informe o nome do outro responsável:");
            cpfResponsavel = prompt("Informe o CPF do responsável:");

            if (nomeOutroResponsavel && cpfResponsavel) {
                alert(`Autorização em nome de ${nomeOutroResponsavel} (CPF: ${cpfResponsavel}) foi iniciada.`);
            } else {
                alert("Autorização não foi feita.");
            }
        }
    }

    return { cpfResponsavel, nomeOutroResponsavel }; // Retorna CPF e nome do responsável
}


document.getElementById('dataHoje').value = obterDataAtual();



gerarPdf.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    // Acessa jsPDF do objeto global
    // Captura todos os valores do formulário

    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const ssp = document.getElementById('ssp').value;
    const cpf = document.getElementById('cpf').value;
    const dataHoje = document.getElementById('dataHoje').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cidade = document.getElementById('cidade').value;
    const nomeMae = document.getElementById('nomeMae').value;
    const endereco = document.getElementById('endereco').value;
    const numCasa = document.getElementById('numCasa').value;
    const bairro = document.getElementById('bairro').value;
    const telefone1 = document.getElementById('telefone1').value;
    const telefone2 = document.getElementById('telefone2').value;
    const dataAgendamento = document.getElementById('dataAgendamento').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const deficiencia = document.querySelector('input[name="deficiencia"]:checked').value;
    const horario = document.getElementById('horario').value;
    const atendente = document.getElementById("atendenteManual").value;
    const nomeAtendenteParaCapa = document.getElementById("nomeAtendenteSpan").textContent;



    const { cpfResponsavel, nomeOutroResponsavel } = verificarIdade(nomeMae);


    const cpfFormatado = formatarCPF(cpf);
    const cpfFormatadoResponsavel = formatarCPF(cpfResponsavel);

    const telefone1Formatado = formatarTelefone(telefone1);
    const telefone2Formatado = formatarTelefone(telefone2);

    const dataHojeFormatada = formatarData(dataHoje);
    const dataHojeFormatadaExtenso = formatarDataHoje(dataHoje);
    const dataAgendamentoFormatada = formatarData(dataAgendamento);
    const dataNascimentoFormatada = formatarData(dataNascimento);


    // Cria um novo documento PDF
    const doc = new jsPDF();



    // Define o título do PDF
    doc.setFontSize(18);

    const imgData = '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d5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NOidssd2nFXwbHfJp0sdljvLYq+Mo751Oljssd5bFXxlHfOoB0Ttlju04q+DY75NY5ifH1g422kcjwWObHgLVjV7Is92ozhIxFigouZ/cJTKmTRKUonEpCFEwhroQofUFZH0sdljvLYq+Mo751Y5ifINg5J2kcjzuOb4gLqjULIs9oo8hJNF8gmuV/cJjJGURMYoHApyGEojroco/WFAXfTq0rz5iZibdinc7PyrONjY9E7l28eLlRQbokDUyiihxApCgACImEQAACvQ16taw/LdpSN+4yuqyYdRsk9nIlywbqOjGKiU6iYlATiUphAuo9egCP5qzVMPZxCibnuspqGk11GsdLsnaybdF0dNBwQ5yorb3JKCACIgQ+4fdN6jbhtNdBr0fr1GovizEt6YtyFcq7BaGe2ZJlj2MOkZ0oi7iI9uV4qDcEgRFNQpFnQJJF3yAVAC6iJkwKe0BqA/fVZvb5w5rPLcZUqz+fO+8+61+l8T4syhtS3p5zMa2pdv0Zj+0vIvp2GbP8AyXlJG4eU5LliG3N7kyb27pruF19QVsDWv0vljFmL9qW9POZkq1LS+k8f2l5F9OzLZh5VycjcPKclyxy7+7yhN7d103y6+sKpoyzonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TTpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dQDonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TTpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dQDonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TTpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dQDonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TTpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dQHj3bsrbMDW1Jpy22ccXIqpR7k6ahLPjimIYEjCAgII6gID9dflsQJkS2RMRlSTIQo2owNoUNA1FMBEf6xEREfzjX63btU7MDq1Jps22jsXLKqx7kiaZLwjjGOYUjAAAALaiIj9VflsQKEV2RMRmSUIcoWowLqUdQ1BMAEP6wEBAfzhQFypSlAKUpQClKUArXfbo/A9BfpAtH98Nq2IrXfbo/A9BfpAtH98NqA2IpSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClK19xRL7UuUMW2bkvzn4rjOdtvx075F5vJFbyXypsmtyXKfThd/d5Td3t0uumuga6UBsFSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KmOGbtv6efX/AG3kaQt+RkrMuhOESfQkUtHIOUFIiOflMZBZy5MU4GfHIIgqICBCjoHXVOoBSlKAUpSgFKUoBSlKAUpSgFKVMczXbf0C+sC28cyFvx0led0KQir6bilpFBsgnESL8xioIuWxjHEzEhAEVQAAOYdB6qAp1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAzy9f6Gz39mOv2RqlexF+KJiL+6Uf+yCubtt7afLak0LrL+LjpBHuRUKTHEiQwl5M2oAYZwQAdPr0HT7Br8tiEFeiNiPlDEEeajDrKXQNOTDQPWPXppqP1j19XqoC5UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbEUpSgFKUoBSlKAUpSgOPX9VR3aqvS5LDxE4n7Xu5la70ZaJZjLPXrZm3aorvkElTKOHLZykgXcOYBUOgqBddd0dKsI/Z9tcfXoI1zrUxfBp9mnHXAqsaSWrtaXqpJ2OEhcr6Xh4VUzO8ZRjAnkY2TBy+cNG7gJRo1K1RIgRFB1ypgbEXRcAcEi7wJk9i+czZhQLAvYm7Z5qiiS7nr9yxZRAsUU2E4m2brSnlKYrFYJImEqosw8o3dT9YgJg3C0HXqGuN3X11tNbVNW5t8004T4JufS1ozGK3pLlGL5s0tbZ1ytHvZha5ciTsHBycrIt/peYZQ3k8ZHozgsxfxYt0hHkUERKmueR3uSUWbqiQyW/vXjZ9vJ7eEdcop5HDIMDGy4NIS6gI01kkRbIqKgKjMibZfklzqpcoimQvobggJyHMNa6g106qAYB6ihqFTR+SjZd8b9VHtzlu8WFfmqlW4ZYP5GFsJufrSlK0UVKdk38VjDf6P7e/dyFVaolamznc9j2rDWVa21BlRlDW9Ht4uObeRWypyDVBMqaSe+eHMc26QhQ1MImHTUREeugLbSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoBhv8ACLnb9IDP/dWBqq1g+McYp41JcSy16XBdMldUwE3JSU0VkVdRcrNqzKUpWbduiUhUWSIAAJ667wiI61nFAKUpQHlz7mRYwr97FR3lz1Bsoq3bb+7y6hSiJSa/VqIAGv561mx/mOWmpW1Cw20CW+FJtwJp+OLGMSBCuBiZFwZmAoIlMgBVkE/9HXE7lPkdFFDApoO1GogIam/yr69f+Fcq6HVTXSnG0oT3Y3XfnZQ1eUK1sHPPD6erlO0aPW1tM3I1sRN7BZ1eZLfT9qx3lDljEMZNxbdwu1UUipJpRbUoK7pFXbgWiiaq4FYGHrAwgPpyG0a/loSzjXVtEr4ueJ29OklFV4xiyUkp5gu0RKQzOUaGXDlCqHWK2SKksYipQDQdNNzREwDoHqoXUdPqrVXnc4Y4cU44W2rWvFMzAw9PynvC5eaMbau4FyzkO+M3z0Lf2RoZgo0YtTlsYJhik+aLnjWC6ojGmYeWgmRVdf7sZ+YAENwUureDaPTq3vtoHX9dfXr6tf8AKtNyklko58SJQ295zSlKpRUqzJ+EXBP6QHn+6s9VVrB8nYxTyUS3Vkb0uC1pK1ZgZuNkoUrIy6a5mbpmYpivG7hExDIvVgEBT113RAQ0oDOKVKvM3kXvY5V922rwanmbyL3scq+7bV4NQFVpUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBVaVKvM3kXvY5V922rwanmbyL3scq+7bV4NQFVpUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBnd6/0Nnv7MdfsjVK9iL8UTEX90o/9kFc3dh/IKFqTSp9qjKSxSRzkxkzx1rgU4Akb0R3YcB0H1dQgP2CFflsQkMTZFxGBlTn/wCSbAdTbuugpgIB1AHUHqD69A69R66AuVKUoBSlKAUpSgFa77dH4HoL9IFo/vhtWxFa77dH4HoL9IFo/vhtQGxFKUoBSlKAUpSgPjdoJR9dAN69KjF0bSpLQmLwjbgw1fjdlZMSpPSMsC8KLQ7AAc8ismH0hyogsLNYpAMmUxR3RUBIB1DNTSu+fYqTeHySzboAOtc9YaAFS3Hm0Fa2SGsU7iol82JMRsjLNjfSEa/ROgycJIK6OI904QMYTrF0AqhtN04G3RDQZ0jt5YtcY7jcnEtyULESkwWFbcpcVsk0cC0M6HllhlfJ24gmXQUllU1t4xS8n11FVL7erdPumujIlOHyFPsbLgNcdeuunWNSqSz/AA8dcB481iXU4hm8i2h5C5UCNDxrB+uZMhEFA8o8oPodZEh1UUFESGOO8oG4oJPBkNrrG8XATVwOoe4yBAyUtGumgt0E1xGPbulzrk31SpmQUKyXBNTf0E5RKfcEigEOpbO1lE9LX9U1vTlGaXtNUrH+/wBGnudncug9dAANalcJnqKunF8dk63YAyqMxKtYmPaqTMa5BdRZ6Rpvg5j3DpuJSmMYxtxQxgBM4CUBDSvtfOcSDe5HTS25ciVpXAxgpI8kgZmBiOFECmdIFMBjnSIC+9qcpN8CGMURIJDmsOYXLrb6qdycuxdpR84/RlUpSlaKKjkTtV4mn4tlOwUfkqSjZBum7ZvGmLrnWQcoKFAyaqahY8SnIYogYDAIgICAhVjqU7Jv4rGG/wBH9vfu5CgHSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1fKe0vi/y1g0essgRn0pIM4tu4lMc3Ewa+VOlyN26Z3DhiRJLfWVTIAnOUu8cOvrqsVKtpb8HUR+kCxP96ougKrSlKAUpSgFKUoBSlKAUpSgFKUoBSlKA+DCAdVcFMOogP1VOcjZekcfXHBW6hiG8roG41vJGTyGXiSoC6BJdYyBvLHqChTAi2UUE25uaaABhMO7WMWjtW2Hd8pPxkbAyyY29cDa2nSgyESuYHa8gZiQTN271RygTlSmNq4SSExAExQMPVWFDaWbsu6Xu0lvmwc0pv58sy29Wo6D/AF9VA69B0qGTu1pYNv3df9oOIGUXcY4i15eYUSkogDmRSbJLmFJqd6V3uiVdMoKnQIjv6gKgeuu1EbTUPdFuQ07ZWObnup5NIunicXByMG9VSaILcidwd0SQFiJRV9ApCOTqiO8AE9BTcirTSqWDSa5Ob9k3wSbdrhqMd8dbfVdXGJax0+ynVUWcbV2M0FXAFazyiCdopXkg48hBNN01OVU3kxOUOUSugIiocUVAIO6U4gI7im56eLtoi0csT93wUDHOmgWW7WZyLh1JxagAokuqibeQbu1XLcBFBQxRcoo7xQ1DXr0tTVP4tzfROH6kV1K4euBVBMPVoXX/AB9VBAR+rXWpPD50fvwskJHF8+xSvtmkvHSYPGSsek4UaquU2qogsDsD8kiImMVqZMoj98IAI1mtg3ghfVmQt4JNfJAlmabkzcT74oKCH3RITaBqJD7xRHQNd31BWoalPKz5/Py3qZtKy3qem/5ue5mT1PLyzpYFjXUeypcl1vZlKPbyizaCs+YmuQarqLpoqKnYtViJ752rgCgYQMPJGHTTrqh1Kbc/GnyH+j+zf3jcdU0Oktjv2byr4T3Vw6nSWx37N5V8J7q4dVWpQEp6S2O/ZvKvhPdXDqdJbHfs3lXwnurh1ValASnpLY79m8q+E91cOp0lsd+zeVfCe6uHVVqUBKektjv2byr4T3Vw6nSWx37N5V8J7q4dVWpQEp6S2O/ZvKvhPdXDqdJbHfs3lXwnurh1ValASnpLY79m8q+E91cOp0lsd+zeVfCe6uHVVqUBKektjv2byr4T3Vw6nSWx37N5V8J7q4dVWpQESu3aOx85tSaQSt7KJTKRzkgCfFd0EKAikYOsxo8AKH5xEAD66/LYhVKpsi4jEu/1WowL6RRKOoJgA9Q/V1dQ+oQ6w6qrF6/0Nnv7MdfsjVK9iL8UTEX90o/9kFAW6lKUApSlAKUpQCtd9uj8D0F+kC0f3w2rYitd9uj8D0F+kC0f3w2oDYilKUApSlAKUpQCsCvHEUBexbv8vk5Rqe87eQtp6dqokAoN0TOjEUR30zACurxXUTgcvok9HqHezz89c1GpsJgkzrBss9k4OceZwvxaVhmztiq+M3hAUkmjlVFRRu4IWPBMCALdMAMiRJQA19MRHUP2sfBjazGNqxz3It2XMjZS/KQgSpY8gt0wYqMyoCLVohvkBJUwgJ9T7wAInENQGoDrQPzjUpilNL5dv3bfV72Zaly/nz8luRK5DAcO8uhzLlvm628HIyyE4/tZJVoMW7fJCmYqphO3M6IAqIpKGSTcESMYgiYggdQD+JdGyTjW6k2p15S4WLpshOtxds3CBVViSguRUBTfRMU/ImeOBQ1L6HKG13wMcDW7Qfq+uudRAftAaJNQllhwtFuluCsrFxbbzx43n3vxd8SZz2Mrje2UwgefchcsxFzkdMoyU+Rqior5O8SWMifyJuikACmQ5CiVLUBMAjrpXiTWBJZdxdLpvkielwvWWjXkkylgYptmiDdwgYwNhbMyKicG6AIkBRQwD1GMIm1MNn0AfXXyBg19ENaK11vnrCT9Elv6kan5zfu24wP1pSlaNCtc8JXdlnGuGLBx3O7K+Sl5K1bYi4V4qzlLYMgou2aJoqGTMaXKYSCYgiAiUo6aagHqrYylASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmsSyPcWUMoRMJabPZtyBC63ha0o4kJSSt7yVq1YzjJ64UODeUVVHRFspoBEzGE2gaddbBUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAx+4LSjrjlbdlnq7kitsyZ5VoVISgU6pmjhqJVAEoiJdx0oOgCA7wFHXQBAZ0fZ1KaBlLbTzDfSLB5Mln49IicQIwzwsiL/ebGMwETgKwjqVyK4bvUGnrqw6ddcgGnXrXPZTc7r9bOeahQ8hL+fOLI4ls6lMjdEbKZgvqVjb0aqJTDFynEETVXO0RbGdlMixIoRUSIEHdKcEt4REE9OoMjvrEwXjOM7nhL/uiy5po0VjzP4EzI53LVQxTCkom9bOEhADkAxTgQFCiJgAwAYwDQdfr11r5KbU2gj6quymkt1lyiI5RblbCxISnj/f3U8743IxceytjC5bVdWk6PMNWTiMiotBRs5Jy7MkeK4JKIqHIY3KHI6XTVMfe3yKGAQ9I2uS2ZiQLOQnI4Mg3NMQsyu8cJxMimwBvHGdOFV1uQOg1SXEBOsfTllVdA00+2qEA6+quBHeAS69f20rpWkTVV05njKh9YWOIpmmIyiN9rq5FLOwHcEC/tC75PJc4EzalvtYH6KZ+QHiFyIlApxKK7I7lDlxImKpklCGHcIXUQTLVBxfajmxsewFqPlk1nccyIR2okYRTO4H0ljEEQAd0VDGENQDq06grKxEBAevq/qrjXrENOsK06qm5bxc922+7f0MpKmFTbLskl2S+p+tRK4HOQLGz5ct6RGGrqvKFuC0Lfi0HME9h0+QdMnswosmqR8+bH+8ftxKJQMUdTBqAhpVtpVNkq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlARK7swZBXtSaSPsr5SRKeOclMoeRtcSkAUjekO7MCOgevqAR+wBr8tiE5j7IuIxMkcn/ACTYBobd10BMAAeoR6h9YfXoPXoPVVYvX+hs9/Zjr9kapXsRfiiYi/ulH/sgoC3UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbBiG56g9f5656hEOvSvkv1j9da23pg69LuuZZwgieL3MgrXNGypHCYiz3LdK3bOhIVQDHKDwhSGS9ZybwGDkzCI829mqMkp9aVHOG2lnEcUx7x6P0lJdehsoYPtD/AB1rko6h6I1pvjHCd6qZAgZ/IGA0DvpNKXZXU4nUoWVi2jB04kV+SYLeUmfInP5YVJRPkRbqpnOByEOJlKzGxdmKAtMLfYscPWrGMV7xudzcKDWOYppOohwSWSZEXIQNF0uRdoJlSEDbhFN0SlADAG6k1PXunHZq6Znd09VPpg+hsqPWOn+Vc6D/AArV23MHuMMMrfufHuCY0XsXfM9JScbbacYxeu4xc0oiwMQyiiKCgJpO2+6moqQSJiYpQAxdwcZlsU5Gt6wLim7qtdqEQojCS0/DuJdomm9jkZWSfSEeqsooVD0G7pMFAVOVurodMVBTMY1YqilbSwlTNomJfJYtrdvsahzHOOMT6uLJ71lc2WuTIPNy74u1j2NdcgSV5MgSkfHguxbKHOIARdQDgZPQpFFBOJdwpSAAmA6iRFMxKbeHeL1gNaYxFo5WueasHK+IMJRNuWVbCLd/bMQrdCTZ2VlILqHkASaIpqtTFVaKobiJnCJEVE9CCcoFrLrHxLcjHJMDLPMLmhbni5yRfXDkUHMebnAxUI5Km330lherAflWo8g4RIijyAAQR5FHe3TS1VFVnNSc4qGkuEYvfiknEvLdnVTdQo4uHhnklhEvGDaAwB1749VcagAfYFakzmBnbzKOYrin8Q3lKkvJmqyaSUOnapAcNFGDJAxEXLhQkgVbeSWAUXB/JDFA28Q29obqo7MN6ZAaY7j5+yLNsuPtyMmm5tLXYGdRYKSTVRsoySaOxbx8kdFI6guUBXSIpviBA3gIGKJr+7m20k3/AJZTbXNQlk5a5O1eVVReG0uOF+Tn07bgDqYNQ9EfqH11yGodQ/8A4600tvAVzQrDIAq4cm3bqbuk8pKtHCFsItrlivpZwsLRBdscjpcDoKpnMlJn3DbnI7xCHOFe68xXkgtrXdBY2wgxtePvCPhoVGAfTjZu2Yx4P5E8gmodqK4N95s43QK3IsRMzgoJgcqZtJLej2ovZRzjHcpcNxaG2oia1Fbpy38p9bcnKSbdltcYRD7311zoXXerVyx7ZzZZa1lNblxHJypoOAmbQOvDTse8Sbtzu2RmLlRV2s1VVTBuhunMCPKidIw8kG8XXybexNNQ974/m5/ZccyclY1pxiLa4Y40CCq8sVgKChXLlV2m75JAuqSZCFOmY6plBAeTSMGtrNq3rE1Zb4ppcb6km1EvN7pY+k2z3S3fcpScm3IbwD6tK4EB16grSqJwpnSPsS4rXyPhuIutlcM3A3fJRcXPtpNKQkCv0VJZIUpEjRJMFU0yqFREyiQCVQOVMJgAeJ7CWfX8QwjcdYkh7ZgoWafXjb8FI3Qmw+hXxTIFYt0ys03SOm8m+WO2IYrfR8UoLAJTAClPaiq1+eCUx3cb9m8bSNY2X0xmPyndOcM3brWjZ8wnbF8YExret03jlR7NT9nw0pIufOncyfLul2SSiqm4R+Uhd45zDoUAKGugAAdVbExbl08jmrt9HqsHKyKaqzRRQhzNziUBMmJiCJTCURENSiIDp1CIVN9k78VjDf6P7e/dyFbwInKkdGnHftJlXxYuriNOjTjv2kyr4sXVxGqtShSU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAhEHZTLG+0jacFbdyXqvGzlkXO7es5u8ZeZQOu2fwRUFSpv3KxUzkK6cFAxAKOipgHWrvUpuP8AGnx5+j+8v3jblVagPzERAdda4EolANB0+2ulKoKuY52gknqooicpNR01MJRAK1pwVijKmH7ksxi9tF2/teIsskejyD9qdaLfPV2AvGpwVXDfRRUbuFwOmJgBNQUkyjyaZTYXmr2MOPSp+9KW7zKck43C2lf4vrhw5xtGI9eoDXOvX97r/jWuWUcZZdDNMrlTFsc2B8+g4y1wcruEilBosd75QvumNqJmqp2TgAENTlKqQmomEKwC4sA5vjrLtfH+NLDiEo6xZieuSKPI3IDACvvpdZWJEnIpLipo2MoKiSgJEMDkoCoUxTgBPDa3x7t+kRk6nszaSxu+TZeuO5XdmblgUer83rrnXQdP/wDhrVrIGzPE3K6yjeMBgu1I+4busRBtHuDx8f5SE04+k/LSnVKIDyhyuG5VVd8CqhoG+YCjp5sRs/ZQttvPw0BbcVFASFnmbM9v8lDxCyjlSLVTRYNiLKLRyaxG7gh9TGEi/LqgYQOnrHNNey9zc4qUnaVySW+bJwRQ42d6W6zi99033Rdo21ECj1j1B9dcgGhtANWqjOy7ntCRLcuMtk+StyHdxM1DDbUZIwjZdu5cBHmTdnQI8BmiiYWqpTAgsdTUpTimJlDbvTSsPOUDj67MKQ2Jl357jcxjdSecTbFrCrR4R0c0fpioRVR8mcxGzpMpgZG0ExTaCHVROpyohxbi5aibwoiqdzwlMO0PnPBJJ+8qOHE23L9Yb32fVUh2gI9WensRWitOXBGxs/e67SSCEnHkSu5QTt6YclSM4ZqpLATlm6JxKBwARTLrrXrbP0Rfds4vi7RyJCIMJO3jKxaIt5T6QSXYpGEGqhVxImc/3HkyGMommcTkMIkABCutmT8ImCdfb95/utPV0aSdsPnyMsCUucfnzfniOjTjv2kyr4sXVxGnRpx37SZV8WLq4jVWpQ0Sno0479pMq+LF1cRp0acd+0mVfFi6uI1VqUBKejTjv2kyr4sXVxGnRpx37SZV8WLq4jVWpQEp6NOO/aTKvixdXEadGnHftJlXxYuriNValASno0479pMq+LF1cRp0acd+0mVfFi6uI1VqUBKejTjv2kyr4sXVxGnRpx37SZV8WLq4jVWpQESu3Zxx82tSaXSuHKJjJxzk4AfKl0HKIgkYesppAQMH5hAQH66/LYhSKnsi4jAu/wBdqMDekYTDqKYCPWP1dfUHqAOoOqqxev8AQ2e/sx1+yNUr2IvxRMRf3Sj/ANkFAW6lKUApSlAKUpQCtd9uj8D0F+kC0f3w2rYitadv51IMsGRruKZt3TlG+rXUTRcODIJnOWUQEpROUhxKAmAoCIFHQBEdDCG6IGy1Kgfni2juxLG/iQ/4JTzxbR3YljfxIf8ABKAvlKgfni2juxLG/iQ/4JTzxbR3YljfxIf8EoC+UqB+eLaO7Esb+JD/AIJTzxbR3YljfxIf8EoC+UqB+eLaO7Esb+JD/glPPFtHdiWN/Eh/wSgL5SoH54to7sSxv4kP+CU88W0d2JY38SH/AASgL5SoH54to7sSxv4kP+CU88W0d2JY38SH/BKAvlKgfni2juxLG/iQ/wCCU88W0d2JY38SH/BKAvlKgfni2juxLG/iQ/4JTzxbR3YljfxIf8EoC+VKuidssd2nFXwbHfJrGPPFtHdiWN/Eh/wSnni2juxLG/iQ/wCCUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msY88W0d2JY38SH/BKeeLaO7Esb+JD/AIJQGT9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yaxjzxbR3YljfxIf8Ep54to7sSxv4kP8AglAZP0Ttlju04q+DY75NOidssd2nFXwbHfJrGPPFtHdiWN/Eh/wSnni2juxLG/iQ/wCCUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msY88W0d2JY38SH/BKeeLaO7Esb+JD/AIJQGT9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yaxjzxbR3YljfxIf8Ep54to7sSxv4kP8AglAZP0Ttlju04q+DY75NOidssd2nFXwbHfJrGPPFtHdiWN/Eh/wSnni2juxLG/iQ/wCCUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msY88W0d2JY38SH/BKeeLaO7Esb+JD/AIJQGT9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yaxjzxbR3YljfxIf8Ep54to7sSxv4kP8AglAZP0Ttlju04q+DY75NOidssd2nFXwbHfJrGPPFtHdiWN/Eh/wSnni2juxLG/iQ/wCCUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msa87+0TyYD5lscioJh3i+cV9oAdWggP0L1j6+rTq0DrHXq+fPFtHdiWN/Eh/wSgMn6J2yx3acVfBsd8mnRO2WO7Tir4Njvk1jHni2juxLG/iQ/4JTzxbR3YljfxIf8EoDJ+idssd2nFXwbHfJp0Ttlju04q+DY75NYx54to7sSxv4kP+CU88W0d2JY38SH/BKAyfonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TWMeeLaO7Esb+JD/glPPFtHdiWN/Eh/wSgMn6J2yx3acVfBsd8mnRO2WO7Tir4Njvk1jHni2juxLG/iQ/4JTzxbR3YljfxIf8EoDJ+idssd2nFXwbHfJp0Ttlju04q+DY75NYx54to7sSxv4kP+CU88W0d2JY38SH/BKAollYQwvjWVVncdYjsu1ZJdAzRZ5CQDRiuogYxTGSMoimUwkExCGEojpqQo/UFZxUD88W0d2JY38SH/BKeeLaO7Esb+JD/glAXylQPzxbR3YljfxIf8Ep54to7sSxv4kP+CUBfKVA/PFtHdiWN/Eh/wAEp54to7sSxv4kP+CUBfKVA/PFtHdiWN/Eh/wSnni2juxLG/iQ/wCCUBfKVA/PFtHdiWN/Eh/wSnni2juxLG/iQ/4JQF8rG71x7YOSYtODyNZEBdUag4K7TZzcYi+QTXKUxSqlTWKYoHApzlAwBrocwfWNSfzxbR3YljfxIf8ABKeeLaO7Esb+JD/glAZP0Ttlju04q+DY75NOidssd2nFXwbHfJrGPPFtHdiWN/Eh/wAEp54to7sSxv4kP+CUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msY88W0d2JY38SH/AASnni2juxLG/iQ/4JQGT9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yaxjzxbR3YljfxIf8ABKeeLaO7Esb+JD/glAZP0Ttlju04q+DY75NOidssd2nFXwbHfJrGPPFtHdiWN/Eh/wAEp54to7sSxv4kP+CUBk/RO2WO7Tir4Njvk06J2yx3acVfBsd8msY88W0d2JY38SH/AASnni2juxLG/iQ/4JQGT9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yaxjzxbR3YljfxIf8ABKeeLaO7Esb+JD/glAd+7dlbZga2pNOW2zji5FVKPcnTUJZ8cUxDAkYQEBBHUBAfrr8tiBMiWyJiMqSZCFG1GBtChoGopgIj/WIiIj+ca8C68u7RCtrTCTjDGOk0jx7gDnJkR8YxSimbUQKMKGo6fVqH9YV7+xCKvRGxHyhSAPNRh1FNqGnJhoPqDr001D6h6uv10BcqUpQClKUApSlAK1u2+/wGRn9+bV/ezetka1t294qMmsJREbMR7Z80cX3aqKzdyiVVNQh5ZuQ5TFMAgIGKYxRAeoQMID1DQGWUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51aq50wteN4ZQu6ahMUDLPpuDgWFr3YDtigNtv27pydZ3yiiwO0twFUT/AHBI/Kbm4PVW3I7J+yyP/wA2rFfwbHfJr56KOy1rp0asV/B0d8mphUqtzn5+lyp+V07/AMmn+Ro1dOF9pOYPkWeLjuM5TJ8JNxsgijcKBne8XX6I8oTOUiCZk0SCh9yXVKPLbxtwAEa7i+CbxPd6NyssBnZY0LMM1X2MAcxAA/VTj10jyPkxXHkAfdlG/wByFbU/IAoYAMBdd2R2UNloOvo14r0/ubHfJr6DZQ2Wu7Visf8A2Ojvk0UU0qlZJLonK+doaTG1Lb37X9SSfol7YNo0sbYHyPGHx3Ms8cLOJeBnHzxjFSX0VIwFvxLyR5UrU/KuCuEXLZIqRk1mJTgUUgTDlCV7Wc8L3heGUbumoTE4y7+bg4Fha92g7YIDbb9u6cnWdcoosDtLcBVE/wBwSPym5uD1Vtx0UNlvXQdmrFYfnCzo75NOihssiGobNeKx/wDY2O+TVVUKlfwuV7Y49cZvMk/i/wA0ejnDDHpFog1bxLYWdLdzm9ybc9lxrKNvcZFGeMjOkcO000lNYo7hAEypkMkiQUPuCywDy2ogUAGpXM7HF/rWvM3GrDorykncih17fiGUcm5exw3F5aLl2u7XO0fLA2KHIkWIQpCKCmcp9RCt+Oihst92rFYf1WdHdf8A9xrnon7LX17NeLPg6O+TWbJUJfu2XKZ/TlgWfxT+85fZr8/RZSnpW42db1XyZAXpB4xbR8HBo2mmki6bRLaaQBq9dHdi2VZqg1a6b6R10k09xdNQxExIYNK/Zlgu/mL2Bc3riEb5g2x7sAkB9IMShHPnsyo5ZyW8ssUobzc27yiYmXR11KTeEQrc0dlTZh3QSNs34tFMphMUg2fHaAI6aiAcj6x0D/YFOifstgPXs1Yr+DY75Nb2vMqlvqq61RPtbNb8Ijv2pX8qaXvffyNI7iwVn+bseIsqHsuMQPAStzXS1dSE+REqMstKrqxayIpJrioomkc6glUKmQQWKAqFMBgDLc444zZeN549zHZVmkC57Mttw9TYLSDciYSirhlyrA5+U0EFG3lqfKFESBoHpdYa7XdFHZb016NeK9Pt5mx3yadFDZcENOjbize/udHfJrmlsqmHdOU+MNez/ppnBzW52pVnMrfLVTXKV0lxjbQtxsrZCj4BjDTVlyVxt+fprklzsDQrpw95aATRcOioyhham3pAVfQULqAamIUNCGrI3+B70eXzNv4DCZoWTfXixmYy7vKotAWMIlGtkl4/VBczgeU5JdvyAJ8h923t4AABrdMdk/ZaAPxasV6/3Ojvk1wGyfstD/8ANqxX8Gx3yaVpVysLJdEqV/4r1WDgtNbpSTvH/wBv/Z+hprYmHsi2U+tqVvTCi18O4qzLZZQgpykeka2JBiQ3liRVFVymIZQ4ENyiG+CmgJnECddZjsw46zRjW5psmQLaiWkbdjBGcfuI6Z8tLzgFQwOzqFOkkYh1iHTESk5VMvk//ODvAA7MG2UNlrr/APBrxWGn18zY75NchsobLWo67NWK9P7nR3ya7PSN1Ot5tvu236ueaTcxfnC2UuS/lSS9FHV7zo0r0eidssd2nFXwbHfJp0Ttlju04q+DY75NYNHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAedSvR6J2yx3acVfBsd8mnRO2WO7Tir4Njvk0B51K9HonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TQHnUr0eidssd2nFXwbHfJp0Ttlju04q+DY75NAYzd39FZr+z3P7M1d3Yi/FExF/dKP/AGQVzduytswNbUmnLbZxxciqlHuTpqEs+OKYhgSMICAgjqAgP11+WxAmRLZExGVJMhCjajA2hQ0DUUwER/rERER/ONAXKlKUApSlAKUpQCtd9uj8D0F+kC0f3w2rYitd9uj8D0F+kC0f3w2oDYilKUB+Rt76h6q+gHQPSqLuM43cxvuRjXWPowbOjbnZ2mrMI3Ac0gV26QbHSVFiZqVPkeVdpJmMDkxw1E24IAIB4Ztp65pbHV65As/G0c7NZwqyZWkrcB2RJS3vJ1F20m2VSaL68uVMwESMQA1IfVT0Q150VbdK0lODSfdJr0acYxfBOEPa2c/7/mmudtxsJpT/AFdPsqOPM6Tdv3hZ9iXhZDFF/NgH084iZk71pAiuoonG7x1GyJ1SulUVEgEU0905dNDB11xkbN94WPdc80jceRsvbVoRMfM3BIHuA7Z+k2cquCmFq08lMmuKZGxziB3CW96g6/XpKYjNtdVjf5lvRJT7J9Hh3LGOugdVcde9qPVUdhM43TJzsE6eY8YtrJuuTcxENLpToqyBlUiLGKo5ZC3KRFFTyZXdEjhU4byW+mTeOCfalc+xcLlWQx9IQi5YiOjVVlp9NbfSJJJIg6PHCkBdQV8jMVwA73WXeDQNNRy6kqdt4XfKFLndbfvSxaETVs526y4Ub7p4bmVr+unUbr19Vayy21rcMRBysg6x/aq0y3JELtLfj7yPIyiCMg5RSSCRZtGKrhspuOUlAK3SeFP6ZSnH0BU9Gb2sHlpHcoXXjorMyVoIXCkqWTXIkpIKpulSxhiuWqC6JzIs1jlOoiU2qahTppmAoH2qW3hnHWJj5nbFwTaUTOU9LX5X7XwNiN4PrCg6G66hcZtFzbR2ExkCyIqBs127nmbCaa3CZ4sU0WZyKpnbZRqiDcp0mbhQopqraCUCm01Aa89baudR9lWvdVwY1cRDyQuNSCuWNdSQApbySaKrhV2Y/JaLEK3Imvu6E1TU111DQYnK7Pkm4Te5Ti3hnBXaz4rm0pcb7bjYUfXoA1wBi66a61r1d+1Y+gj30a38eFmULWeQrKMWK/dCEuZ8/WYKmBJqycLlBFw2XIAJJrmU3PRKGoV8Tm1e+tI7pG7MclZGStBC4UVSyS6aSsgqm6VLGGK6aIOETmRZrHKdREptU1CmTIYCgdTUqlbfHWNr29bY2LV5Xf58/XBGxA69QgXX/GuQAagjbPGWWz64Yy4sTWog7ipltbTAjC9HLkHko4QbOEgUMpGIgi2BF1vKKhyhyikYpEVBEutCxrfc/dak9DXharSAuC23ybJ82YyYyDM4KIJrpKoODIonOUU1SgIHSTMU5ThoJd05lLm6+WT7w04xhzgR+Vw8f735WanCVGJnlQfH2WNpDJVg21kaDwrjZCNuqHZTbNJ3kd+VdNByiRZMqhSwZigcCnABADGDXXQR9dXipTsm/isYb/R/b37uQrRRzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtSgJTzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtSgJTzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAq8i4cp57shKKl71xDYCMK9uCFgnS0Xf7126Q+kZJuxIqRFSHRIpuHdFOJRVJqUo6DrpVtqVbS34Ooj9IFif71RdAVWlKUApSlAKUpQH5G3vqHqr6AdA9Kou4zjdzG+5GNdY+jBs6NudnaaswjcBzSBXbpBsdJUWJmpU+R5V2kmYwOTHDUTbggAgHhm2nrmlsdXrkCz8bRzs1nCrJlaStwHZElLe8nUXbSbZVJovry5UzARIxADUh9VPRDXnRVt0rSU4NJ90mvRpxjF8E4Q9rZz/AL/mmudtxsJpTT0dNKjjzOk3b94WfYl4WQxRfzYB9POImZO9aQIrqKJxu8dRsidUrpVFRIBFNPdOXTQwddfORs33fY91zzSNx5Gy1tWhEx8zcEge4Dtn6TZyq4KYWzTyUya4pkbHOIHcJb3qDr9ekpiM211WN/mW9ElPsn0eHcsghTcD74KjkFm+6JSdgnT3HrJtZN1yjiIhphKcFV+ZVIi5iKOWItykRRU8mV3RI4VOG8lvpk3jgn6sxmhOHt2/ZobfBVzZ8sSEYtAegUZZ6q3aHbJFMJPuRlVnqaIBofQdB69d0M7SfaezpWGMzUrY3wK/LVsv5j6Wd8LFOEdesBoGv1h/nUotrOyVyIQKqdrLNlJa1pCfcoLOtFWDlms3QXYnDc6zlVXUIY+oaCiPojr1YfF7UlxqtxvKaxlGs7FRfRsY8k29xncSLZd4xauSHFkLQhDolUeJJCYrgT+s4J6agDapupw/9nTj/qTX6NEUuOOHZP2afxmwwnDXSudQEd3WpRY2Wr1nrliIa9McR8C0uqKXmIByznxkFTIpCiJknqQt0gbr7jhIwAkdwnqVUOU9EgqYPKbX6cbYt6XAawiGuC15h8xYQQy+gyjJsZyIvgWBARSIKTF+YSiQ2hmpybw6gYdNNVbNWP6x0c5YxfBNkparU03X6T244ZYmx+hR6/roUpAERCtaLiz3czHJmSJBCx3riMxnAuypb8tJN2b5YGzV2Ou7Giy5U3KppgJnaqyZCHMREoKKb2VI7QU/A3OFmZNsFjCSyK++6PFTh5JmViaPeu03CSh2yCih96PXSMkZIm6OhgMcBCs7S+7WkeEbXTJ9rxijSTqeyruY6wvrBbRDUQ/7KadYjp1VEW+Z8svUYlsnh6ESlbsKDq3El7uMDY7MEjKqmfKkZmO1WTICQCmim5IJ1iAVUSgc5M8xnfbm/bZNKykEENJtHzuMkWJXQOk0XTZc6KvJLAUvKpCZMTEOJCGEpi7xCG1KG9ly01dY/OsPc7YmdpQqsng8s3jyTfIzalKVTQqUXPkrKnnTlMZ41xzas19CwEXOvXs7djmK/wDHnL9FNJJNGOdb+79HHMYxjF/5woAA6CNVepTbn40+Q/0f2b+8bjoBzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtSgJTzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtSgJTzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCJXbcO0+a1JoHWIMXESGPcgoYmR5E5gLyZtRAowYAI6fVqGv2hX5bEIq9EbEfKFIA81GHUU2oacmGg+oOvTTUPqHq6/XVYvX+hs9/Zjr9kapXsRfiiYi/ulH/sgoC3UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbEUpSgJjK7PWKpq6Ht4y0RLuH8k4F64RNccl5D5V5MDYHJGQOPJk1ypFKUqxEwUKIAYpgMADX4wezRgm12UvGWti2EgWtwQ54GVRiEhYkeszFEolVBES759DGAFR1VDeNocNRqoiAaa61xoUB/PWKVsqFbLpER2bXINurH5dP3SfNInF1bO2EL5uJa8LvxtDS8+r5Nycs7SE75p5OICj5K4EeUa7pg3vuJiamETDqIiI/vdmDMZ3vdRbxuaLknb4UmqC6BJ2QRYPE2yp1UCuWSaxWzkCHUOYAWSP6/sqg6krn0RrSURwc9d/Mn9um4nkJgvGlu3WF5RMLIJvk3Dl4g3Um36sc0cuN7l12zBRYWjdU/KK7yiSRDDyqvX90Pr1ujlhA12jkA+NIUbqNJDKjOiiIyQuBLuiAuteVFLcHc5He5Lc9Hc3eqqVul+quQAfqGspJNRlZcFZ+6XZBramc8eOKv0b7skRNlfCyaC7VKHuJJFRJFBumld8yQscki4TcJJsQB0AMCEVRSEpW3JFAEylAAKABXtS2BcWT1uyFrXDAO5dhLM2DB8MhLvXThwkyVOq233CqxlhORRU5uU398dfSMIAGlF9GnVp+aqrWXPrvK7uXiSVbZcwo7WklJK15CSTlfLOXayNwSLxon5WtyzoEGyzgyLYFj68oCJCAcpjEMAkMYo92J2cMG28CydtYyhYVs4XO6UZRqQtGYrHaqtDn8mSEqIGM3WUTMIE9IBAR1EpRCljoPVXPUH1VYinZWER03cuAlzM3meu/mTZbZ6xKrbpLVSt100YEYxccmLGYfNHCaMcuouz3HCKxViKJqqqH5UpwUMJh3zGr9JbAmLJ23X9rXDb7uXYSrNgwejIS7104cJM1Tqtt9dRYywnIoqc3Kb++OvpGEADSidXrEK56vVpS8t73PXfz4kSSSW5R03cjDp3FFhXKxnIyYg1FErikEJZ+dJ6ugt5agmgmi4RWTOVRuqQrZDdOiYglFMDAIGERHt2PYFs46jF4q1mr0qbtyZ46XfyTmQduVjFKUVFnLpRRZUwEIQgCc5tCkIUNClAAyfqEOunV9dRWw5dLW9F2RXeJyOa19xREbUuL8W2bjTzYYrk+aVvx0F5b5w5FHyryVsmjyvJ/QZtze5Pe3d42mumo6a1sFStAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtSgJTzj2p+xvFXiVI8Cpzj2p+xvFXiVI8CqrUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKnOPan7G8VeJUjwKqtX5HUTRTMoocpSEATGMI6AAB6xEaAl3OPan7G8VeJUjwKnOPan7G8VeJUjwKqGFz24Ia/T0f8ArJP405zW5+Xo/wDWSfxoCec49qfsbxV4lSPAqc49qfsbxV4lSPAqoQXJbxhApJxgJjiBSgDgmoiI6AHr+2vUoCU849qfsbxV4lSPAqc49qfsbxV4lSPAqq1KAlPOPan7G8VeJUjwKsdvSD2kcksoe25zHmNYSOb3Pb008fNL6fvl00I6XaP1CpoGh0SqHOVqJAAVSBqcBEeqrxSgFKUoBSlKAUpSgJjK7PWKpq6Ht4y0RLuH8k4F64RNccl5D5V5MDYHJGQOPJk1ypFKUqxEwUKIAYpgMADX4wezRgm12UvGWti2EgWtwQ54GVRiEhYkeszFEolVBES759DGAFR1VDeNocNRqoiAaa61xoUB/PWKVsqFbLpER2bXINurH5dP3SfNInF1bO2EL5uJa8LvxtDS8+r5Nycs7SE75p5OICj5K4EeUa7pg3vuJiamETDqIiI/vdmDcZ3vdRbxuaLknb4UmqC6BZ2QRYPE2yp1UCuWSaxWzkCHUOYAWSP6/sqg6krn0fXWoiODnrv5k/t03E+g8FY0ty7AvOJhZBN8m4cvEG6k2/Vjmblxvcuu2YKLC0bqn5RXeUSSIYeVV6/uh9fPuLZrw9d05Jzt02u8l/pl2k+kIx9NP3EO7cJkTIRRWMOuLI5gKikGoo6+gA+vrqo9XroOn1VnZSae7DhdO3VJ80ittzOePHmSVbZZwWeJbwkbZi0EyZqPDt0LfmH0OVEjsSC5QL5Eslut1DJpmM3D7iJigbc1669BHZ3xG3ukLuTtt2LgrhN2VgeYfHiSOE2xWyaxY0ywsiqFRIQhTgiBi7oCAgPXVK3fXTd9VbwJ874k/sPB+OMbyX0taUZJJLptPIGwPZx+/SYtN4phbtE3KyhGiIiRPVNApCCCaYaaEKAfi7wDiN4s4XdWaiqo6jZSIVOLpfeFpIrHWeJ67+ob6iiggYPSIChykEpTCA0Yd3Tr9VcdX1eqs7uGHWZ7y+7ER1/KI7QuyJ1J4CxpLyVzSj5pPGNeDZVrNNU7nlEmLoqiBEDn8kI4BumqKSSZeVImVQN0BAwD11+ttYMxnajpF/Gw790/RfmkfL5WafSbxVcWp2uqrh2soqqQEFVCFTOYxCAcRKUBHWqBuj9lN381WLbOUR03cuBf79STobL2GEGQMW8LPICiqioycpXXLkdRoJEVImkyclcgsyRKRdYnItzppbqhi7ug6VQLStG37EgGlr2yxM1j2m+KZTrqLqHOc5jqKKKqmMoqoc5jHOocxjnMYxjCIiI17dcD+erId3JzSlKAVHbjtvNEBmecyLjq1rLuCNn7YhIVVKaud3Ertl2DuUWMYpUY50VQhyyJAARMUQFM3UOoDVipQEp5x7U/Y3irxKkeBU5x7U/Y3irxKkeBVVqUBKece1P2N4q8SpHgVOce1P2N4q8SpHgVValASnnHtT9jeKvEqR4FTnHtT9jeKvEqR4FVWpQEp5x7U/Y3irxKkeBU5x7U/Y3irxKkeBVVqUBKece1P2N4q8SpHgVOce1P2N4q8SpHgVValASnnHtT9jeKvEqR4FTnHtT9jeKvEqR4FVWpQEp5x7U/Y3irxKkeBU5x7U/Y3irxKkeBVVqUBErtuHafNak0DrEGLiJDHuQUMTI8icwF5M2ogUYMAEdPq1DX7Qr8tiEVeiNiPlCkAeajDqKbUNOTDQfUHXppqH1D1dfrqsXr/Q2e/sx1+yNUr2IvxRMRf3Sj/wBkFAW6lKUApSlAKUpQCtd9uj8D0F+kC0f3w2rYitd9uj8D0F+kC0f3w2oDYilKUApSlAT3z+4LNcLy0vPRYn05HHcEdxnONn5W2MgBhXBRHlN8gpgQ4n1AN0Cm100GvVRyfjVe7XthI5CtpW54tEXT6FTlkDPmqIFKYVFW4H5QhAKcg7xigGhij9YVhuR8S3DeC+SVYx7Gp88bLZW6w5dRQvJuUTyBjHV3SDomIPEtBLvD6J/RDQNcRu/ZemLxkL+l5C+XBjTb9Z9b0QqRE8U1XPGtmhlnJCokcKmOVJdE6YrnS5JURAgH6y8m3Mf5W54qIXWW88OqRe29dnj2w9eBY7NyXjrI0a5mcfZAty549mqKLl3DSiD1FFQCgYSHOiYxSm3RAdBHXQQGvEY5/wAEytvyd2R+abDdQcIdJOSlELjZqNGR1TbqRVlgUEiYnHqKBhDUeoNa8ezLKyG9uy5b/wAgQ1rwclLwzOCbsIKVWkUjJNzuVAWWcLNWxhNvOjFKmCQgQCmHeMJ9Cx57s25uuS0IVlPxllMZS1IKEgGCMTdsk2NKpNH7NyqqtJIs0nDMd1nokVJNQSGWUNvhrTabr2WoXlvjEuqXbGIpsrra4Miv8xsrcMXd2ezxRsPMZhxHbtrxt9T+U7RjbbljFLHTLybbIsXgmKJigkuc4JqCJSmEN0w6gUR+quVMwYlRnIq2FspWklMTrVN9Fxx5tsDp82OUTEWQSE++qmYpTCBigICBREB6hrEbls/KYQuNZS1LbtxxOWc8Mu7jJi73yiBkzR7hoIBJnZrOHBwFcpuUVQAx9DCYQEdRwHH2zvkWxb7Yzp2kG8ZrwxWrw7G8JWMQYODuJFdVNOKSQM1fokF+VNIXByGICW8UpB0CmlbpnZUxh2st2MXwXMtN6VNrfn36YlxtPK2Lb9RI5sjJVrXEkq7MxIpFTLd2U7kqQqmRAUjmAVATKJxJ6wKAm00DWuYTKmMbkeOo63ci2zKO2Tw8c5bspZBdRF2QhznQOUhxEqpSJKmEg6GAEziIaFHSYWxs4O7csjHNoMrhflUtsFDzTlxPP36hVjwq7EwsTOjHFIhVFSmIkXkkylARKUB9EevbGIcpi5swl0QeP4lCyEyMUFYV24UWfNiRj5qUwgdumCBd9ymYrYBUBMBWEFTiIAN000baovCt/md59lCz2pyZilyqXhLvwVo9G3OC2YzRleKtoexslxakie4LTYqLTRoiPRZXbHyvlZxS5ZJMDtlDFByKQHE6ACYSimpumUTAqpssfZUxhHScXDyOR7YaP5xZdvGNV5dums/VRUFNYiBBOBlTEOAkMBQESmAQHQagtobL94uMcWZj6+UGMcS1X/lSjxtekncCwqEilWyLtoaQbk8jUSciismgT7inubxR16h7eOcH5usZBdnKtMdXEpdKhFrhfOnTogsVSSTp0AtEPJjAuQQcgchDqI8itvnAVQHSrpfIn93eMP8AN5fS6vMRKUYxqjzXqt+V/Wzy3NzdGwSV22sutENkbniVFbhQO6iCFepiaRRKQpzKNwA2qxAIchhMTUAAwD6hCvZL6XWNasONmvNYylizzC8LHQUx3DQMfFNHLB4uodVsTdkTJuyKpA2K5IcyA6t3GqaaY6EMIgG05QAB1Aa00sU8G10Ts+qyyMpuYyhd3ium/M/StXdmXZl2b57ZuxROTuz7jaRkpGyIJ28eO7UYLLuV1GCJlFVFDJCY5zGETCYREREREa2irV3Zl2mtm+B2bsUQc7tBY2jpKOsiCaPGbu62CK7ZdNgiVRJRMyoGIcpgEolEAEBAQGqbKZ0T9loevo1Yr+Do75NTvN2AMA2Fa0BdlnYRx/bsuwv6yTISUZbTJm5bga5Y0hxIsmmUxNSGOUdBDUphAeoRqidLDZYDq6S2KvjKO+dU2z1nvAuQrKh7NsbOGP56clL4stNpHRlzMnTlYQuSOMbcSSUMc26QpjDoA6FKI+oBrFbqVLdN2si0w2k8C6p5Ix4vCw9xo37bykTcLlJlDvySaItpFwoIlTSbqgbdWOYSmApSCIiJR0DqrzW+bMNO3cmxa5dstZzBOU2coinPNTKMHCi3IkSXKCmqRzK/cwKbQRP6IBr1VD7X2U78hIyBt15csMrDWuvb0nFR5FFdxtIJu2S0qoA8mGoG8jXMgIhqJn7gDbgaDXbi9m28nUHctlXZDQjiFm7tSmlTr3lKSiD1j9NHeqofRrluDZgIoKGIJW5jFUP9+PqMFqcVWutqOk0qd2dT4pK0ylnJt/Xe8Oy4ObxDK/cufMG2VNntq8s02LBS6IlA7CTuFm1cl3gAQAUlFAMGoCGnV9dZIpeNpIGlyOLqiEzW8QisuUz5IBjiHJyhDONTfcQMT0wE+mpesOqo5jzBeQbZfxi9y3NHzAxd/ObhK8OqoLlzGfQSsY35X7mAC760jKaaEHQ5gNqIErC1tmbOvK33Mr3bYj55kGFmWEi2IzeMzkVWOc8aCjzfVByRsU4twMDZEwJHEdFDAACpaezOalvc4TiMcZXNEvFsZSjq03PBJPjJtrXQn/8A9ByP/wDKLf8A3g10rTd3e8hEXN8QUPES5jHBZpFSqsi2IUDDuiVdVu3MYRLoIgKRdBEQ1HTUe7NlOeGfpkIJjGaqgUpQ1ER3B6gD660VOTtNv/F0v+oX/sr9a8dC4ocEEymdiAgQAEBTP9n9Vfrzjhf/ANt/+5n/AIUKfNx9cI6H/wA0P/vgrGpXN2GoK7wsGby9Zcfc5lUkAhHU80SfioqBTJk8nMoCm8cDFEobuogYNNdQr15qajncYs1armVWV3SEIVI4iYRMHV6q8i5bLlpfIsPdrZdqVmwt2aiFSHOYFRWdrMDpGKAFENwAaKbwiICAiTQB1HTlW6qVNKmz9E2u7UdTVKTcM+oTM2ILkgX11W7lez5WFjF02z2SZzjVZq2VOYpSJqqkOJCHMJygBTCAiJgAPWFZoHX6W7/nWpDHZhzBJ4ct7DEs4tKGjo9cp5k8lcUzeKEokmxBBNMEHXkZ2yYq6LAikuVNIyKYlA28YK2QxpGXhB2FBQl+SLKRuCPZptZB6zE/JOlEw3eXADgBiicAA5ijrumMIAJgABHq6VLvg1HFRjwvk74cTnLtxmeDmy42vKsZXUd2qYmKnsTtIKdjGsjGSF72S0eM3aJVkHKClzxhVElEzAJTkMURKJRAQEBEBqxVHdqmWioHE7SdnZNrHRkfe9ku3jx2sVFBsgnc8YZRVRQwgUhClATCYRAAABEaGju9E7ZY7tOKvg2O+TTonbLHdpxV8Gx3yadLHZY7y2KvjKO+dTpY7LHeWxV8ZR3zqAwHZxzLjeI2aceW62vm2Xt027jCEkXlvEnWST9NMkU3PqoRVUvIlEDJ/dFN0gAcoiIAOtVxllaxE3ry2Z697SYXRCRxJGehk55BVWKSEhDHUVA24oVEOUJoqdMgCBijoXeAK1r2ctnyQldlQJFpLrkl8h2BDoRiak8/+jUUFLfjkCmVZ7wtyLco3MIqkRMpuCAb4gIlDP7nwtlOemckM4JGAty3Lyhn7UzYlwOHqclJKkSTQfKtjsyBHnBMhwU8nWVKoJgE5DHDlAzTeJ3S+DiY9YeLlKLNtSqzbWThcVv9OFne6SLOpf1ip3glj1S9IJK6V2wvEoM0ij9IHbhr92K33uUEnom9IC6dQ9fVXoQk9C3RFIT1tTTKUjHYCZu8YuCLoLAAiURIoQRKYAEBDqH1gNQ668WZtKrekBj8tjIM7nfOpVlc0o4cGlIx04Yg13iNioCQ6iPWKa3Lh9yAqIpgH3Sso2e8V3hh2EmrRnJe2X0QeR8uhQg45xHpNSKkAV0fJll3AkLywHVAQXPvCsfqIAAFKJqU1Wsn1zXTfg4bVmiVWsr3fbJ8ZtbKYd0yvUpStGhSlKAUpSgFKUoCD5Yx9YOSdpHHEFkax4C6o1CyLwdps5uMRfIJrlf28UqpU1imKBwKc5QMAa6HMH1jWR9E7ZY7tOKvg2O+TWOZYyDYONtpHHE7ka+IC1Y1eyLwaJvJuTRYoKLmf28YqRVFjFKJxKQ5gKA66EMP1DWR9LHZY7y2KvjKO+dQE6zXs+YGsa2beumy8JWBATLK/wCyPJpGLtlk0dIb9zRpD7iqaZTl3iHMUdB6ymEB6hGr2heNouEV3LS6IhZFtI/RCyib1MxU33KAn5KYQNoVblDFJyY+lvGANNR0rX3P20JhW97HibaxlmvG9x3S7vezRjItndDRwo4WJcccppuInOoJQAgmMJSGEClMOnVXm2hszZysmBlI8t32LPuXryBuMRKweRJXc2weJrODuTcq61F0mmUp3BCl3TJkEG4gIhXNy3wtPJu8clLjNwlMh4Ssb/O7XSdxe7mzPh+y3KDG88rWfAuXDhRokjJzrVqdVcgEE6RSqHAROUFUhEodYcoTX74NeLtzRhywDlSvnLFm22cy6jYpZeeasxFZMiZzpgCqhfTKRZEwl9YAqQR6jBrGlMP57aTDy8WlvY4kJS5ms42lox9PvAYsCvRYlSBNQGBjPilTY6nKdNtvCoJQEADeHI7d2f7jtuwXdkozbB2bnTbUs3dKioQVGkaESVUVC7o7qpwjlhKUBMXU5NThqIg0e09naUOFPNtKpf7VecKsFg2RuKnF1L7ZPruxUXxRWIS+bJuUyHN67oSSM8KJ0PIpBFfligmkqIk3DDvBya6B9Q/1VUzeoxRH9kbwtJ06jGTa6ohVxNlXPGJEepGO9KjpywolA2qoE1DeEuu7r16VJrswzf7pK5Jyy5uJj7oWu8txQDlwooKKaJ41vHuE3GiYjqKQODFKUDBvgiIiGg6Y1dWzZkpS9bZuCwrotJhE4/aRLG2WEmwdLuwSb7xXg+VpqkK2FyicUD6oON4iZDBuGEdLo263S6rJxPCaZb5J23u9rXOUnF2k44tOEuEq84I2bpSlbKKiW0XadrXzc+FbXvW2ou4IV5f7nymOlGabtqvuWzOHJvpKAYht05SmDUOoxQEOsAq21Etou7LWsa58K3RetyxdvwrO/wBz5TIyjxNo1Q37ZnCE31VBKQu8cxShqPWYwAHWIUB7HRO2WO7Tir4Njvk06J2yx3acVfBsd8mnSx2WO8tir4yjvnU6WOyx3lsVfGUd86gHRO2WO7Tir4Njvk1jmJ8fWDjbaRyPBY5seAtWNXsiz3ajOEjEWKCi5n9wlMqZNEpSicSkIUTCGuhCh9QVkfSx2WO8tir4yjvnVjmJ8g2DknaRyPO45viAuqNQsiz2ijyEk0XyCa5X9wmMkZRExigcCnIYSiOuhyj9YUBeKUpQHjuLihGS7lm8mGSDhk1B65TUXKU6LfUwcscBH0U/QOG8PV6JuvqGvEncs4ttmLGdufJdrREb5Ymw8tfzLduh5UdIFSIcoc4F5QyRiqATXeEogYA0HWsVzViWdyI9hnNvSTZmRZNzBXGRdQxBdQLsUxdJpbpDfd9UEwII7oAB1esNaxPIWF8luRnZCxGcCE6+uhSeg5o9xOI1xB6xjVmVQCEZOE3Wooq77ZUOROTc1ETabmU3tXX95SjqnMuEmnlckcfkY24p2UuGoUlvPdFtkOqU9wxwCi9TjlQFyn6Ds4EEjc3X1KGBRMQIPpCBy6B1hX5I3jaTpFdy1umIVRayP0Qsom9SMVN/ygJ+SmEDaFW5QxScmPpbxgDTUdKi85ijMq11y6MRzNcwUjczO7yyLp+6QeEctmjYhWgtCoHIJDrMyCK4OAEhFTfcjiQN/D7T2bM9WLb8gwb3JYVzuX8hb9wqEMi8hCuZhg8SVdLrqavd47lJMoGWImQN9ImiIAIiGKNppbdr0ro1TL6PaXGE1+Iy2/SesuFuw2Xjm9zjbbq+qua86EWml4hmtcbBmykzolM7bMnh3SCSunpFTWOkkZQoD6jCmQR/6IeqvRrqaTk8W9f6Gz39mOv2RqlexF+KJiL+6Uf+yCqpev8AQ2e/sx1+yNUr2IvxRMRf3Sj/ANkFClupSlAKUpQClKUArXfbo/A9BfpAtH98Nq2IrXfbo/A9BfpAtH98NqA2IpSlAKUpQClKUBwHUFB6wrmugaXiiSqcGeTalklkDu02YrFBc6BDFKdUE9d4SFMchRNpoAmKA+sKk3gHfpSlUClKUApSlAKUpQClK19xRL7UuUMW2bkvzn4rjOdtvx075F5vJFbyXypsmtyXKfThd/d5Td3t0uumuga6UBsFSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8drp25cmaIDM8HjrIt02XcEbP2xNzSSsLbDuJXbLsHcWiUpjLSLoqhDlkTiIAUogKZesdRCgLFSlTzOd43VY9gFl7KUikZl7cFvwTZaUZqO2qH0jMM2J1TopqonU3COjHAoKk1MUNR01oCh0qU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqY4Zu2/p59f8AbeRpC35GSsy6E4RJ9CRS0cg5QUiI5+UxkFnLkxTgZ8cgiCogIEKOgddU6gFKlGSroyl507QxpjSdtWF+mrfnp169nYBzK/8AiLmLRTSSTRetdze+kTmMYxjf82UAANRGuebm1P2yYq8NZHjtAValSnm5tT9smKvDWR47Tm5tT9smKvDWR47QFWpUp5ubU/bJirw1keO05ubU/bJirw1keO0BVqVKebm1P2yYq8NZHjtObm1P2yYq8NZHjtAValSnm5tT9smKvDWR47XGNboyl507vxpkudtWa+hbfgZ1k9goBzFf+POZRFRJVNZ663936OIYpimL/wA4YBAdAGgKvSlTHM1239AvrAtvHMhb8dJXndCkIq+m4paRQbIJxEi/MYqCLlsYxxMxIQBFUAADmHQeqgKdSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gKtSpTzc2p+2TFXhrI8dpzc2p+2TFXhrI8doCrUqU83NqftkxV4ayPHac3NqftkxV4ayPHaAq1KlPNzan7ZMVeGsjx2nNzan7ZMVeGsjx2gM8vX+hs9/Zjr9kapXsRfiiYi/ulH/sgrm7be2ny2pNC6y/i46QR7kVCkxxIkMJeTNqAGGcEAHT69B0+wa/LYhBXojYj5QxBHmow6yl0DTkw0D1j16aaj9Y9fV6qAuVKUoBSlKAUpSgFa77dH4HoL9IFo/vhtWxFa77dH4HoL9IFo/vhtQGxFKUoBSlKAUpSgINnnIri17qiISYzGXFsK4jXT1rL+Ts1hlJFM6ZSMQB0koU4bpxNyCQFcLahyRy8mfXArSyvJSeRY6UY5aaSF6zD9/F3PYYR8cRaDjWhXhkFDAVEsgkCSgJCCjlZRFQXZ+TIXl0t3bIQDXX66CYNdA9dcaqG6NlOH5r88O2FothDlutpvDd7R73vKnKIS0xxlny85dlaqlv56HIyMw1thxcbnyWKW+gX7uTZoKsOVYN0kicsku6DkVSmXT8n3gOGtfm82mrtiLnlY4MhSz+7VGUwq4tT6Ph1mMB5OdXdAzRM5JkVEkEiL8qcFW7kqn3MSAqnye6Igb1a0LvCHpf/jrq4bfOr1ShcllnxTlvKt/T6TPfPLg7RBMN5Bcz81d8fa2by5YtiNjGbtvcf/FiotX5/KAVacvHIotlNCJoKbnJ8onympzCVRMCx20toe6nNqRTuO2jed8VLQES7u+5RZxK4WK7cLokU+6s2ybZLeKov6DsigoCgCqm8mBiju8Ih1D6woOnX+aphXtYq1uW1PeVhD8qviFZNfFZLOd03lS3aLGu9sZUuscSZHuS1cgkyKytpwctv3WLRssD1AGyKi6ggxIkg88nUOuX/RyEA/Jcl1qFOYcPls0zEZbt1uLC2kOfsXG2Xccu3uTySKU8netgjuTHl2zcjRfkvKFh9FPcDlNxQDmTEa24Aun3vV9tca9emvqqXdU8Ijo1Pdp75V28Sqyh759U49I3XslgRvZ9vpa7JW7o2Ky350bXiVGIxt1cmxNyjhVM4uWfLx6STVfkd1E+qaYGL5RunERLVppStt3IlAqU7Jv4rGG/0f29+7kKq1RK1NnO57HtWGsq1tqDKjKGt6Pbxcc28itlTkGqCZU0k988OY5t0hChqYRMOmoiI9dCltpUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBVaVKvM3kXvY5V922rwanmbyL3scq+7bV4NQFVpUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBVaVKvM3kXvY5V922rwanmbyL3scq+7bV4NQFVqU3H+NPjz9H95fvG3K58zeRe9jlX3bavBq7FpYafQV/M8i3Jl+9bzko6IfQjFKbRiEUGyDxZosuYpWDFsYxxMxbgAnMYAADaB160BTalW0t+DqI/SBYn+9UXVVrEcm49aZQtFS0nk9Kwv/GEbKN5GL5Dypq6YvUHrdQgOElUh0WbJ6gdMxRLqGnXQGXUqVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoBhv8ACLnb9IDP/dWBqq1g+McYp41JcSy16XBdMldUwE3JSU0VkVdRcrNqzKUpWbduiUhUWSIAAJ667wiI61nFASm4/wAafHn6P7y/eNuVVqnmQcSq3vdMDesTkm6rMmoCPkYtFzBJxqnLtXqjRRZNQj5o5J9+wbiUSgUwaGDUQHSvN8zeRe9jlX3bavBqAqtKlXmbyL3scq+7bV4NTzN5F72OVfdtq8GoCq0qVeZvIvexyr7ttXg1PM3kXvY5V922rwagKrSpV5m8i97HKvu21eDU8zeRe9jlX3bavBqAqtSm3Pxp8h/o/s3943HXPmbyL3scq+7bV4NXpY+xKrZF0z16y2SbqvOan4+Oi1nM6nGp8g1ZKO1EU0yMWjYn379wJhMBjDqUNQANKAodSrMn4RcE/pAef7qz1VWsHydjFPJRLdWRvS4LWkrVmBm42ShSsjLprmZumZimK8buETEMi9WAQFPXXdEBDSgM4pUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBVaVKvM3kXvY5V922rwanmbyL3scq+7bV4NQFVpUq8zeRe9jlX3bavBqeZvIvexyr7ttXg1AVWlSrzN5F72OVfdtq8Gp5m8i97HKvu21eDUBVaVKvM3kXvY5V922rwanmbyL3scq+7bV4NQGd3r/Q2e/sx1+yNUr2IvxRMRf3Sj/2QVzd2H8goWpNKn2qMpLFJHOTGTPHWuBTgCRvRHdhwHQfV1CA/YIV+WxCQxNkXEYGVOf8A5JsB1Nu66CmAgHUAdQeoPr0Dr1HroC5UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbEUpSgOPXTQKB6qwvLGRTYpst9fJ7Jn7lZxaSrl+jDHZAu2appHUUXEHbhApiFAmglIYxxEwaFHrEI3BUm3CMw3RANA6gGuRHq13esPz1I5HaDQio56tJYuvNvMsfogDwAmjDPTqSTxVo1TKoV4LXeE6ImMIrgUpTl697eKXzh2p7dWh1J6Kx1esuyi2yjq5FGKLE/N0qaqqapXIGdAK5yC3XESMvKTbqYGABBRLfzN3wccJiceUN7pW8zT5oi+frHq8N+Rbuv1gH9dPq1ENamWQc0t7HlY2LiseXXeDiSjHcyI2+DE3IMm5kSqKmB05QE+ouE90iQKHN16F9Wvl2BtM2HkzJ0hjG02jt0vHMUpE787+NIRRuq3brpqFaC68v5MxHSIcoZsUm8IlE2tKWq35ePo2n6pri00sGTaSU5W9Y+q6NPMsAiHWGlcj9XVU1fZuhywUdLQNo3FcEjLykhEx8KwI1K9cqsl1knJwMuum3TSL5Oc++osQBASFD0zlIPlhtGRLuOYLQGO70m5ZwV4eQg2LZr5dEkaLig5M4BVwRIwkWASFKgoqdbQTIlVIAmBMvZWPx9ksXgsyuyl/Ny5vJYvIro/7NaAI/11Ko7aDhZGdZsDWPdbaClXTphE3Mui1+jpJ0gRU50kylXF0nqDdfcUWQTTPyfonHfTE/lxe1Vj+Ysyy72aQ1wAle8u3h2scoi3K9YnVXKhyrpPlt0iRTqI7xiGOOi6QlAwHCiaeHD+pwp3Sw3GP9+W/B4bnuZaNTCGoBXOo6+v11KGu0Nb6802avLQuWPt6QdOmMddjojQIp64bkVOoQgEXM5TLut3G6osgmkfkvROYDpifCci7Qz11iV9kCFa3zYbZkdlIRr9e3WUiecaL74pGQbeUCIpCBQVWSUFB0VEDaFSOYpyzaUSr4etkr4N5J3ZqHtbL4+n5TacJs2bGABx9Y/wBdB1EPX66kc9nVlYzQrQ1v3TfCUDEt5C452EbMuQYtzkEwOViKOEjqCYiai3JNE1jlKAegG+mB6szdtXaJHDZQqiShQOQxesDAIagIf4VuqnFbrfPylHOmpNLip9umamN63nbqORO1Xiafi2U7BR+SpKNkG6btm8aYuudZBygoUDJqpqFjxKchiiBgMAiAgICFWOpTsm/isYb/AEf29+7kKpsBtLY6D/5OZV8J7q4dXwTaXxf5awZvWWQIz6TkGcWg4lMc3Ewa+UulyN26Z3DhiRJLfWVTIAnOUu8cOvrqriPqGpFtRPWsbi+PkX65EGza+rIWWVOOhU0y3PGCYwj9QAACNZbi7cIJS4RXDaaaa0HTe00qON9oorlsgZrh7IKj2WFNSAYC3YJrTbcxDqC4RMo7KkgQqaYnOR2o3VLvplFMDqEIb94faQsyTuKz7XWgrhjpC7jSjcpXjdIpYx2wUBJdq7EqogVQVB3CGT5RM46bpxA5BNYe1s57s8Jw4Z7nZ3sZ2lE5b8u/qt6urXK5p9elcbmv+FYDYOZbUyHF3PNRSL1lH2rKLxjp0+BIqS5U0U1/KkTEOfeQOksQ5TG3REB1EodWvhQ+0jbNzWLCXhadm3VMP7hduWDK20UGqEryzcT8uCoOF026IEKQTiZRYpRAyYFExlCFNlVUtStyfSrB9TTUY8V2xK0ICJvvv8q5DrH1agFSENpCFUeNxDHN7FhBds42QnVGjVNpFP3PJlK1cJmcA63yHXRTUOkgokmc4gZQNxQSdJ9tW48YWFdl/rw1wilaEy6hHUaCLcHztVA4gdVuQVgIdISEVUAwnKO4irqAGIJaU3ajP1wjvtKN6aasSbx8zntDndEMtuoUAADrqYx+dYiQyatjQ9oXC03JBSJQml/IxYO36bEj47dMpHBnIGBufe3zoFT1KYN/XdA1O0+2mKVSzUrk8O5U08D6pSlbApSlAKxy+79trGltLXbd7l2hHIOGjQRaMHD5dRdy4TbN0k0GxFFlTnWWSIBSEMOpwrI6lW0t+DqI/SBYn+9UXQHHSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoDxLUumBvi1Ye9LXe+Ww1wR7eUjnPJHT5dqumVRJTcOBTl3iHKOhgAwa6CAD1V7HUPUAVqfs07Rluw2zNDEXtO4VGGLcZwTuZkCqMCpnOWGauOQSRUdFcgYyZ9SHVSTROBDCVQQ0EaPaO1HY93SFkMEYWWbFv0JEY10V7Fv2aYszFIYFXLB44R1UObcJuHP6YbhtwwgA5TmpU5wmuMpteibXC4flTby/LHtnuLT6+uuNzX/CsBsHMtqZDi7nmopF6yYWrKLxjl0+BIqS5U0U1/KkTEOfeQOksQ5TG3REB1EodWvhQ+0jbNzWLCXhadm3VMP7hduWDK20UGqEryzcT8uCoOF026IEKQTiZRYpRAyYFExlCFNKak1K3J9KsH1DUY8V2xK0ICJvvv8AKuQ6x9WoBUhDaQhVHjcQxzexYQXbONkJ1Ro1TaRT9zyZStXCZnAOt8h10U1DpIKJJnOIGUDcUEnSfbVuPGFhXZf68NcIpWhMuoR1Ggi3B87VQOIHVbkFYCHSEhFVAMJyjuIq6gBiCWlN2oz9cI77SjemmrEm8fM57Q53RDLbqFAAA66mMfnWIkMmrY0PaFwtNyQUiUJpfyMWDt+mxI+O3TKRwZyBgbn3t86BU9SmDf13QNTtPtpilUs1K5PDuVNPA+qUpWwKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQHi3r/AENnv7MdfsjVK9iL8UTEX90o/wDZBVUvX+hs9/Zjr9kapXsRfiiYi/ulH/sgoC3UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbEUpSgOA9VeDelpx992hOWTLLuEWM/HOYxyo2MUqpUl0zJnEgmAwAYAMOgiAhr6wGve9VNQoE4uTW9sEWDkJxKmuxqrJNpv6FB9HuSIrNFyRrpRwimdJRMwGIcyhiqFNqBi6AG6Ooj5dw7OdtSyzhC3LsuOzYSRjG0NKQVu+QoR8gxQKZNNASKtlDtgBI5kt5qdA+5uhvakIJa4Al19dNS9YAPqrGyk+bnm4i++xFbDJRyvNt1ya5BwsjfMtGysZkO6rPXj4x3DG5v+QlBdm4MiZRIwuWyxk+tununRFM5evQ3q0+rEwqyxxcb6StW9rjbwb0Eh5rqEZKRyJ02qDUhyKC38s1BJskGhnBi66iIDrVGERNqAdQ0AodQm9dWlbGGc+rn3bfBttXZGk0lu/K3tbilDsRomzaRqty8Xme/wBgq2lXsvDqNwidYdR4qso6SRAzAwLJKC4OAldAvpukEolMUDV2D7O0U3ZxgQOSb0gpRsk9QkZiPXaA9mCO1+XceUio2OmUxltTlOgRE6W8YEjJlHdqvdYajrX11eoBokqYe7+3qrPfnJpy/ny6yeWRJoXZ5hYaaauxvu7XsFFunb6Jtp2u0PHxrlwVUplEjlbg6U3QcLgQiy6hCcp6JQ3E9zow2yvjaCXK6YuZvlSIwKJRM5SECjFKtVE1AKCYAB1/IGRVxAPTK3T3QIIajZ+r+quA3fspStmpVLG187THuw/Nj8vPvfmSSP2drfYSaRnt53RK22xcPHcdar5RoaMYrOSqlUMmYjcrs4AVwuBCKuFCEBT0ShuJ7mGWrsorP0E4zKl+3lJRFsyZi2hHMrrVbeRRqbUzZuKjhkg0cCuCazkDCKhzCRQpFFV93eHY02unWNCgAB1FrKpST4qOzlPi1k3dJtZhttz8viuTxa3pMiJNle32USjbkHky/oqIUiW8DKskHrNUsvHoAciSK6i7ZRVMSoqChyrc6KpkwLvHMYpThaG7ZBsmmggiVNJIoEIQvUBSgGgAAfUABX7iYfqrnU31102m5bzuSE44fPyXZH1WueEruyzjXDFg47ndlfJS8latsRcK8VZylsGQUXbNE0VDJmNLlMJBMQRARKUdNNQD1VsZShSUDmPInUHRPyr7xtXjNYdlOVyNmC3Yuwz7M1+RjZzdVsvnzuYkbdFmiyaTTJ26MoDeUVVMHIN1dCkTMIjoGnXWw4DqHXXAh1dY1lpNQ1KYTacrEiyGzUVq3YC3zVkcj+DFNOCkDOY9RaJbFSUSFumQ7MUFyHTU3TndJrqm3EzCpvEKYPuS2X7ImbfTg5KeuNVwRk8bnlQcokfHduXyD5R/vlSApXIOWyZyCQhUydZQTAoFKWyj9g1xpoNSqlVOXd8b4qH3WO93d7kXliMvyw7ZblZWJo6wJZK9j3djxutJsoO9CpIv0Wi5UxSbEYtmIt0R3dSJmbtCEH1n9M4lMUd3d8Rrsv2rBHcOLKv2/bffqShZZvIhNfSjto4FqDVbcUlCOhUIqiVMpyLcoUBSTMQCGIA1ZtfsrnXeDUOqtTLnNpLosF6BJJJLBYcJUexHGWzfENXyfI5LvdaEM+aSj+BcOWizOSfNwSErldU7cXW8ZRBJU5E1yJHOUREmhzgb8H2ynjWTcv3Dh3N8pIRUxErGI5SD0ZFZ0qdfTk9BWSB+8TSMICBSODgYDiOoWoda49IR6hqKyS3fSO0WSyUJYImbe/6zPObt4t3ZhVr4dx/ad73DkqNtxga6blW33swqzQF6CIIoJeTFXKQFOQ/0ZM/JiYQ3xMP2AGb9XWGtPV+emuvXUSSSpyShckaiD6pSlbApSlAKmO0LCXPPY3SQtG2ndwSUfc9sTQRrRduiu5QYTrF44KmZyokiB+RbqiAHUKAiABr11TqUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQGsGKNktY2JbWjMn3dc5Z9PGbayXDIAidIIijRsR0i2XQa76u6o3Dd5dVwnqXeAB11rPri2dIq8ocrC9sh3fOyCUe4j0Zlc0e3eo8o7bOiLJ+StUkiLIqs0RTMCfV17wHEdQrug/UPXXAerqrDShKMLd5nvLl43G009rPH2+itgTV1gSyV7Hu7HjdaTZQd6FSRfoNFypmSbEYtmIt0R3NSJmbtCEH1n9M4lMUd3d8Rrsv2rBHcOLKv2/bffqShZZvIhNfSjto4FqDVbcUlCOhUIqiVMpyLcoUBSTMQCGIA1ZgGudd4NQ6q1i5zaS6LBehEkkksFhwlR7EcZbN8Q1fJ8jku91oQz5pKP4Fw5aLM5J83BISuV1TtxdbxlEElTkTXIkc5RESaHOBvwfbKeNZNy/cOHc3ykhFTESsYjlIPRkVnSp19OT0FZIH7xNIwgIFI4OBgOI6hah1rj0hHqGorJLd9I7RZLJQlgiZt7/rM85u3i3dmFWvh3H9p3vcOSo23GBrpuVbfezCrNAXoIgigl5MVcpAU5D/AEZM/JiYQ3xMP2AGb9XWGtPV+emuvXUSSSpyShckaiD6pSlbApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAeLev9DZ7+zHX7I1SvYi/FExF/dKP/ZBVUvX+hs9/Zjr9kapXsRfiiYi/ulH/sgoC3UpSgFKUoBSlKAVrvt0fgegv0gWj++G1bEVrvt0fgegv0gWj++G1AbEUpSgFKUoD8x0Ad4R0GuAAAN9911rTkfZjgJC5sqXdaOHbWJM3FZqLWJk28eyRdLTCp5Py04KjunIqoRdsCiphLygCACY26IB5F1bM1+y985MyZD/AEFGycg4WGG8jYFZy8ukeMaNzIOJYixjkaGEi5So8iQyaxU1t/QoAPN1NWf8LfVNJLrO6bOwi8Lel0d291ueOZtcbQBEw1wBRD0tKguHMcKwMzd8vbGEzYmt2TjGbJC2/wDi1IHT5MXAqPOQjl1myepFUU9/fBRTk9DgBU0xGC9Gm7H2MG1vQmza8s1u2hLfYXLFMjW2Li5n7aQaLLPE2xl1o9YySSLrRR6IGU8p3RIIBVVUV7P+n1bntC/mUxeIrqfmC65tYZOJsb6boD1D9VOsR9HqD6hrXG/cL3JceNsVwlj2utBvLKd/SjRF+SObKRrtvHOQaGWSYGBr6ToUSqEa/c91Q4AAE10xlXDOVHyl13tcdgJyju9Urbkrkt5N+0/4yTbvX4rxG8Y5UlORZqMUhBUxUF+TMQx9w5xBVKbW5pTwbSn/AJNxMJLOpJRQ6U84mOWXqomJc5Js21MI6/8AbQddfV/jWlF+bOszc1oM49hgeahLTNe55dvZMUla7lzFNPodRsZQjaQUVikwUdiKoppGOJQUFQN1Ux93KrKsHMmPou1J6XxhI3DJRV0JSL+OhJFjywojayceZUhnrxMhgK5AxRAywnECiYN4BARtN21VaEnzbi3SfRzF4t1EZz0ifePW0m1uuo6bvVXGoj9Wg1qDdOFpx8nBK3hs2KZEIi0vFJFmdeIMaLdv5gjlmuKjpyTkRFEDDyrflFU9eoNequ3a+MdpOKyxF31cVsxkmi3jUrMfPy3QJnjqKKyIBnBmh0eTPrIlUcgoLkFuSVEoogbWue1U6G4uptvh1Jd4T3bNUqYaNQpxt+ieGO/qozRtr+auBAB6hD/OtCujVdb7GLW3YXZteWa3bwlvsLlimRrcM4uZ82kGiyzxNsZdaOWMkki60UeiBlPKd0SCAVuVi6FQtzHVuwLW33cElHx6LcI523YILobpdBBROP8A9DIcR6xBvokAiO6AB1B1aST4OOa38n/e9jEtQoxU/oZfWtGz5hO2L5wJjW9bpvHKj2an7QhpSQc+dO5k+XdLsklFVNwj8pC7xzmHQoAUNdAAA6q2XqU7Jv4rGG/0f29+7kKpo46NWOx/+UeVfFi6uI1hOWcSwONoCCu+0rtyShJI3vZ7QBd5IuB8gog5uGPbOElG7l6okqQ6KypBKchg0ONbFiIaVHNq9q/fYjbs4p/5G8cXrZaTZzu73IqmuaNAimn17phAdPzVmqppNpSVJOpJuCwAAiH2CFchqOg6aDWnrHDj1CNhwf7IArRbNRuW8IIZOIcGu16VuuUJAUlHIN3vJrnBTlXyiS6grAoYm+gmA9hPCWWIDmVfNn2Im1lbIa3A+g4BaRbgVki8kW5k4UTgqKZQFgLhMu4YyCJyJlKYSJpiJ2r2Xhe/+2efD/7RS83i2O79br1znCWtuNNTG3i/51z9Y6fV/lWutrYWyFauL8rWuzEv07dEn9KovEXZW30o6VjGIPDlUTHebcs6TdkAwgBiAYDAGgFEZ9emIsqzzGKj8KbNcPjiGt1+rdDKLkrlaRn/AB4kVuVosmhGleNwLoRyU6O8mRUFSnMoQ4nACd1S9yfdS10ulvcJxJUpp2lx4cve+67vDNyw1DXQOumghoIh1j9VauZA2aIi5nmUbwt/BlqR1x3fYiLaOcHj4/ykJpx9JeXFOqUQHlDlcNyqq74FVDQN8wFHTDLgwBn1mxaWfYeO7QQZ2rMubqj1mUkW3Yc0qUrbyA0axRI7URSKUroF2y4kKdZdU4Lbpgol5tmq1uas7rtdfxOy3qYqafpirY8bPddvA3XDX6v8K43ddOv1fmrVi4LMyijcdy3fB7Pv0tkaQBZ1bt5u5WOTTiklmHJJMVFOX8p3EVjGA7dNMzc4AZcDGVNujQNl+x8gYvtCSx5edtMYmNiH5lLfFjPGlkTNFygodLllEG6u8muK3UdEoAU6ZSibdEaUJx5rOE+rxXNdsYcRMqeEXltdN/J5Z70mWylKVo0KUpQCpPtLqPPNggxZzErG/SV4WhFuHEXIrsHXkrq4o5u4TI4bnIqlvoqqEESHKbdOPX11WKlW0t+DqI/SBYn+9UXQHHRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCX7M0rLT2zhimcnZN3IyUlZEE6ePHaxll3K6jFEyiqihhExzmMImEwiIiIiI1Sw19QhX89sLYbu6awQsvaWIHQhfOF2LJWYlkIUzx89GHYot28e8K5M4BqoVMxjIPkypkMQglMQv3OqWzwffNrtrFvDF2LJCLk8fx0ysyjZhO341d24cvWnKNlE4cxGJOXaeVAQ5AACmIkZT0w1HCd1OavwtU/wAlxcqFNhUonZvePb68rYwbe6amHUK5+sdPq/yrXW1sLZCtXF+V7WZiX6euiTCVReIuytvpR0rGMQeHKomO825Z0m7IBhADEAwGANAKIz69MRZVnmMVH4U2a4fHENbr9W6GUXJXK0jP+PEitytFk0I0rxuBdCOSnR3kyKgqU5lCHE4BU7ql7k+6lrpdLe4TiSK9O0uPDl733Xd4ZuWGoa6B100ENBEOsfqrVzIGzREXM8yjeFv4MtSOuO77ERbRzg8fH+UhNOPpLy4p1SiA8ocrhuVVXfAqoaBvmAo6YZcGAM+s2LSz7Dx3aCDO1ZlzdUesyki27DmlSlbeQGjWKJHaiKRSldAu2XEhTrLqnBbdMFEvNs1WtzVnddrr+J2W9MVNP0xVseNnuu3gbrhr9X+FcbuunX6vzVqxcFmZRRuO5bvg9n36WyNIAs6t283crHJpxSSzDkkmKinL+U7iKxjAdummZucAMuBjKm3RoGy/Y+QMX2hJY8vO2mMTGxD8ylvixnjSyJmi5QUOlyyiDdXeTXFbqOiUAKdMpRNuiNKE481nCfV4rmu2MOImVPCLy2um/k8s96TLZSlK0aFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoDxb1/obPf2Y6/ZGqV7EX4omIv7pR/7IKql6/0Nnv7MdfsjVK9iL8UTEX90o/8AZBQFupSlAKUpQClKUArXfbo/A9BfpAtH98Nq2IrXfbo/A9BfpAtH98NqA2IpSlAKUpQClKUApSlAKUpQClKUApSlAKUpQCpV0Ttlju04q+DY75NVWoPj7LG0hkqwbayNB4VxshG3VDsptmk7yO/Kumg5RIsmVQpYMxQOBTgAgBjBrroI+ugMj6J2yx3acVfBsd8mv3idmXZvgJVnOQWz7jaOko1wm7ZvGlpsEV2y6ZgMmqmoVIDEOUwAYDAICAgAhXX5x7U/Y3irxKkeBV5Fw5Tz3ZCUVL3riGwEYV7cELBOlou/3rt0h9IyTdiRUiKkOiRTcO6KcSiqTUpR0HXSgLbSlKAUpSgFKUoBSlKAUpSgFKUoBXjXRalrXxAurWvS2Yq4IV6JPKY2UZJu2q24cpyb6SgGIbdOQpg1DqMUBDrAK9msGzBfkpjayRuWCt9rNSS8xDQjNi7kDMUFF5GTbMEzKLlRWMmQhnQHEQSOOhBAA66A8PonbLHdpxV8Gx3yadE7ZY7tOKvg2O+TXHOPan7G8VeJUjwKnOPan7G8VeJUjwKgKPExMXARbKCgoxrGxse3TaM2bREqKDZBMoFTSTTKAFIQpQAoFAAAAAACu/WJYnvrzoYts3Jf0X9Gc7YCOnfIuX5byXypsmtyXKbpd/d5Td3t0uumuga6VltAKUpQClKUApSlAKUpQClKUApUyyPka/oC/rZx1jmx4C4JK4IiXm1VZu41olBsgwWj0TFKZFk6Moc5pEggAlKAAmbrHUArrc49qfsbxV4lSPAqAq1KiVw5Tz3ZCUVL3riGwEYV7cELBOlou/3rt0h9IyTdiRUiKkOiRTcO6KcSiqTUpR0HXSrbQClKUApSlAKUpQClKnmWshXTZKtnxNk2lFT81eVwHg2yMpNKRbVDcjXr46p1k2zk/wB4wMQCgl1mOGogADQFDpUp5x7U/Y3irxKkeBU5x7U/Y3irxKkeBUBVqVKece1P2N4q8SpHgVdnHGRr+n7+ubHWRrHgLfkrfiIibSVhLjWlkHKD9aQRKUxlmTUyZyGjjiIAUwCChesNBCgKbSlKAUpSgFKUoBSlKA8W9f6Gz39mOv2RqlexF+KJiL+6Uf8AsgqqXr/Q2e/sx1+yNUr2IvxRMRf3Sj/2QUBbqUpQClKUApSlAK1326PwPQX6QLR/fDatiK1326PwPQX6QLR/fDagNiKUpQClKUBrtfOR862Vc2RjjcliPIKzrYJc7NpzWeJu1SuDPyIIKOPpISCKYsiCc4IhygHMAFS6hrxLr2ksm2zkC/GqEGwkbbtBVVBQp7dfskmRAj2y6btzNHVMzULy7gqZ26SXLETEVR9Ehtdi39t27LC+GUt+OdmlGhWD4V2pD+VNiicSoq7wDvpgKqogQ2oByh+r0h1+0oODKSRQLDsQTljmUkCeTk3XZjJlTMZUNPugimQhBE2upSlD1AAVyiqbYQ11bUOeCldd90lNzxT6LHu/kWJxZd4ZIYXbc1i5ClLXnH0RDM5tvJQcWvHJFIudynyCzZVy5EDALYTFUBb0ymMG4Xc3jx59tFbQcNaUIqpzIuG47xgoSdiEYmCVQMxB4/aNlEFmrmTKVcRB4ApKi6bFEyKgGAADUNk7MxpjvHUY5hsfWBblsR7xUVnLSGi0GSKqglAonOREpSmNugAaiGugAFeKxwBgmMt6TtOOwvYbaEmzpKSMYhbjNNo9OkbeSMsiCYEVEg9ZRMA6D1hpSHt7TuvLwlJ1SuEzTfF7N8WZVlb6xZX44O2C2rYIwTM2dbpwrhSAuG4HlqsL5nToNEEriUTio0rvkzOFklhB2smgIJIqkLo6VLyopgBzgYAHxHG0jetxZJgmONGrOYtaWgoWcBItsP3J1Wz0zoVl1JVJYGbIEUkCnBJZMx1hAyZB3hDS9RFl2dAIRTWDtKHjkIBE7eKSasUkisETgAHTQApQBIpgKUBKTQB0DX1V+kVadrwBVU4G2oqOK4TKisDRmmiCiYGUOBDboBqUDLKmAB6tVDj6zDra6aqlUqXduVlFsOTcPerw5hq0uFTyh5y5xngu+L3GsmK9pDMWTGMDBoylotJu6PJVGks/tKRj2zM5mJ3i7T6NcvCuHZwIRMUnBFkkVSKKKE3uQMU+TF2ib3hYIq9wRUK9fukZuFi1I5FYraSuJg9M2RQJvHMJCutd4qW8YyYoLlFRTdA1WCaxLiq5IoYO4sZWpKxxmzVkLR7DNl0RbtROLZLcOQS7iQqKCmXTQm+bdANRrvJWHZKUVDQaFmQqUdbiqS8QzIwSBCOUSKJUzt0wLupGIUxgKJAAQARANNa1VFVTeCnDhEc7XaW+G24vMEt6/Vx1cS8koShwQ9/tXR8Fn17iR/NWs+RjYtRuu0avCEmFZxJoD4xE2plRMLU7YRAp90dFiiQTiI6BPcy5geSOCoycyvLYkk3F4lipm0GK0g5iG7BRZFw50cOxdgJjERRUBu+IZvq4ApipEMUlbbDZ1oCUEwtuLAnl/wBK7vkZNAe7295Tpp/z2918p99r161imNcDY2xfLTtwW3b0cWTnZdzMKO/otk3VbGWIQhkUTNkUtEgKmX77eOYRMY5zmMJhwqNqnzY2ytKctRuc2zSpSWLjSezhxWN8IT6RdZtucE3MHObZ9zaUjcGEZOy4+0bHtCOuIWcy2XcrSbNZuoskkksm4TBkQEkBTBc6bnVQT/cw5IQU2MjnQvmLd4ZuogK6ZVOSUDQ5NevdMH2h9dYpJYXw7MOomQl8U2e9cwKgqxKzmDaqqR5xV5UTNzGIIpCKnp6k09L0vX11mmuvogGg10b2pq3tvfm88Xlyi2JhU7KpSyUbpsssFEPDGb4I/WpTsm/isYb/AEf29+7kKq1QfH2J9pDGtg21jmDzVjZeNtWHZQjNV3jh+ZdRBsiRFMyhizhSicSkAREClDXXQA9VU2XbXX11ItqRwZti1i6TAonRvmyVCgI9QiFzxghr/srsc3dqXq//ADyYrH/+mkjx2vGuXFOeL8RjIO+Mt4/cQjSehpt2hGWA9auVwj5Fu+KkRZWYWInvnbFIJhSPoUw9Wulc602mk4e8qaTTeBNofaLz/HYxsnJF82zDoBcUqm5fNQgwbmCCJGKPnK7UG8o9FQ4ETMKZlOTMbcEpkCiYDBVMVZnlshX1eiLkIpK0Y1kwkbfdpJnKs4bnXfNlllTioYhkzKMDnSEpSfczlEd7XWsutjDuIrLb+RWbi20YJAXB3QpRkI2ak5YyRkTKaJkAN8UjnTE3rEhjF9QiFes2siz2bA8W0tSHQZqR6UQo3SYpkSMxSA5UmolAugokBVQCp6boAc2gBvDrqur8ToXJPK2fKF3qcS1GEnCT335TNu7/AKVMJzrJaW2LceSLHuaUxy8sKZuNrcMMnBtUn4rIKREm7TSbA95JQTt3YByxFAEPuZgIYUxAdwfxu3bujIJFvJEkbXjGw3Moi4bzzjyFyWGatWBpBMpVFQ3pFJd8YgIhrvcgoUCCJRNW0atmWg4ctXbi1YhVyzTSRaqnYpmOimkoVVIhDCXUpSKEIcoBoBTFKIaCADX4tMf2IwdykgxsuCbO5vlAk10Y5Eij0FB1Py5gLqrvfXva6/XUXlc4q+PDZjvDn/U4Ljjb9ZntNojDK0T95mGfSTnlmjeLVJHX9DWu2OBDmKoyeBHCdQRA/Wpo9V3TBoXqJqUdB1wS5M5Z1t2GvJg5i4UL1Yz0WzhIIluKHKEa9kxaoOCuFJJJvIComGofdWQpnKIKkT3ihVnbYYw4xuALuZYos5CdAiCf0mlBNSO9xDk+RLywE39E+RR3A19HkiaaboaddLA+D28RL262w5ZCUVcCqa8swJbzQG8gqmYTkO4TBPdWMUwiYBOAiAjqHXWaaGkrzDU8UlSmuDbTc5bTXFVPGfmP1Sick5yeRWStczu0oh1eSZEZxZokpIJEaEbAkuYoCYnJEcOSkEojoIFcLF1AdDmDQa97T6q82CgYK1Yhpb1swrGIi49IEGjJg2I3bt0w9RE0yABSFD7AAAr066tqZM0pqlJilKUNClKUAqVbS34Ooj9IFif71RdVWsGzBYcpkmyRtqCuBrCySExDTbN87jzPkE146TbP0yqIFWRMoQ5moEEAVIOhxEB6qAzmlSnm5tT9smKvDWR47Tm5tT9smKvDWR47QGvWzBtRRTdhinCic5apmyGM4JiVsaQIEsE2SFbvd0W/KbxmpmptAUAnUsQxN7UdA/dhtVZxWsC37rkvolgjcDtqBZlTF0+ZEhTxbl4ugnGA78qcESMgiHlxDg3MRYxgDRI5q2LxZhO0ccYqs/GCsZEyydqx8e3F0aLTSK5etkCJC+5L0gIqcSCfe3jGATffD66zFG24BsjFtUYSPIlCABYwhGpClYgCRkgBAADRIOSMZP0dPRMJfUOlcnS9lpO7Svud233cKZslM3Tqa2k4tf6L0vzbzhkDj855ZlGIX2HMtjCRk5E25LW2ZFR1JqunQtSKnRfpOQRIIGeFMkl5OryqaZDcqXlgFP1m+0U5jE5hxdbVi0SsCLm397KJoKlBuZqsBWYIgY47oOkQUcEAwnHcAoB1m1qiNsM4hZXBHXW0xRZ6E5Ctk2cZJJQjYjpk3TIKZEkVgJvpEKQRKBSiAAURAA0r2l7Ls52tJrOrShlVZo7dSTOowSMZ8dDTkDLCJfuop7pdwTa7u6GmmlaqcprCz7tJJ8plxlKUwr5o8rl3w7S5XaFONpak16sDaMyHlq07Sa2ZdWNm91SFzvbem37NBSfiEuRYOHqZm5W71ETCdIiGoisO6YyhRARL1fDHaLytdVoXDdtuPcfRoY+hzSM82eN3Dsk2dNR0Qxma5HCXkTZQGR+SWUTc6ioIbo8iPK3a7MS4rv7lSX1jK1LjBwqkuqEtDNnYKKJEMRM5uVIbUxCHOUoj1gBzAGgCNfErh3Ek+6g3s5i20ZFxbKaaUIs7hGyx4siYlFMrYxiCKAFEpRKBNADdDT1BVqe05VsOOUNxzvGHEtPl/Ff0zmLcLTiZRHuxfM0HZ0FERXTIoKagaHJqADumD7Q10Gu51euvnQADQPVXOv5uqtWd0ZpTSSqcs+qUpQ0KUpQEpuP8afHn6P7y/eNuVVqmWR8c39P39bORcc3xAW/JW/ES8IqlN24tLIOUH60esYxSovWpkzkNHEABExgEFDdQaANdbm5tT9smKvDWR47QHW2o3B22LWLlMAEyN8WSoUB9QiFzxghr/sqJH2ucyO7XgIyPteAC/JGHYSDlklHKOEVfLn8Yk0XaprPGxTJqIP1g3VHBAKugcgq6JmE1buXFOer7QjYS98tWAvCNZ2GmnaEZYL1q5cBHyLd8VEiyswsRPfO2KQTCkfQph6tdKz6cxLiq5WRIy48Z2pJsyME4ojd9CtnCQMkzlUTbAU5BAESnIQxU9N0DFKIBqAVlJqpN3Uq3BTPeV25BtbMLG/5fr9YkjU/nXKNtuE0bgkbfght1hDuLgQd2jIP3Lpd6CpxACRrpyWLbEBA6Quzneo8rvhromHK+SfbGGRmcuwNsS9lunVoxD9/bSKbzyh1yseYyD0sg2IsChSg4Ahk9OT5RIwiAjpvVcJDBuE5lrCMpjEFlPW9sp8lCouIBqqSMJqA7rYpkxBANSlHQmnWUPsr1nuOsfyMOhb7+xbfcxbZBdq3ZLRiB26SKxBIsmVMS7pSHKYxTFANDAIgOoDUSxbw81sMcHOKjdhFlvM5Wt+G+OGKjBzvxIwfLeZWt/qYNdXFj9S7VXLc7a4yQrokemgo0XcC3PGi+FUzoAbGECg8KApKAroG4KZ6lh68p29rRUf3KSOGVj5KQiHTiNIcrN0o0dKtxXRKcxjEIfkt7kxOcSGExN8+7vDwng3Cadpnx8niCySWsq58tUgy2+0CPO46vuot+T5MT+iX0t3XqDr6qyqFgoa2YhpA29Es4uMYJFbtGTJuVBBukUNCkTTIAFIUA6gAAAArSUN/N3685l3DvEfMbdZTnKIVmepSlKpoVKsyfhFwT+kB5/urPVVanmWse3Teytny1k3bFQE1ZtwHnGy0pCqSjVffjXrE6R0U3LY/3j8xwMCvUYgagICNAUOlSnm5tT9smKvDWR47Tm5tT9smKvDWR47QFWrUvMd+5TsvadlI/EUG2lJm47atGPURVjUnxyoEUuxwYyaS0jHp72qAaiZwGhRNoUw6BVe5ubU/bJirw1keO0sLE13R2RpvKWUbpta55qQi4qKj/AKJtdWLTjiMjyJuULy7x2cVFAlFiCYpiaELpoO8NRqRgYUttRsUNotfCZ5+0zpIR52RkfLSklfp0jYr0S+TCqJhaGbG0A4FHRUhib4iOgdl/kDOM5EYhnrSuaxopHIbZoi/byNrvH527o8Y5fqKpHTkUA5MQbgmVMxRMG8JhUN97VhVsy0lUPJzWvEnS8uGV3DM0xL5aI7wuNNNOV1ER5T77Udda860cT4tsRBNtZWNbWt5BF4MikjFQ7ZoQjsUjIiuUEiFAFRSOZPf++3DGLroIhWKJX4sbd7t9HMLGFSumWossLrjwfSF1b6yyHzJk149ty7HL20HFq3fNSUIzh2zBckowO2TdmBRV0LgybgwGZHBVArdLk+UMHKG5IRUyTGGX5e+ZGx2rksWKdzWGldToWoG1I4OLYNE9Tm0SHllNAHUfRD0uodc0jcW4zhbveZBh8dW0xumQKYjubbRLdOQclNu7wKOCkBQ4Dul1ATDruh9gV92njbHNhOZJ5YthW5bjiZVKvJKxMUg0O9UATCB1jJFKKhgE5x1NqPpG+0aUJ0uX88rUcbtVS7yksLq13/Db+6c8LLZhWvOOOVUpSuhRSlKA8W9f6Gz39mOv2RqlexF+KJiL+6Uf+yCqpev9DZ7+zHX7I1SvYi/FExF/dKP/AGQUBbqUpQClKUApSlAcAGla8bc/4HoL9IFo/vhtWxFa6bdapEsNQqqptCJ37aZzD9gBMNtajaV2EpsjYgBDXX7KCIa61MmW0dhmRtmNvCOvPyuLl2K0gwOhHulFnKaTlJsdMiBUhVMv5QukkDcCcsY5wKUgiAgH022h8SOW0U7PcrtmMzPkthu2fw75m6TlDk3yNnDdZEirUxiCUxRXIQpinTEBEDkEUPDPDrMe9udsSSon5hPtfkUsQrnq6qnc9nvF1uvLkjJGbfqPbSWjW8q2ZQr56sRV+bcaJpJoInM4Mob0d1EDiUeo26NehM5Zsu3bWjbulzzaDWZOVJgyC3pFSUcqGKY/JkjioC8E4EIc5icjvEIQxjABSiIYlfiyt63XeVHMucZmaCIUAQEeqpkntFYjXl4+Ia3C9VGTO0SRepwr80cmu6KQzduu+BHyZuuoCqW6iqqRQRWSDd1UIBv0cbQuIWtnXHkBe7DhBWlKrQ0w4COdmO2epKFTOlyIJcqfQxy+kQpiiUd4BEvXWlfD5gvdpdVvQz+cfo+zKVoAU0CpnK7Q+JoS4Ji25adkWjqAIqd8srAyAMymSbFdKJJu+Q8nWWKgcFRRTUMpu7w7vom09C4cyWTbN1LWS+JcruYbsSyK6UTakrJpooGBUSCos0bKJEMfkFQKQxgOYS6FKIiAClQnvw48grzGRnQjpTXWpRH7TeJJWGXnWTi7RQRfDGERUsibSdunZRVBRBs2O0Bd0dMUF+VKiQ4pAmcVNwAEa9xzmvHLWwEMnfSz5xALuU2RDNId65eC6O4BsDcWaSJnILguPJGSFIDkOBimKUQHSOzvwXfDvKjePnzszO/RD6656vUFS5XaRxKSHaTCMtNvAeKukQYMLYlXcmgZsYCuOXYItjOm4JmOmBxWSIBRUT1EN8m97cpmLG8PHWnMPbqbiwvh61j7fdIJqLovl3BBOgBTplMUhTlDqOcSl1EA11EAG/VLq8FzeW8kr39Me2ZmgdfUNCAGgafVU0uzPuPLZ52MAlHDqYtEWCD1ijFP1x8pfiJWSRfJ26p1uUPoUeQIqYnXvF1DSvPZ7RdhQaEJD3zLyqE26jY93IuS2bMs2DUzo5kkzuTqoGLHEOqmoBSO1SGKAekP1jE9p24Lm2pXpfk0w7WfyI+pXuqnV9QVOpzPOLbeYNZR/PPVUXqz1JMjCFfPVSFZrGQdrKpIInOk3SVLuncKFKkURLqfQxdf0ic5YymbuJZEbNvjyK7hdm1cKQ71KOeuUAMKyDZ+dEGjlYgJq7yaSpzhySuofcz7tT2sPkY9iuyllCqVdLHZY7y2KvjKO+dVVqU7Jv4rGG/0f29+7kK0DnpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlASrpY7LHeWxV8ZR3zqdLHZY7y2KvjKO+dVVpQEq6WOyx3lsVfGUd86nSx2WO8tir4yjvnVVaUBKuljssd5bFXxlHfOp0sdljvLYq+Mo751VWlARK7dqnZgdWpNNm20di5ZVWPckTTJeEcYxzCkYAAABbUREfqr8tiBQiuyJiMyShDlC1GBdSjqGoJgAh/WAgID+cKrF6/0Nnv7MdfsjVK9iL8UTEX90o/9kFAW6lKUApSlAKUpQHz/qhWum3cjy+FohDe3eVvy1E9dNdNZdsGtbGdWla8bc+nmegtO0C0f3w2rDpVSirAqcOx0U9j1zES0HcFr5MGOf29BMGbMi0Py7Q0o2FoU746PLlHk1kWSSSiBTlH/XKqU+ph9uV2bH94NF1shX6hITUlKOZOQdxUQdghqeKUjkCtUjOFToCiUxFgOZVQwqEEdSgJQJdzAUA0H1VwAf8ARrVTdVLpeDn1cuN3TBWVrGVapVLFR6Yc+ud8TXWZ2SVZe0pSCdXjDyshNN4M0mvO20D5m/fMZR1IuFnLQHCfKpOFHZicjygcmQoABjBoAZvJ4ourm7ZadqXLa9u3HZSYoNFm1sHGFM3OgKKjcscR2Q6SW7yYkKRzqQUydZi7xTVQNA+9+unV6/rqRjxc9bL2URhwIlDXBR848cc8SHIYDv4h1IN5ltg9taTlmc/MtFba3ZFy9RMiqoCLtNyVJBBVduU4kFsocoKKFKoGpBJ4krsgNJYkyie/l0m80wnEl2wR+qAv3qr7yd8JBV6zt0ZJwkJerlN1I28TkyhWxmgdY1yGgDoA/wCFTJRlh2hdEsFlioZZu3vx7z6vHfg5RDrk2WrcuJXIUwpPOxnr0I6IwdOVHThnDCtHoMxUTYC4BuZXdRNvLEKmqYihk98C66/MVga9BzFHZmvC48azk0iwRjl3BcfrJPUE0jOtBj3SkkqdnvkdbqmoKgfc+oDaBcREPrL/AFddc9YeoP66tNOyqUv3UkuCShemO/OQ0mnTvx6/OhIHeFrjjmUS6su+2UZcELcE7MtXcjCmfM1EpN04WVbKtiOETmAoLlApyLEHeSKYQ3TGTE6wncJ8Yp2rHXzHpXNzgRuheadQp1misgWRK+OHkRHKZioicvJlIC+8UmmpzmATGr/19Q+qgBrp11IvMXlPs016pOMJVytzjx9ZnrdqdzghEdgTJtuTji/bYy9CJXtNmdDPOpC0juYtyVTkQRBuzI+SVbiiRumQomcq7wGOJwMIlEnq3Ds6Qk/YVoY8NcDtNlajddAFxSAXDgx49doCwHKYoJKlOuC4GKGgGIAABeoQsWg/bXIa/b/V1VWvLsZRHJXst2ORP3tvP+2O/BY5WNdZjZIUlrSlIN3eMPKSE03gzSa87bQP2Ug9YyjqRcLOWgOE+VScKOzE5HlA5MhQADGDQA7cls53tIJuIZpkK1Ia3Zu3Yu256MiLMO21aMzuNSRwi+MmxIdNwZMCnScbgAAlHXTS/wDVr1hXHo/ZRWbazc9YjDdGWHAQsOEfOPHEiqeCrxt1dlJ47yXHw8r/AMboPnT63hfJqtXsgo9KCSYOU+SXRMqYpFDGUTNvGE6RvRAv6Wxg27IeXgmEtkVhJ2Xakk5lYeMLAGQkQVVKuVMjl6DkyayaQOVN0CNkjG3Ut45tD8pZhL9Wnr9fXXIk6tfVSlbMRlMcJc+9+DuhV5pnOz4qIvvtblY+61o2fM2WxY2BMa2VdNnZUZTUBaENFyDbzWXMpyDpBkkmqnvkYGIbdOQwalESjpqAiHXWy9K0UlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAlPSWx37N5V8J7q4dTpLY79m8q+E91cOqrUoCU9JbHfs3lXwnurh1Oktjv2byr4T3Vw6qtSgJT0lsd+zeVfCe6uHU6S2O/ZvKvhPdXDqq1KAiV27R2PnNqTSCVvZRKZSOckAT4rughQEUjB1mNHgBQ/OIgAfXX5bEKpVNkXEYl3+q1GBfSKJR1BMAHqH6urqH1CHWHVVYvX+hs9/Zjr9kapXsRfiiYi/ulH/ALIKAt1KUoBSlKAUpSgPnTXQdK1425wDzPwX6QLR/fDatiNevStbtvjy8cGxv0VyXlvPi1vJuV+85X6Wb7m9+be01rDq2VOMFpW00jY4RAR3a43Q06w1rSp9C33c0NbzGwIjNchLKvkVbra3HdFwW2gd4WMfmV5J6UomTDygEvQagDA5/JyEEoCIh69qjn4ZKViyub9k47IZ2EMEnJN3bFSCKjGMTrv00DiAshWTVkPvRACu0EidZzGGo6th1Lcp4PBWfF54RffGE5Sq/us8N6WKxlNKbTuD1fZXOoBWD4SLcJcO2MF2/SX02FuxwSP0kKgu/KvJicry4qenym/vb2/6W9rr11m/qDWulS2anTMwVOVLPqlKUKKUpQClKUApSlAKUpQClKUArXPCVo5ZyVhiwciTu1RkpCSuq2IuaeJM4u2CoJruWiayhUymiDGAgGOIAAmMOmmoj662MqU7Jv4rGG/0f29+7kKA58zeRe9jlX3bavBqeZvIvexyr7ttXg1VWlASrzN5F72OVfdtq8Gp5m8i97HKvu21eDVVaUBKvM3kXvY5V922rwanmbyL3scq+7bV4NVVpQEq8zeRe9jlX3bavBqeZvIvexyr7ttXg1VWlASrzN5F72OVfdtq8Gp5m8i97HKvu21eDVVaUBKvM3kXvY5V922rwanmbyL3scq+7bV4NVVpQEq8zeRe9jlX3bavBqeZvIvexyr7ttXg1VWlASrzN5F72OVfdtq8GrEsj27lDF8TCXYz2ksgTWl4WtFuI+Ujbe8ldNX04yZOEzi3i0lQ1RcqaCRQpgNoOvVWwVSraW/B1EfpAsT/AHqi6AqtKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgPnqH1V8iYA19L/ACp16DqPXWt+YLrzOxzlBSVoWPf7+0rRFqWSViSofR8gD45k3QLIKLEXc+TI8gsmZuktooKhB3Ous03rVO9xOS4vcspD/C3uUxm+C4myHX9Rf865Dr/r+utNV1LkUt3JMQS48s8ivNM5Brchoa8uXeAZ4usMYWPTKVw1SImQEzOosUkTFUTExSAXklMil2eXLwtsWMYhkCzfpSNsJNuVvIvHTmJOd+v5eIOFi76x00uTFcyxd4xQLy5dBEtZTmmVm6V3i/r2U2TTZ2qdL4+ny+52xTS2mEoa67v9VcjqIgH1D660iuG89quRXeEYY0yMaVgrlXnnIQ6iaLFyLJqwRTZpGeroFXjnShZBTcRFRQPuZuSExh0z687CuNxLZKvSx3GVCuXFjNpa3mh7qmiIll3QyXlCSLRZyDcixSg0AEN0ARHk90qYiAjqlzQq27NT3U+8rpJIvGeEdY/NPqbQAH16/wCVcBoJhL/lWoeSnmVsuXKEtja28gq28tKNG5GT+UnrI5QUYuROsbfIkRyiTlVGgAJkyorKlIQT9QmL2cd3pm1bMNvXBKWjk51Z6zFrajh4/j0mbJcfI01hlVo86/lbZwL3lUTiLfkgSMAiqIFAKK9Towaj1w9YXVRg0pU4Sqyv6fpL32dszbMNCgIgOlcFEfvg69a11x61uYu1Hfry4Zq7xZ8ruQ8e5irjCMBDyJkIqpOzOPocS8p5QHJFbgvv748p6y1hsxMX6ziLiaRFu5ulslTSrqHlCNBfIxDdFZ+RMrmPVdnTjkTJM99RBRson97o5OCptawq26aakr1JOOLiF63eV5wNNXe5OJ6S39N/U291DXSg/wDW0rSqYHaAuO37LO4tvIsc/tODmG0yupMv2Lsrhq6ZEbSPk0cZVrMuDN99YGZ1RSWEVyFOYQEByWTeZugZK1b9aR19SyVsmut/JQpAdj9KtTzZEUUTIiGiqxGSp1mxBDeEEAAmhRGtTZPe32W1D67No3qJdiKW2s1He0rpOccYVza8df8AVHrGuAKOo9fWH11pNfMDm9vbKjC5bpv+OWeZAF8/exjK5JYjZuvbqax0EEYdyi7Fkm/OdIgJqgiU5A3gHQxa9G1XmTZH6DXuxnmBhlDy+D8hSKMqa3yxe41Fz5WZMpYswikLzlhclK65XeBMCiDcAUN1VKl2w44pWTVpU3W5N5EqtSq1g54b8eFscm0szc6lKVs0KUpQClKUB4t6/wBDZ7+zHX7I1SvYi/FExF/dKP8A2QVVL1/obPf2Y6/ZGqV7EX4omIv7pR/7IKAt1KUoBSlKAUpSgFa77dH4HoL9IFo/vhtWxFa77dH4HoL9IFo/vhtQGxFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAVHInZUxNARbKCgpDJUbGx7dNozZtMo3Oig2QTKBU0k0yyAFIQpQAoFAAAAAACrHSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jTo0479pMq+LF1cRqrUoCU9GnHftJlXxYuriNOjTjv2kyr4sXVxGqtSgJT0acd+0mVfFi6uI06NOO/aTKvixdXEaq1KAlPRpx37SZV8WLq4jXyns0Yv8tYO3r3IEn9FyDOUbt5TI1xP2vlTVcjhuodu4fHSV3FkkzgByGLvEDq6qrFKAUpSgFKUoBSlKAUpSgFKUoBSlKAUqTyGcpYLuua0rTwXf9280pBGLkZGLcQaLXypRk2egmQHsigqbRF4hqPJgXeEQAR0r788mRe6dlX3lavGaAqtKlXnkyL3Tsq+8rV4zTzyZF7p2VfeVq8ZoCq0qVeeTIvdOyr7ytXjNPPJkXunZV95WrxmgKrSpV55Mi907KvvK1eM088mRe6dlX3lavGaAqtKlXnkyL3Tsq+8rV4zTzyZF7p2VfeVq8ZoCq0qVeeTIvdOyr7ytXjNPPJkXunZV95WrxmgKrSpV55Mi907KvvK1eM088mRe6dlX3lavGaAqtKlXnkyL3Tsq+8rV4zTzyZF7p2VfeVq8ZoCq0qVeeTIvdOyr7ytXjNPPJkXunZV95WrxmgKrSpV55Mi907KvvK1eM088mRe6dlX3lavGaAqtKlXnkyL3Tsq+8rV4zTzyZF7p2VfeVq8ZoCq0qVeeTIvdOyr7ytXjNPPJkXunZV95WrxmgKrSpV55Mi907KvvK1eM088mRe6dlX3lavGaAzu9f6Gz39mOv2RqlexF+KJiL+6Uf+yCubuzBkFe1JpI+yvlJEp45yUyh5G1xKQBSN6Q7swI6B6+oBH7AGvy2ITmPsi4jEyRyf8AJNgGht3XQEwAB6hHqH1h9eg9eg9VAXKlKUApSlAKUpQCtd9uj8D0F+kC0f3w2rYitd9ugQDDsEI9oFo/vhtTAGwmmg9dcFDTQN3/AD9Va+obVrh5aMrdEViSZllGlyRcYwZM5JoU8lEyLgiLGVTUcHSICa2+YCk1H0y7omKTeVJ1UtunDztldL2PZyLvmouRFZJOThymVILoWxljid8UrJMqgBqL8zURAxd0DCIBWafNEYvLOYTiMZSalZXnBwhpTl8X9t5scNch6tdOqtdLt2x4XHyF2SeQcX3DCRVrzqMIV64m4FMHhjsE3gmTKs/TExwIcB5FPlFDFMmJCmNyhEvXubaqhban5aDJiu/pckSu5aeXMG7AGzpdu2TdrpJCs7TPqRsoKupyFKYEzkIYyuiYyUn0npZy9yurveFLiM8OOOG/DIuQiGugh66BvCPUGofbUQntq2z4VeRWGzLsdwrLypFvOoINAYv3jdoLtRqlvuCqkOCJFDcqsmk3+5H1VAA1r3JbPLNjatnXHF49ue4HN8gJouLhnEY4XEoNjuRMZfywGYk5JMxgORwYpvRAomEwANqaoU1WVvXD2nlfAlPmcLj6Y9p72xTKqP21wAVAA20MWHkZyPZRss9PC2vzuKDJ1GOlnjHk2xwAjVJ2ZygoJXaO6V0khveluiYA1rI7H2jbdvLKTrDrm15WBuhlFjLLsn0nDuVUky+T7yaqTF64VQOHlSenLEIU/pCQxwDUUNOM4b6KZ7Qw2on5l9UVsTAPVQBAR0AeutWrS2rr0+k5QMgYzn001JaQYQUXHRbDyl6CcuSNRTBz9LKEFQiu8CplE0E9VAEhtxITqZaG1xZbq4oGzEIORZTdzRrt4xSev4sToLt03RlUV2qbwzr0TMlyCsmkduJgACrDqA1zekpo0f3rwv6Jtrmkr9sTWy3pHo819Ynlx55IvAh9dc6h6h9VavK7W08jYDmUjbQdXDchGRHyxWTFFBhEpeSs1DKuRXegoslyjo26KOqogUwcl6AnPlsdtYWPKyF3QkVbczIzdpSTOJNEsJCHduH7lyusikRIyL4ySJt5uqYxHSiChCl1MUPVXaul0NKrPDjdK2+7Sti7LBnOmpVJvJY8Oe6175RvRcxAADTXShd37da1wx/tn2bO3Pb+ObzYniLrm1FSKIeVsEyszmdOUkG5kTOzOFlBK3ADnbJrolMbrUKUer0ck7Vkdj+5jJubTlS2nDrSCExcKoNPJl1m7EXAtmoeVAqCoHEhDHWRKiGhw5QNN4Jv3Kf6YntK7rep3mlm49cO8Ps9zL+P5x0rgNBEQqPQm07Y1z40bZKtiIlZry2UCEbQ0Y7jnrpZ8Km7yJHCLozEfR+6CfyncAuupgMAlry5bazt23knry4cZX1HsWILoHeGQYrJqSKDXypeOIVF0c5nBEyqhvbvIGMicCKn9HelpfD6J+1S/mW9TnaUr5m17p9qtzi6iIAb+uuQ09Yh66irbadiXL36JNi+9k5NkdwaeZnCN34BuiZMDOXRweCkoQSqlOBWp11RKBvue8G7WP2ptuYtvSKjJO3YiSdjLTrWBTbpy0IYUlXKe+gdRYr8W5BOACBW/K+VCYolBARCi86WzdW7NwnybsnhjucVuJnKfRS+yvya3qdiR109WtcamERAOoA+utU81bVKCGOJK7LZuKXsUlv3K4gnT5U9tuTrLIoKGOmdo8kU1A6tDg2+5vREE9Et0TAavw2cYWQyASwkrYuMGyr9eHbXGqk2LGupFFuLhVqQAW8oA4JkVHeMgVIRSOBTiOgCpaqw+KE55XS5uMRV5Ynj3TiOODdslLsU4d71Vx1l0AR6xrXx1tUqJ3qWOaY0uV1CO2yycMZMjEXFwvCvk2xRZ6uwKmjoKphM6BDUAKYB06hyp3tCxiFs23ORGOrxmpC5nz2MQgmSTIr9s6Zgt5UkuKzlNuQUhbLFEQWMUxigBBNvF1m1T9395lf0bT7RfcsYkQ9p0PH6qf7b4cYMrggA69VCl0+qoGhtl4veS01Ex8bKvFIa2Bu4vkr6LWO5Ycm2U15AjwV2ht12kOrxNuTTfNvbpRNX6vdr3H8S3XezMFLsmrW0SXmq4NIxCpPIjiAEBMEnpxXAxjEL5QiCjUoqFAy5evSuKbv5j9H2KvNZfMPqu5cxDXQNP6q+tPUIj11DS7S0PdeL43JmPitjoubgbQrpJdw1f+T7zgqaoAoxcqN1TgQwGKKa5i+kACICBgDhltU2g3sv6ekImefv4+Gcy0k1ZRySawJt27RYyhUTODgQFSv2pkicqcdFQATeiYQi8yqf8OPZVSt6hpz2M4NLfh0bUd0/zLoAjr106wqK2BtVWFf+T3OISRElCXO0TUBdlIv4syybhNMiircyDZ2quBilPryop8gbdMBFTDpr1ktrC3FVl2yWNL5O5WcnawqHIsCnnlU3gtFQa6uwBMCKlERM6FAol9IomCrN6VnVhx5b5yjFXVi5VN/u48Oe6M5wzLppp/VXAgGtSWQ2jbZj7atK4z2vPga7ps1uJMl1WDVZjIEWURVQcKOHSaHKFWSUTBNJVQ6hijyJVQ66w6S2uWkPEXGRrZExcsxbsDKXGZJupHxia7Vq7WQ3SIuHpnBil5IAOummon6/vVDAgBtLHiuyl+hUnVZcPVwvU2KARA3q01/PXHVrqI66+qtelNtvF7WfuC1pKDnGcxbMas+fx4uoxd6CyKKay7QrVF2dcVCFU05QSA3OYhgTWP6O96rTaohFjyyUxjS8bfUhWci4chMLRDZPyhkCZ12nLeXCiVQEVklgUOcrcSH/AOeAxTlK2l6T038uPFb1Mx7x1xjn7Q5wZcBAdPXX0Af6oB6qkcPtF2jc2JY7LVuQczKoy780XHxDFZgu8dOyuzthSTWI5FmcN9M5uUByKe4UTAesJx/tnWdOXRAY5vNgeJuucVWIdAXjBMrRQXTlNBuZEzszhZQStwA52ya6JTG61ClHqsX2c5jrExziO63qZKh1ZJS+CTiX1ldHucbJBoAiavkpRL16ddRNbaXdMr3mLGdYUvRVwxuULdj3DNzFqJv9I8j5RyIqO0+QTIibfHlNBEpk9NVDHST8uD2yrJuq2k7gtGxbnn3Csy4gwjoh9CvVAWQZA9UP5Si/MyFMEDa6g4EQMAkEAPoUcbdOy6pskn0cQ+V1yzNbL2kli7fOxsEOn1hQdPsqFl2s7PdHmPoWy7pljRisO3SQaGjgcvVZPc8kAjdR2RdEpt8PurlNFIwFMYhzFKJq5Q2sbTVWIA2HeRWjVwkwmX4osuQg5FVwo2Kydf6TvnV5dPkxM3KsiAnIIqAUd4K3sqarXjrCceq7reiLzuKb2np8ns9zLlqG9oA+quNd71eoK1pX23YGIaOpy7MQ3hbkB9Cw8uwfyr+Gbi8GRcLJN0jAd8CbbeKgZQDrqEAAIoCnJGBMFaEG0DASFo2jdVm2pPXetexVDxcZDLMDLiVIgmXMZZZym03UxLuiYq5gMIhyYqAOtaqTU2wcPg9z3cdyu7Cm7SWalcVv5f2yZVTCUB0N66adfX9da+zm1hFpKMRZ2jNw7Ry/SFrJzTZEWspGEfJtXjhqVu4OsUUxVTECrppmEFCGAhw108239tm276ZwbvGGMLhu8ZeZNErNo2aglF2oCwWeJKCISAo7yhEFPuR1U1CAmpygEMCZFcKpVUOtYJw/T6xfNPcw7VKl5qff8lPbejZURDe6/X9VcAYANp9dRi2dpS1HUBby88nIFkZeLjJE5ix5G5VEXUeu98qKiC6wppFIzdgYvKKGKZESgKmpTGybF2XWOT1HrUbNuO2HrJqzkQZzZWwKOGTsFBbuUxbLLE3DiiqXdMYqhRTEDEL1a7cpundj843jk9ziNwk3nh8990repotKUqmiVYb/AAi52/SAz/3VgaqtSrDf4Rc7fpAZ/wC6sDVVoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoDxb1/obPf2Y6/ZGqV7EX4omIv7pR/7IKql6/wBDZ7+zHX7I1SvYi/FExF/dKP8A2QUBbqUpQClKUApSlAfIh+atcdvFmhIYTio92U3IOr6tVBUCHMUwkPLtwHQxRAxR0H1gICH1DWxu6P21rlt4tAfYRi2RjiUHF82qiJg+relm4a/51ir8OE8N5aPxK8cdxlnRh2dbYhpNOGxrGWuxcNGyT89vGWiVFCNViuUFTHZHTOKyaqZTlW15UOsANoYQHsRGFMSXLbCruBe3knBXSmlIkRZXtPM24JKaqF5BEjsgNUzAqImSSKmUdQAxeoACTROyvfdxvIJzleBsR0hANGLNFojILyKKx2ca7bIuhKs0SAp+VcJqAQQPyYk3gOYxSjWAz+xNl6TxkNmQts4nglRbsmqjRo4Ksgq7bs3CJpryh3ELmTeLKLp8pyaJVhIgno8A3XWn5q6lU5Sah7029puejaxWc32c0ytmLNzPBpKMO05xbBbWydx7LOFrnM8LI29LopyBUk3CMfc8owRMmRoDPcBNu5TIUhmxSJKFKAAoVNPlAPuF0yhziXHjxVddzAb53Lpy9UHypcN5Zw18lWN1H6t5D0NA6g9YABuuohfGydM3BI3Jc0Hzaa3BcEg/UcyKplgcO41WNSQJHrLFT5TkDrpaqJgIkADCcCnPqUctxBYl3WG3msdls2FtRjPFfTJCWw4OeKto5yoIINGYqN0AWMoKbl2cSppgmoYQEmihDn5V1OqmXTLdMtcWk3S2+CxdpSUS6ZlNlTklVC4LBNRhkoWTxxMmNs44k+lF5drETLFw4SFLVjckm0I3MKREjLt00nBSNnBk0ykM4SAixiicpjiBzgbr3Rs62RdETZ1sA4l4+BtFw5cJoMph+3eOeWbqpG3nyLgjneMKxjnOZQwq6mA+u8I1BLE2fcu2nLvSwOMcfwT+FTji+Rs5V42h5Eqka/auHJHQR+8LnlFSKnJyBtd7QygmNvjl+DtmC/MX5fLfk7KMH7UYpNoq9bv25XCmjRBEGp0xiwcqN0zI6kA0iJAEpDAgQfRDtUtquqhuaUlD3u7iOGU74s7GaZopTpUPduwWOHONyd1cp7PZpwqxfv3zG13aJZCPUilGZZuQ8hSaqAgChEGnL8g3E3krfeMkQhh5MNRHUdfehcOWBAX69yXER0glOv010lDnmHqrQgLiiZcUmh1hbomUFuiJjJplMYSaiI6jrJ8ZbO91WbdFwzT6LtKPM+jpNgrKRThVR7dCzl3yyT2UA6BOTVRKAkKAKOR/0hXQ5SgBTYTbmxbP2dftoz1pqQ0Swh4NixWcRjlq1cx7pNuom4OgCkWuusVdRQyigkeNOVE5uUKces3NV1OHGSS6tyuUUpv/AFJNJpm4SbpylvsqYfO7VpwcYwbGGwxjYz5tIjbYeVMXi79A/ljj0F1n3l6h9N/QdXQcpoICAfegAF9GvKbbOWIWlzNrsa29IJPmh1lSJknpArQyqpHBDqnaAv5OoruO3BQUOmJylU0KIAUoBr1Yuz5l21Zl4S38Y4/gn8KnGlFmylnjeHkSqRr5q4ckdAw3hc8oqRQ5OQNrvaGUExt8flhsU5DRf3Km/loZ4nP2yMKZ/wDSaSR1AMzQQ8kVKWK8sM2IKIiTWQEgCUhioEH0S6ejpmrRKNnFbm2nNsptLi8w7qCbTtpH+J2e9KVF887TlODk2Be7MuGH7dszUtqQboNgMXcZT8k1BdMU0ExSX5FcvlCQlaofcld4mpNd3UTCPXR2fcIRrmUt5JtJIPLnKm8MgN2SYOSJs3IrkOxEXPKMk0V3Ym/0UUilFcA6gMAVFX+xZcLa8b6UthG32MBckW7j47yZ02YiggqgkmmyOgjFeUA2S5P0ChIGTKJSmKiUeoOxeexY7eybwbHtew4hms1uCOjlkUwZrw7V6kyMkVqUrRQhd5RB8moTqIUkgsfRUTKIqR1OqHVhst8U1+7zmL4W4JlSiaV/FHBqG9rl6y98ovMDgPGtrSkbMW4yn45eMJukKhdEoVF0O8c2+7R8o5N6fVU/puCqG6wDXQA06N4YOxE4k5e/bityaeLOUlVXaLSSlF0hOdAEDrIMG6gkK5FMpQBVFIFtSgYDbwANS8dm6/ktmhTDzaLtJSRVlivDR0gvGuoxJty5VDJtx+giNER6hOAfRZwKYx/9YwKF8dHZUyCSHYRUta+OrikU7IjLdRuSSkFvpG33LZmoisRgAsj7zdYxgETFO2HRRTVM2gAOldvafDntKavWz3vonmYUrdP8rhLtdbst5sA5wtYchZRLCki3E9jEnRHyK7u6ZReSQcEUBQiqcgdwLtMxTB1CRYNAESh6IiA+OGzRh0Xbh4vb0o8O6bC3VI9uKSdJGMZEiKjgE1XBiFdHTIBDugAF1AE++obfPvSZLY1SbPgn2MJaJJ3lXMiaREhxWNJ/TIPGjsTikJhVSbGWRKp98QFDJF+5mGvfwXgLIlgXdlKduJ5bcWne4JAyUt4rdMSqlXfHFydFGPagRTcco9aqjtURTNvLmDdrCrqpodaXmipxxThKf8yVuEdNwrpOydPrduP8rd+M9aTL4ExbM3CW6nELIISZnCrhdZlOP2hXfKAiCiTlNBYhHKBvJ0tUFinS6jeh6Z97w7iwxhm0rOVVuV7eBbbh1PpBwi6vSedogUoFAEzoi6PyrcAKUPJxKZL1+h1jrDLE2fMu2tMvCW/jHH8E/hSRpfI2cs8bw8iVSNftXDkjoI/eFzyipFTk5A2u9oZQTG3x7MHsh5ZZXNcUi7XshBvJ2Ua2UnLI6SKrpYE48qZnIJxqa5wJ5Gt90WduR9Mu4miAmKHWilU1vRpxTSlDycS4Syi0c8moMVNulVNS23KzU2mc5vP5pyZ7K422Z7nnHViysVkR/LyQeXPDHe3YLoG66yrAE13m/vpNTmKuBUDqFQFMqioE5MBUqqReGseRN8LZDYwrhObVMorqaSdnaJrnSKko4SaGVFskudMoEMsRMqhiiYBMIGNrBldjJdWbc3QVjZzS5VF49ZpcCLURkGaiUpIuF1U1uSKoBzNnTRMNDhvCjuCIFKUw+EXZKyWo8xsaNxth2z07Pl2UhILQLhI7l0oi4ZKLPAXWhfKBWWTbKEMmmu3MI7gqLrFESFxoruKrOY/2wr8lCT32yVt6VRdXUT1zXV36XvE2h3g3ATi7XdvuY6XLOzCC0smkS4ZcgtCFdprKKsjFXAkePlB0zaNhSMImHq0E1ehdmzpY1zRVnWwmrKRcBaLly4I2j5Z81dORWbqpHEz5BcjnfMZY51DmOYyomPygm3zCMTf7I96OJuUluZGMHZVHCirwHL1cDXsQ0mV2BZjRiPJ6ED1D5WXfKUAKBeoPVvfA90hYeKcelxnZt5DFy8s6dQcssuW3WKS7Z4dFtyoNVh5BsKyaSAnQADciloVIRLuY/wDx1a8vy5YuHwtvzlvZlFX/AMrh239FPr6RG1DK4z2a8Qxci7lIWHnIpZ6xPG7sbdMqzRaoH5DfBqki5Km0MbyVvvHQKmc3J9YjqbX6S2bsREKmkpBTDlFBgpHoN3dyyblBEqgCCiyaSrgxE3RtTGF0UAcCYxjCpvGERg6myBf6XlLWSjrNuJ4Zgog5ulxKrtJmeSUjSM/o12YzNwVNoQ4CuG8ZyQwoJFM3ADnMHdS2VskqiA/QWO410FgntgXrU6RgFyUomQIkknGImZpAcdFDN1iIqBvnBkmc4cn1qf7syo/Kq3TD/dazvzptgs/zpv1x6XhpxfCY6sBKNZY2etbjlWqRxl0Ty0pKyRgOkqUwCd+4UUNvAcxRKkdXUSgbdKJSm08uNxPg5ebuW2oy3UxkVIOLiJpIF3QCMcQqhWae+JtNd0hwE5B3zAmQDiO6TTGMf4cyW0vSeve7l4KEdzzWTS5KEkln4slHAMipmIqq2Q390GhzCIkL1iUNB6xqJS2xFf0nBJtGdqY4t8qSrHlYOGkUgYyaqDVdE8gud5CuUgciKoGDeaKqAIiILlMGpudDextO1TSbXFtqJ/yqL5rBRMatVU6Xgm0nwtUrf5qssmr3idkbfTxQhmGcPbo3aW5UXBG8sigeb+hE3KzUrjeMlr9GgsZEpDGUAN8DKEAwgdUoG7D/AApiC4lVLccWtJpqRSfKJOUHUizOgLh0LoTtniZyCCvLpb4mRU5RMBAoiUpwKaLXNsYvHrieuC2o2z2lwy7tdZWSXKJXb5upCN2qjZ26RbkUOVd4ksdUQDQSrmU3BOYU68i/9j2+bxYI/Qtl48tFiko1MFnwskgEQUyZXpRVKo6hF0d8BclUL/oG8B1FBKoQSgY+qkqVTF3SqejdnHKXhxXFqXtXdtrHok79VnwzNj3+EMbvrZhbMXjpVOEgzio3ZNp6QbpuTCbfP5YCa5Rfb59Tn8p5XfMY5j7wmMI+QXBGHX8zLR68BPr6x7lqu2dS0sMaVGQBYHAtk1FfJSrHAywHOgAKkBTQRKBw1k1zbIlxSCc1NxKtvBc8wu6K7lHrlQ7p+wPFotysXLoiBTmRO4R1UKUoE0OZQCGOIkHGso7IOTL2tN3CWhYOJLOSekQIlCR66J2cYqkm+KC7ZZeFUBMwndEUMKLZFURE4FXTEN49ri03mJ51WfOFZ+sKJUdrtdKbru7r62NiUdnvGSQviFaXEq3kmfkL1ovdkss1cF3CEMoogdyKR1zAmUTOBLyxjamMcTGMI96fwhjG5k3xJm21FBklnLlwdORdIKcqukkkqoQ6ahTJmEiCWgkEokEgGLum1GpBtBYdu7JuSoFnDWbb0oKVrv2xJycUWISAdnctdx8zEiCpTvkgKc6RRMibqMIKkDeA2MW1sX3MjJ3EyvMYKah5y4WMm+F08bKlmkEZIXRzPGyUUgodXcESADh28AQOcgmAoiI4pe3strHapfClVR2cbUcFi1bKcKpxdQ43tqe6nZn2RsMlhHHaNhBjVOPlwhQdnkCnGfkBfldGci5M4B+K/lYKisYx+UBXe6xDXTqrrQGA8a2tKRstbjKfYOYsm6QqF0ShEXI7yht92j5Ryb0+qp/TcFUN1gGugBpFWmxYyi10ZaHgLOazCJl3xXpETAcJEsyV2zcgbkteURbCsiU/3xCqGSL9zMNdK2tka9FJu91L8j7FVhbsuKFlFWDEqBW71FpIunC4rt0I5sXeURXSIJVzuznEpwUXMUQqqp23t34eZUy+kvku1qSSqeMLvKlrvZ8ZfPYR1hnHTy6JK8XkI5Wk5VTlXXKSbszc6nkYsxOVsKvIEMZuPJmMUgCYCk3hESFEPHgMI4bx+VjGMWzpNV5ILKMhlrkfvnDh2ePFuchFHTg6hxBmgYoJgIgQiQmKUN0RCHRux3f8PkaFuZB/CHjotqqyZg3ft2xohqCjvkmjYikUuv5OKS6ZTpoO2hNN4okOBQMb9ybFasMnaxbdtWwSHhFopwZQ5DJnQeEjXbR7IpHBuYxnXLKsnJTiJTqnZp76iRikOWQnRXbdTH8Sl23QuNr82blqqlTk3O5wvV4WvbkipXFsq44mWKTOLcXBGiRxGmFU1xyjg7do0XTVK3ZmO63mACKRPTbCmICUhusShp6zTZnwwyeRzxraroho1IiZUhmn5kHJyGUORd2kK/JvHBTrKHK4cFUWKcwHA4GABCV4u2achY/wRfeNOQtv6TuJvyDRBd0xeRix+RBM6yqacK1SKdQADfMs3diYSkFQVdBKPl2fss5LtxljlFzb1iu3FnHnRWUVlyCRBB86cKkbNCJQ6QNzARRIvlLTyISDr9yVTIVI2q7N0YpuerV30hTzbiXDzSrbeDuo4L64LpfZUq0S+EsRSsuzi3MFPoPEYFtGtVo+VlmaaDJmsBm4FcN1SETcJmVNuKb4ONxRYCmEhlQH0rrxLj2WtaJj7kNcQNLU3nLGRQueVQk2/wBzMmcRfouCvFN4hjAYDKm3+reAwgGkEt3Y+uc1u2xbN1Q9ikhopbdeQ7TcOgs1+lGzsUlRRYtEXRjJoKFOYW6W/vFKoCnpqn+YvZOyZF5TtO42ydjN4O2Wj9iio05FF4kzVRkU0Wgf8Wi4OkQHbYAID1NAhUhKCBhKU440jr+6dVN6m6nHFS03fNwscZc4FoVK0my/wpK63YNK27hhFix2xgnBUozSu6DtpV8xmyoybUHci+XbppHVB0UrduuqJGqJ1DFUOgkRMhxAu+Q26AB92pinED5H6JgHNzPQtC4k3RPKrqml1I+QSb7oJpqLuBMCPION0yJB5A5VDFMU3WFQyD2RctMLluSSeOLISQlbGUthNViZJE79XkWBE03YJxqbgyQ+SLpnUVduTbioCmml1kr8jbImSxuO0pSHs/Fdqx0NdydxGjYZVEQikgcsVFE2i6kPypgOm0V1IgZjqZT0zqlEQDts0/efd0vyNTycqJ32U4YxdJKeU1PR7VSmpW5rZcx1ccpxvGyzDCWL4t/DSLO0m3lEBAmthgZRVVUqcYIEL5OYpzCVQNCAAGOBjgBjgBtDnA3ax5imxsXtnTay416j5byQLKvpV3ILimkXdRRKq7VUUIimAmAiJTAmTePulDeNrMcnbOL2+MiyORY9SGZTZ/oVGImjlOL+KRbmceVigcC6pGUIuUNCHLygF3TiAAFTFhsiX2xbw4s8fYsh1GEpEOxYMpAziMBZkQ5FZRRs4izEcO3ILbpylBBYgN0xI93jmMXNDdTqmzlLmm5b5J1NvjPFrpXChq9p6pQlzhJLhbcnuhSlKpSVYb/CLnb9IDP/AHVgaqtSrDf4Rc7fpAZ/7qwNVWgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgPFvX+hs9/Zjr9kapXsRfiiYi/ulH/ALIKql6/0Nnv7MdfsjVK9iL8UTEX90o/9kFAW6lKUApSlAKUpQHyAdQVrht5eWHwnFlj10UXQ31aoIKLJCqmRT6Xb7pjEAxRMADoIlAxREOrUPXWyA+sK1v29ZBnEYQjJSQWBFqzvm1nC6ggI7iZJZuYxurr6gARrFWF3HEtKbaSJfjbbAys9krDtyamLJuEZa3Wrx29R8gZLSTo6S4riimpKkV3myiQJKpt2jgDqJLhq2H7mnlMPmzaWkCQ53EvjNPy9tbhnIktx+O4tMisUgkAZD0ithKkIgOgrhvgAt+oQzsdrGHO3RbJYeyKtOuSJvG9vEQjRfKxx26ixH4GF75OCQgioXkzLA43wAoo9Ya+zPbR1uxbxl9BW7JXK3ko2OeMyxqiZXLteQObyJukRwZJMDHSRcrHMqqmCZEi6674aaq/G1g5pthCbbdPDaXlpeKahS4SxU1V56XbZfFZLan/ACzLyhzZXJQntXX6aUgmruXx/HOlmsWDiBfIuEXsyKx1U3sgyWFxogza8kdVTeRcbqaKu+oQdBrIILaPueU2eG+T17tstvIqzKcS+n1mJAgIoouipHcH5CRXTcIgAgAKJvQKJjl3xSEqhCZbCbUlpz87GxTWybvSaOXDeOkZNZs1BrCySyqqJGLr/SBVMryyIpCdBNZEDHT+67pt6vykNqGFhnq4ObCuJ9HN3Lwy0lGC3VRZRrVyRqrIOQVUSOCXL+UABECrqCmgKm7oYArNN26cW37NN09rvOHKapQrhJNWSS9U0n3wlNNqHLaJDhvagus+SMd4pd3fB3KlcoyB37jydMi6wb0msk5aqqSZ3CjcQapFKUrRVIhDAUXO8AFrJcm7VLzH6ORYWOuu1311Qd0s2jWNkHrEqsXEKtGJju1m6rpmB0QUWVADrOES76hSir1FKNmtLKru57+lMeyOMLstt5FsiSAu5RWMVbLIHWOkkYgtHi6hRUFJUxQVIQRKmf1CGlUDQ4/wo4qqVc2afrUn0ah04TDcQXCprNR3h36ynulJ3lmsMfmi9rhxVki+2jtrFzbGxY+UZu496m+bkcnSe6Loplcu2QAIplOAJmUAQECqKLbhRD8onNGWpm8rOgU3aqClvyL21btROxR5ObmSRb9wUSehvJpgDNs5KCRy6lfkKP3ohW0nX6xD+oNa5ARH77/GppFtuppxM9HeOyb5uHkhT5Uk7x8946SljK1Lj9qa+8hKRLDFNwY9UUeMGSz+QO1Wk0WbsY126dNjJIO0hBQqjYifJmUKZMDmE28IAA+fF7S1wyE0SPdXVZVktp4RkCBcazxyeXVM1jzfRscY71AqK4eUD/zW+AComYqG8JzH3E01+99dfIb5R0EOofUH2UrW1VXUrJqEtz3rhMOHa15lim1NKzTmd/64342hwaURe2BdkTGOUHN0WUUsTGbv0MkycPphggSFReFlXZ3MinyjUVzg2EVTJAJlCGM6AQOFZvhjOd15LNC3xJvmahlrWuRQ6EeoQI9wszliNknAJounSOokT9ZHKwBvmAqhgHWtjIS2oW3lZJxEMxQPLvBfvR5Q5uVXEhCCf0hHd9FMgaF0Dq9WojXrAIj1hTSp1w1ZxG/zOmpN8bub4wsLJZpUKHfzTzSqTjhKSVsON24hgvMF1XSoENlSctJKak46JlYpOLQUZAr5a1VXM0Imu4VO4USK3UMKhdzeJqPJk3REfyb5ugoXaHvCx7szXaKcZHW+0kUodRy0aKRYlFYzgy5jKCqY+4CahhMJSFTMkIEL1nUuY6B6x/rrnTTqAa3U50m2lCvbmoXbHCbZCmlrR7Dcu1+TTfeIjJM1euvMo2/mu8YiW2h2zK02Nuvnb1GMkoiQd2wdFNuIuFmv0eCzQQExwT5dV6VYygF5Mg7hawp1nu7k4PHNww+0hb8+zdSDxN3ENLlgAuGdSPIIlaIpooR7hB25TbnMRVBqLX0zgAK6hvjusIGER69K+SlNvdZuv7NKlD2XTN4jrjM9/TPK1XTStM+yX1ftGesW0Bmi77dyfH2TDXVBRxWb2EeN7cEihZy5SqLqCqDRQjgoA3LyRU1C+TrCPpgIlAS6+TY203ka+Nni/L/crW62lrfIhuv4hSPXTj01CkFydVBtIyAFO1IKioisdMTgUN5AgFMA7a6ahqH1VyHX6uqpR5KKqXeW2uEwvy38oNO9dNStETxifru5yapRl0ZDvaHYo2HtI3FKGc3YeFt6ZjWkA4bTkcQiTh29cHBgZNQrcPLEAO25EhjppJm+6GE493I2XZi2bQl8vq5Zi7OiZS74+JiSyqqIpOots5BBcrcFzgkmosfyxYyoEOYzYpNAKJSqk2e0KPoiPqrpxsfHwzFtEQ8e2YsWaZUG7VskVJJFMoaFIQhQAClAAAAAA0AKXpSSyj/xl5fwt7vNUoiEZiW285/O3qsIflURc11c7Q1pxmY7nJDZ7b3NGwkCs8e2oZ5EmEHZk0FWqcYRBEj1cRT3xUOooqkAuEylETAYEvlbItz4zv8AsfGtzZstcJ2YtSSduYGUdoFWXmjHIoRUyqqorC3FQyyaCSYEKVNJQNVN0vJ7GyMZHSrcrSUYNniBVUlypOESqEBVJQqiZ9DAIbxDkKco+sDFAQ0EArtaiA6B6vrqVUuqnYTi0Tn+9dcb5z+FPEtNqtp75jLL0tlGLmx/PZfady8pjNWUYZlUSSLLt26dwzUzaTJNy4LFuFnTJCSaovIsUwWI2FJMxPKTGWEhzpkKZQNjrXuK6j380uaTzVOntWOtkk9c7KYYRbCOZHcJB5MmAg1K5biAEcLqFVdHFMASA28VQBC+CJdNTG9dedPQURdMSvBTrMryOd7pXDc5jARYoGA24cAEN4g6aGIOpTFESmASiID0dXmbjGOX4Y9/NaLmYlUpvCet0/a3JkLy7tGji258gQZbkgl5phasZK2tbz542QXeLnO+ByqmQ501FkyERSOp6YFKVMRE6QCY4eXh3O10ZDWZ3BJhDOFyW1NOSuoqQSVZuhbu25SHBBlIvmhB0PuiArqqlEptDkKcxK2aAfzdQUAdC/YI1xdLqmHk1ycNJ81PJxyjbaaSjBpvjDTa5OOhEMGZguq6VAhsqTlpJTMnHRMrFJxSCjIFQetVVzNCJruFTuFEit1DCoXc3iajyZN0RH8kM3QcLtDXhY915qtEkbG2+0kUodRy0aKRYlFYzgy5jKCqY+4CahhMJCFTMkIEL1nUuY6B6x/rrnQAHqGutTnSbaUK9uahdscJcZGKaX93sNy7X5NN94iMEmapXBnq9rIzneLBO7SZAj0GLhWLtC1HraSeRKiaLUC/SMe1jTPkCmWOqPLA6WDRQoAgI6aT9XafyqEXaSS17vUwSkp5J24kWZLclLnXaS4IIsGLR7ErFXW8nOmHkyZUFjHNu8sU6S2m9g7oaB9YVyBgEdQ66ULZ2Zvsx1ice/WFMmm5VSwb9MMPme+Gaw5/zPeFuZOj7Jhrqgo0rJ7CPW9uCRQs5cpVF1BVBooRwUAbl5IqahfJ1hH0wESgJdfQ2ftoO6cr4su27LuuGzLfcwae99MJrMFWEaJm++cHSLaVd7vIGARMKq7cxyiGqaWg1sboA9frrkPtAdf++s0U7NFVLvLb5TC55b+UCpzVTUrRjxifru5yaVLbRlxyFnYfu+A2grblvLUCoXBDx0/DoTVwPRctk91q1Mwcg5OUorAdugZqbVQuiherTNcj5cmLYtGXzCtlqLs6JlLvjoqJCVWR5J1FtnJUFytwcHBJNRY/lixlQIcxmxSaAUSlVJs+YNfq9fr666sZFsINg2iYePbsmTRIqDZq2SKkkimUNCkIQoABSgAAAAAaAFXK2Mv1afDCIWUNqIJHzo16zLeMpXxNc3G0PacTmK5yQmem9zxsJArvHtqneRIiDsxEFWycYRFEj1cRT3xUOooqkAuEylETAYEsJuDJ2Y8fZetDG6uVmRnhotieTiHsiyE7uRd+XKrqlaLoGeuWZFCpFFZu6STapgXVNUqSwF3CkY2NlkAaSke2fIFVRXBJwkVQgKpKFUTPoYBDeIchTlH1gYoCGggFdsNAHrrLpsknhHpP1znBcTS/enOfWPaHhGL4RqDiTaEya5wpkvIBJF9fB7WZtVY5/JOIFZNR8KGrxMi0Mt5GdqiPJqhvqkVKU5yqnIAAcMoh9o2akcBxeV7jui2Ykid2Rsc/mWr2NGOUYHk0EllDGQevm7cBSUOQweVKGKJRNvEEQAuyxhEP9X1/VXyUwG6hHrrVb2q9pL+G2Xlab/mSaeV7zYzHlVPO+d00u2PTI04ntrW5Lkuu/bYhjWw7txhFOXMSZjNNUni7YqKJ0nxVm0oV8oirvm3RSZpFApiGK4OH31VvbLWRbby0rDNF7ZTtGMcwLV6m5YrGfuDSSq6ZjkcA4KkgVHkyH9JFTfATF9DQDVc9Cj1h1/bXOobw9WulEvwxlE/5od55q3DLBFd9rjMcJUKOWPHPeQraTyxb1r40iLhhc7pWY5uBUpLbkWryJBlKLKImOkKy79FZErQC6KnUIJTbpQAhjHOQh/E2kcvu4bHsXOY8z3ZUE4aSIlk1D3NGsDyBQYmWBo1VdMn6fLmFVqqVPkd4yZi6GKBgEdkNQ+r/ABr5ETBrqHqqRKajNNdIt77scN+qWk6W1MJzxn4oxeN721DuvaNko+4LzPYeYxfS0JZ6z95Z9xqxaKsTIGQbqpikg3bA+MLdEVlnIn5ZMomAhQEwGKl71rZ3u5lgJxd7m+oF45a3GnDHvWXftpeBTbqLJAZ6Dlm2jEnDYnKGR3ikSAqxDFMcQIY1bP66dZh//wBU3tA9XVV9oVuTl8bq2MxeZMQ1SlN736Rys/Num0QaXYe2nskq33ZuN5ORt2ajpgVjjJLPWaTiaKq8e6umQuZQrgUEwTTAiSLZ5qUol5UmnVukBvSENf8AKuN3TUQLrX0UNB1q8OLfR4Lp8tCRK88EuqxfX5mS3Df4Rc7fpAZ/7qwNVWpVhv8ACLnb9IDP/dWBqq1TQpSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUB4t6/wBDZ7+zHX7I1SvYi/FExF/dKP8A2QVVL1/obPf2Y6/ZGqV7EX4omIv7pR/7IKAt1KUoBSlKAUpSgOK1v29o5nLYPjIqQRBZq8vm1m66YiIAdM8s3KYvV19YCIVsh1aaDWvG3P8Agegv0gWj++G1RpNQ8CptOUJvY1sm7LTG1Lsvy5bjKKrQDPpmLgnrjyVsgoi3alBaOMkmUgLriCxEyuN5U2qwhoAZN0dINS2XcGFySUa9NOIzcfLRKSKTmMM3AiLRNErgi6RiptUk0BBQhymAVDbpRP1V4wAIbv21wA/7RqVTU25xab3yoafNNJp4zO9zjZTSpawmOTlNcmnDWDtayiBv9j6ylZuGu5rcLw1wW4yWJFv38NFLqlkTiup5eq4K1TdmP5Q5UXFFNwkgJuoEyl6q9a8dlTG18tLHi7g31o2xE00WTM0XGOOXIQyRtDuHDVV0iJhRLvGbLImNqO8IjoIWnX7RrgPWOo0pbpw3z1vf19tyg6U8d0dLW9Pfe5xZnYaMc9l5SMuCVav5yWQlHzsoN1FFCJFTIVoAKJGKVvyaQE0KAHADnMBwUMJ6yr/Ogj9Wlchr9dRWt8wj8jWNzmlKVsClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUBCImVyRjbJOUlkcB3rdUddV0NZuNkoSQgyoKIFgotmYpivJFusU5VmSwCAp6abogI61kXnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQEq88mRe6dlX3lavGaeeTIvdOyr7ytXjNVWlASrzyZF7p2VfeVq8Zp55Mi907KvvK1eM1VaUBKvPJkXunZV95WrxmnnkyL3Tsq+8rV4zVVpQESu7MGQV7Umkj7K+UkSnjnJTKHkbXEpAFI3pDuzAjoHr6gEfsAa/LYhOY+yLiMTJHJ/yTYBobd10BMAAeoR6h9YfXoPXoPVVYvX+hs9/Zjr9kapXsRfiiYi/ulH/sgoC3UpSgFKUoBSlKAVrN/wAIKySkMCsGqyzlIp72tconbOlG6hd6UQKIlUTMU5RADCIGAQEo6GAQEAENma1n/wCEDVdI4Hjjsoxy/X572wKbduZIqihglEBKQBVOQgCYQAoamANTBqIBqIAdbzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdLzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdLzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdLzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdLzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdLzNW57aZV8U7m/n6eZq3PbTKvinc38/Xd5y5e7q+SPetscXpzly93V8ke9bY4vQHS8zVue2mVfFO5v5+nmatz20yr4p3N/P13ecuXu6vkj3rbHF6c5cvd1fJHvW2OL0B0vM1bntplXxTub+fp5mrc9tMq+Kdzfz9d3nLl7ur5I962xxenOXL3dXyR71tji9AdXzPW+KZUhvLKW6UwmAfOfcuuo6esfL9RDqDqHqDr09Y18eZq3PbTKvinc38/XfG48tgmU4bL2RRMJhASfSls6gAadY/wDG2mg6j6h16h106tfnnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6A6Xmatz20yr4p3N/P08zVue2mVfFO5v5+u7zly93V8ke9bY4vTnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6A6Xmatz20yr4p3N/P08zVue2mVfFO5v5+u7zly93V8ke9bY4vTnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6A6Xmatz20yr4p3N/P08zVue2mVfFO5v5+u7zly93V8ke9bY4vTnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6A6Xmatz20yr4p3N/P08zVue2mVfFO5v5+u7zly93V8ke9bY4vTnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6A6Xmatz20yr4p3N/P08zVue2mVfFO5v5+u7zly93V8ke9bY4vTnLl7ur5I962xxegOl5mrc9tMq+Kdzfz9PM1bntplXxTub+fru85cvd1fJHvW2OL05y5e7q+SPetscXoDpeZq3PbTKvinc38/TzNW57aZV8U7m/n67vOXL3dXyR71tji9OcuXu6vkj3rbHF6Ax+6MP2+jbMusW8comEjBwYAPk+5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' // Adicione a string base64 completa da sua imagem

    // Adiciona a imagem do formulário
    doc.addImage(imgData, 'PNG', 0, 0, 210, 297);


    // Adiciona um espaço
    doc.text(' ', 10, 30);

    // Adiciona os dados do formulário
    doc.setFontSize(12);
    doc.text(`${nome}`, 51, 50);
    doc.text(`${dataNascimentoFormatada}`, 51, 60);
    doc.text(`${rg}`, 51, 70);
    doc.text(`${ssp}`, 130, 71);
    doc.text(`${cpfFormatado}`, 155, 70);
    doc.text(`${dataHojeFormatada}`, 163, 21);
    doc.text(`${dataAgendamentoFormatada}`, 51, 142.3);
    doc.text(`${horario}`, 75, 142.3);
    doc.text(`${cidade}`, 160.4, 102);
    doc.text(`${nomeMae}`, 50, 81);
    doc.text(`${endereco}`, 50, 91.2);
    doc.text(`${numCasa}`, 170.4, 91.2);
    doc.text(`${bairro}`, 50, 102);
    doc.text(`${telefone1Formatado}`, 51, 112);
    doc.text(`${telefone2Formatado}`, 155, 112);
    doc.text(`Atendente: ${atendente}`, 137.5, 28.5);

    if (sexo === 'masculino') {
        doc.text('X', 162, 60); // Posição para masculino
    } else if (sexo === 'feminino') {
        doc.text('X', 132, 60); // Posição para feminino
    }

    if (deficiencia === 'TEA') {
        doc.text('X', 75, 154); // Posição para TEA
    } else if (deficiencia === 'mental') {
        doc.text('X', 51, 154); // Posição para mental
    } else if (deficiencia === 'fisico') {
        doc.text('X', 95, 154); // Posição para fisico
    } else if (deficiencia === 'visual') {
        doc.text('X', 163, 154); // Posição para visual
    } else if (deficiencia === 'auditivo') {
        doc.text('X', 132.5, 154); // Posição para auditivo
    }


    // Salva o PDF
    const nomeArquivo = `${nome.replace(/ /g, '_')}_${cpfFormatado}_${atendente}.pdf`; // Substitui espaços por sublinhados

    if (cpfResponsavel) {
        doc.addPage(); // Adiciona uma nova página
        doc.setFontSize(18);
        doc.setFontSize(12);

        const URLLogo = 'https://res.cloudinary.com/dizojordc/image/upload/v1752668791/WhatsApp_Image_2025-07-16_at_7.38.50_AM_1_1_lreghf.png';
        const logoImg = await carregarImagem(URLLogo); // await agora dentro de uma função async
        doc.addImage(logoImg, 'PNG', 10, 10, 50, 20);

        // Adiciona o texto institucional ao lado da imagem
        doc.setFontSize(9);
        textY = 15
        textLines.forEach(line => {
            doc.text(line, 65, textY);
            textY += 4;
        });



        const textoPrincipal = `Eu, ${nomeMae}, inscrito(a) no CPF sob o nº ${cpfFormatadoResponsavel}, responsável pelo(a) menor ${nome}, inscrito(a) no CPF sob o nº ${cpfFormatado}, faço a opção pela utilização da catraca, visando à maior disponibilidade de assentos no transporte coletivo. A partir deste momento, fico ciente da necessidade do RECONHECIMENTO FACIAL DO BENEFICIÁRIO, previamente cadastrado no sistema`
        const textoResponsavel = `Eu, ${nomeOutroResponsavel}, inscrito(a) no CPF sob o nº ${cpfFormatadoResponsavel}, responsável pelo(a) menor ${nome}, inscrito(a) no CPF sob o nº ${cpfFormatado}, faço a opção pela utilização da catraca, visando à maior disponibilidade de assentos no transporte coletivo. A partir deste momento, fico ciente da necessidade do RECONHECIMENTO FACIAL DO BENEFICIÁRIO, previamente cadastrado no sistema`
        const textoAssinatura = `Aracaju/SE, ${dataHojeFormatadaExtenso}.\n\n________________________________________________\nAssinatura do(a) Responsavel`;


        // Exibe as informações do responsável
        if (autorizacao) { // Se for CPF da mãe
            doc.setFontSize(16)
            doc.text(`Autorização para Utilização da Catraca`, 105, 100, { align: 'center' });
            doc.setFontSize(12)
            adicionarTextoJustificado(doc, textoPrincipal, 170, 20, 120);
            doc.text(textoAssinatura, 105, 160, { align: 'center' });

        } else { // Se for CPF do outro responsável
            doc.setFontSize(16)
            doc.text(`Autorização para Utilização da Catraca`, 105, 100, { align: 'center' });
            doc.setFontSize(12)
            adicionarTextoJustificado(doc, textoResponsavel, 170, 20, 120);
            doc.text(textoAssinatura, 105, 160, { align: 'center' })
        }
    }
    doc.save(nomeArquivo);

});


credencialEstacionamento.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;



    // Captura dados do formulário

    // Captura o nome do atendente da URL
    const params = new URLSearchParams(window.location.search);
    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const ssp = document.getElementById('ssp').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const dataHoje = document.getElementById('dataHoje').value;
    const cidade = document.getElementById('cidade').value;
    const endereco = document.getElementById('endereco').value;
    const numCasa = document.getElementById('numCasa').value;
    const bairro = document.getElementById('bairro').value;
    const telefone1 = document.getElementById('telefone1').value;
    const dataAgendamento = document.getElementById('dataAgendamento').value;
    const horario = document.getElementById('horario').value;

    const cpfFormatado2 = formatarCPF(cpf);



    // Formata as datas e o telefone
    const dataAgendamentoFormatada = formatarData(dataAgendamento);
    const dataNascimentoFormatada = formatarData(dataNascimento);
    const dataHojeFormatada = formatarDataHoje(dataHoje);
    const telefone1Formatado = formatarTelefone(telefone1);

    // Cria o PDF
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Texto Principal
    const textoPrincipal = `Eu, ${nome}, portador(a) do RG nº ${rg} SSP ${ssp}, inscrito(a) no CPF sob o nº ${cpfFormatado2}, residente e domiciliado em ${endereco}, ${numCasa}, ${bairro}, ${cidade}, estado de Sergipe, com telefone nº ${telefone1Formatado}, nascido(a) em ${dataNascimentoFormatada}, solicito à Superintendência Municipal de Transporte e Trânsito de Aracaju, o cadastramento para recebimento de credencial e vaga especial em estacionamentos, por estar enquadrado(a) no que dispõe a resolução do CONTRAN nº 965, de 17 de maio de 2022. Declaro que as informações acima são verdadeiras e estou ciente da forma de utilização da credencial e as consequências do seu uso indevido.`;

    const textoAssinatura = `Aracaju/SE, ${dataHojeFormatada}.\n\n________________________________________________\nAssinatura do Requerente`;

    const textoDataAgendada = `\n\n\n\n\n\nDATA AGENDADA PARA PERÍCIA: ${dataAgendamentoFormatada}  ${horario}`



    //Adiciona a imagem do logo
    const logoURL = 'https://res.cloudinary.com/dizojordc/image/upload/v1752668791/WhatsApp_Image_2025-07-16_at_7.38.50_AM_1_1_lreghf.png';
    const logoImg = await carregarImagem(logoURL);
    doc.addImage(logoImg, 'PNG', 10, 10, 50, 20);

    // Adiciona o texto institucional ao lado da imagem
    doc.setFontSize(9);


    let textY = 15;
    textLines.forEach(line => {
        doc.text(line, 65, textY);
        textY += 4;
    });

    // Título centralizado
    doc.setFontSize(12);
    doc.text('REQUERIMENTO DE CREDENCIAL', 105, textY + 15, { align: 'center' });
    doc.text('ESTACIONAMENTO ESPECIAL PARA IDOSO E DEFICIENTE', 105, textY + 20, { align: 'center' });

    // Desenha os retângulos e adiciona os textos
    const rectY = textY + 27; // Coordenada Y para a parte superior dos retângulos
    const rectWidth = 8; // Largura dos retângulos (aumentada)
    const rectHeight = 8; // Altura dos retângulos (aumentada)
    const marginX = 25; // Margem esquerda para o primeiro retângulo (aumentada para separar mais os retângulos)

    // Desenha retângulo para "IDOSO"
    doc.rect(85 - marginX, rectY + 1, rectWidth, rectHeight); // Posição do retângulo "IDOSO"
    doc.text('IDOSO', 68 - marginX + rectWidth / 4, rectY + 7); // Centraliza o texto dentro do retângulo

    // Desenha retângulo para "DEFICIENTE"
    doc.rect(125 + marginX, rectY + 1, rectWidth, rectHeight); // Posição do retângulo "DEFICIENTE"
    doc.text('DEFICIENTE', 97 + marginX + rectWidth / 4, rectY + 7); // Centraliza o texto dentro do retângulo
    doc.text('X', 125.5 + marginX + rectWidth / 4, rectY + 7); //marca o X no quadrado de deficiente

    let y = rectY + 20; // Ajusta a posição do corpo do texto para começar abaixo dos retângulos



    const textoEndereco = "Rua Roberto Fonseca, 200, Inacio Barbosa, Aracaju-SE\nFone: (79) 98836-6535 e 98836-6497";
    y += 15; // Ajusta a posição para o novo bloco de texto
    doc.setFontSize(9);
    //doc.text(textoEndereco, 105, 182, { align: 'center' }); // Centraliza o texto no eixo X

    // Chama a função de texto justificado para o corpo do texto principal
    doc.setFontSize(12);
    y = adicionarTextoJustificado(doc, textoPrincipal, 170, 20, 80);

    // Adiciona o texto de assinatura e data centralizado
    doc.text(textoAssinatura, 105, y + 10, { align: 'center' });
    doc.text(textoDataAgendada, 20, y + 10);
   
    doc.addImage(logoImg, 'PNG', 10, 192, 50, 20);

    // Adiciona o texto institucional ao lado da imagem
    doc.setFontSize(9);
    textY = 197
    textLines.forEach(line => {
        doc.text(line, 65, textY);
        textY += 4;
    });
    
    doc.setFontSize(12);
    // 1️⃣ Espaço após o cabeçalho   

    textY += 5;
    doc.text('DECLARAÇÃO', 105, textY, { align: 'center' });
    textY += 8;
    // TEXTO PRINCIPAL – centralizado em bloco
    const textoEntrega =
        `Eu, ${nome}, inscrito(a) no CPF sob o n° ${cpfFormatado2}, declaro que recebi nessa data o Cartão de Estacionamento Especial, N° ___________________________, na seguinte data:`;

    doc.text(textoEntrega, 105, textY, {
        align: 'center',
        maxWidth: 160
    });

    // DATA
    textY += 20;
    doc.text(
        'Aracaju, ________ de __________________ de ___________',
        105,
        textY,
        { align: 'center' }
    );

    // ASSINATURA
    textY += 13;
    doc.text(
        '_______________________________________',
        105,
        textY,
        { align: 'center' }
    );

    textY += 6;
    doc.text(
        'Assinatura',
        105,
        textY,
        { align: 'center' }
    );
    
    // RODAPÉ FIXO
    doc.setFontSize(9);
    const pageHeight = doc.internal.pageSize.height;  
    doc.text(
        'SMTT, Rua Roberto Fonseca, 200, Inácio Barbosa, Aracaju - SE.\nFones: (79) 98836-6535 e 98836-6497',
        105,
        pageHeight - 20,
        { align: 'center' }
    );


    const atendente = document.getElementById("atendenteManual").value;
    // Salva o PDF com o nome personalizado
    const nomeArquivoCredencial = `${nome.replace(/ /g, '_')}_${cpfFormatado2}_${atendente}.pdf`;
    doc.save(nomeArquivoCredencial);
});

trocarCinzaRoxo.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf; // Acessa jsPDF do objeto global
    let autorizacao2 = false;

    // Captura o nome do atendente da URL
    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const ssp = document.getElementById('ssp').value;
    const cpf = document.getElementById('cpf').value;
    const dataHoje = document.getElementById('dataHoje').value;
    const cidade = document.getElementById('cidade').value;
    const endereco = document.getElementById('endereco').value;
    const numCasa = document.getElementById('numCasa').value;
    const bairro = document.getElementById('bairro').value;
    const telefone1 = document.getElementById('telefone1').value;
    const dataHojeFormatada = formatarDataHoje(dataHoje);
    const telefone1Formatado = formatarTelefone(telefone1);
    const dataNascimento = document.getElementById('dataNascimento').value
    const atendente = document.getElementById("atendenteManual").value;


    const numeroCartao = prompt("Informe o número do cartão:");

    if (numeroCartao === null || numeroCartao.trim() === "") {
        alert("Número do cartão não informado.");
    }



    const hoje = new Date();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const mesNascimento = new Date(dataNascimento).getMonth();
    const diaNascimento = new Date(dataNascimento).getDate();
    const cpfFormatado3 = formatarCPF(cpf);

    // Calcula a idade
    let idade = hoje.getFullYear() - anoNascimento;

    // Ajusta a idade se ainda não tiver feito aniversário este ano
    if (hoje.getMonth() < mesNascimento || (hoje.getMonth() === mesNascimento && hoje.getDate() < diaNascimento)) {
        idade--;
    }


    const mensagem = `Deseja fazer em nome do beneficiario ${nome}?`;
    autorizacao2 = confirm(mensagem);



    // Cria um novo documento PDF em branco
    const doc = new jsPDF();

    const textoObs = "Estou ciente que esse cartão ficara retido no ato da solicitação da troca para confecção da segunda via, que será produzida em até 2 dias úteis para retirada no CEAC Parque Shopping ou CEAC Rodoviária Nova, Aracaju/SE."

    const textoAssinatura = `Aracaju/SE, ${dataHojeFormatada}.\n\n\n\n\n________________________________________________\nAssinatura do Requerente`;

    const textoAssinaturaCoordenador = `________________________________________________\nMARIA SOLANGE DA SILVA`;

    const textoObsCoordenador = "Chefe do Núcleo de Atendimento - SMTT"

    const textoEndereco = "______________________________________________________________\nSMTT, Rua Roberto Fonseca, 200, Inacio Barbosa, Aracaju-SE\nFone: (79) 98836-6535 e 98836-6497";

    //Adiciona a imagem do logo
    const logoURL = 'https://res.cloudinary.com/dizojordc/image/upload/v1752668791/WhatsApp_Image_2025-07-16_at_7.38.50_AM_1_1_lreghf.png';
    const logoImg = await carregarImagem(logoURL);
    doc.addImage(logoImg, 'PNG', 10, 10, 50, 20);

    // Adiciona o texto institucional ao lado da imagem
    doc.setFontSize(9);


    let textY = 15;
    textLines.forEach(line => {
        doc.text(line, 65, textY);
        textY += 4;
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    adicionarTextoJustificado(doc, textoObs, 170, 20, 105);
    doc.setFontSize(15);
    doc.text("REQUERIMENTO", 100, 40, { align: 'center' });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(textoAssinatura, 100, 130, { align: 'center' });
    doc.setFontSize(9);
    doc.text(textoEndereco, 100, 278, { align: 'center' });




    if (autorizacao2) {

        const textoPrincipal = `O Núcleo de Atendimento da Perícia Médica com base nas Leis n° 1.723/91 e n° 1.325/1987 comunica que o(a) requerente ${nome} portador(a) do RG nº ${rg} SSP ${ssp} e inscrito(a) no CPF sob o nº ${cpfFormatado3}, residente e domiciliado na ${endereco}, ${numCasa}, ${bairro}, ${cidade}, telefone nº ${telefone1Formatado}, solicita a substituição do Cartão Mais Aracaju Gratuidade da COR CINZA de nº ${numeroCartao} para a COR ROXA que NÃO PERMITE o acesso à parte traseira dos ônibus mediante a validação da biometria facial do beneficiário.`


        doc.setFontSize(12);
        adicionarTextoJustificado(doc, textoPrincipal, 170, 20, 50);

        doc.text(textoAssinaturaCoordenador, 100, 205, { align: 'center' });
        doc.setFontSize(10);
        doc.text(textoObsCoordenador, 100, 215, { align: 'center' });


    } else {
        const nomeRequerente = prompt("Informe o nome do requerente:");
        const cpfRequerente = prompt(`Informe o CPF de ${nomeRequerente}:`);
        const cpfRequerenteFormatado = formatarCPF(cpfRequerente);
        const rgRequerente = prompt(`Informe o RG de ${nomeRequerente}:`);
        const sspRequerente = prompt("SSP:");

        const textoPrincipal1 = `O Núcleo de Atendimento da Perícia Médica com base nas Leis n° 1.723/91 e n° 1.325/1987 comunica que o(a) requerente ${nomeRequerente} portador(a) do RG nº ${rgRequerente} SSP ${sspRequerente} e inscrito(a) no CPF sob o nº ${cpfRequerenteFormatado}, residente e domiciliado na ${endereco}, ${numCasa}, ${bairro}, ${cidade}, telefone nº ${telefone1Formatado}, AUTORIZO a substituição do Cartão Mais Aracaju Gratuidade da COR CINZA de nº ${numeroCartao} para a COR ROXA que NÃO PERMITE o acesso à parte traseira dos ônibus mediante a validação da biometria facial do beneficiário.`

        doc.setFontSize(12);
        adicionarTextoJustificado(doc, textoPrincipal1, 170, 20, 50);

        doc.text(`Para preenchimento da SMTT:\n\nNome do beneficiário: ${nome}\nCPF: ${cpf}`, 15, 185);

        doc.text(textoAssinaturaCoordenador, 100, 235, { align: 'center' });
        doc.setFontSize(10);
        doc.text(textoObsCoordenador, 100, 245, { align: 'center' });





    }
    // Salva o PDF com o nome personalizado
    const nomeCinzaRoxo = `${nome.replace(/ /g, '_')}_${cpfFormatado3}_${atendente}.pdf`;
    doc.save(nomeCinzaRoxo);
});


trocarRoxoCinza.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf; // Acessa jsPDF do objeto global



    let autorizacao = false;

    // Captura o nome do atendente da URL

    const nome = document.getElementById('nome').value;
    const rg = document.getElementById('rg').value;
    const ssp = document.getElementById('ssp').value;
    const cpf = document.getElementById('cpf').value;
    const dataHoje = document.getElementById('dataHoje').value;
    const cidade = document.getElementById('cidade').value;
    const endereco = document.getElementById('endereco').value;
    const numCasa = document.getElementById('numCasa').value;
    const bairro = document.getElementById('bairro').value;
    const telefone1 = document.getElementById('telefone1').value;
    const dataHojeFormatada = formatarDataHoje(dataHoje);
    const telefone1Formatado = formatarTelefone(telefone1);
    const dataNascimento = document.getElementById('dataNascimento').value;
    const atendente = document.getElementById("atendenteManual").value;

    const numeroCartao = prompt("Informe o número do cartão:");
    const cpfFomatado4 = formatarCPF(cpf);

    // Salva o PDF com o nome personalizado
    const nomeRoxoCinza = `${nome.replace(/ /g, '_')}_${cpfFomatado4}_${atendente}.pdf`;




    if (numeroCartao === null || numeroCartao.trim() === "") {
        alert("Número do cartão não informado.");
    }




    const hoje = new Date();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const mesNascimento = new Date(dataNascimento).getMonth();
    const diaNascimento = new Date(dataNascimento).getDate();

    // Calcula a idade
    let idade = hoje.getFullYear() - anoNascimento;

    // Ajusta a idade se ainda não tiver feito aniversário este ano
    if (hoje.getMonth() < mesNascimento || (hoje.getMonth() === mesNascimento && hoje.getDate() < diaNascimento)) {
        idade--;
    }

    const mensagem = `Deseja fazer em nome do beneficiario ${nome}?`;
    autorizacao = confirm(mensagem);



    // Cria um novo documento PDF em branco
    const doc = new jsPDF();

    const textoObs = "Estou ciente que esse cartão ficara retido no ato da solicitação da troca para confecção da segunda via, que será produzida em até 2 dias úteis para retirada no CEAC Parque Shopping ou CEAC Rodoviária Nova, Aracaju/SE."

    const textoAssinatura = `Aracaju/SE, ${dataHojeFormatada}.\n\n\n\n\n________________________________________________\nAssinatura do Requerente`;

    const textoAssinaturaCoordenador = `________________________________________________\nMARIA SOLANGE DA SILVA`;

    const textoObsCoordenador = "Chefe do Núcleo de Atendimento - SMTT"

    const textoEndereco = "______________________________________________________________\nSMTT, Rua Roberto Fonseca, 200, Inacio Barbosa, Aracaju-SE\nFone: (79) 98836-6535 e 98836-6497";

    //Adiciona a imagem do logo
    const logoURL = 'https://res.cloudinary.com/dizojordc/image/upload/v1752668791/WhatsApp_Image_2025-07-16_at_7.38.50_AM_1_1_lreghf.png';
    const logoImg = await carregarImagem(logoURL);
    doc.addImage(logoImg, 'PNG', 10, 10, 50, 20);

    // Adiciona o texto institucional ao lado da imagem
    doc.setFontSize(9);


    let textY = 17;
    textLines.forEach(line => {
        doc.text(line, 65, textY);
        textY += 4;
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    adicionarTextoJustificado(doc, textoObs, 170, 20, 105);
    doc.setFontSize(15);
    doc.text("REQUERIMENTO", 100, 40, { align: 'center' });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(textoAssinatura, 100, 130, { align: 'center' });
    doc.setFontSize(9);
    doc.text(textoEndereco, 100, 278, { align: 'center' });

    if (autorizacao) {
        const textoPrincipal = `O Núcleo de Atendimento da Perícia Médica com base nas Leis n° 1.723/91 e n° 1.325/1987 comunica que o(a) requerente ${nome} portador(a) do RG nº ${rg} SSP ${ssp} e inscrito(a) no CPF sob o nº ${cpfFomatado4}, residente e domiciliado na ${endereco}, ${numCasa}, ${bairro}, ${cidade}, telefone nº ${telefone1Formatado}, solicita a substituição do Cartão Mais Aracaju Gratuidade da COR ROXA de nº ${numeroCartao} para a COR CINZA que PERMITE o acesso à parte traseira dos ônibus mediante a validação da biometria facial do beneficiário.`

        doc.setFontSize(12);
        adicionarTextoJustificado(doc, textoPrincipal, 170, 20, 50);

        doc.text(textoAssinaturaCoordenador, 100, 205, { align: 'center' });
        doc.setFontSize(10);
        doc.text(textoObsCoordenador, 100, 215, { align: 'center' });

    }
    else {
        const nomeRequerente = prompt("Informe o nome do requerente:");
        const cpfRequerente = prompt(`Informe o CPF de ${nomeRequerente}:`);
        const cpfFormatado5 = formatarCPF(cpfRequerente);
        const cpfRequerenteFormatado = formatarCPF(cpfRequerente);
        const rgRequerente = prompt(`Informe o RG de ${nomeRequerente}:`);
        const sspRequerente = prompt("SSP:");

        const textoPrincipalTEA =
            `O Núcleo de Atendimento da Perícia Médica com base nas Leis n° 1.723/91 e n° 1.325/1987 comunica que o(a) requerente ${nomeRequerente} portador(a) do RG nº ${rgRequerente} SSP ${sspRequerente} e inscrito(a) no CPF sob o nº ${cpfFormatado5}, residente e domiciliado na ${endereco}, ${numCasa}, ${bairro}, ${cidade}, telefone nº ${telefone1Formatado}, AUTORIZO a substituição do Cartão Mais Aracaju Gratuidade da COR ROXA de nº ${numeroCartao} para a COR CINZA que PERMITE o acesso à parte traseira do ônibus mediante a validação da biometria facial do beneficiário.`

        doc.setFontSize(12);
        adicionarTextoJustificado(doc, textoPrincipalTEA, 170, 20, 50);

        doc.text(`Para preenchimento da SMTT:\n\nNome do beneficiário: ${nome}\nCPF: ${cpfFomatado4}`, 15, 185);

        doc.text(textoAssinaturaCoordenador, 100, 235, { align: 'center' });
        doc.setFontSize(10);
        doc.text(textoObsCoordenador, 100, 245, { align: 'center' });

    }

    doc.save(nomeRoxoCinza);
});

