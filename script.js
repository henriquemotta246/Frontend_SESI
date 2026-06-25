
function executarSistema() {

    // Entrada
    const nome = document.getElementById("inputNome").value.trim();
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    // Saída
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");
    const opcaoVIP = document.getElementById("opcaoVIP");

    // Validação
    if (!nome || isNaN(idade) || isNaN(valor)) {
        alert("Preencha todos os campos!");
        return;
    }

    // Salva último cliente
    localStorage.setItem("ultimoCliente", nome);

    // Busca cliente
    let cliente = JSON.parse(localStorage.getItem(nome));

    if (!cliente) {
        cliente = {
            nome: nome,
            compras: 0,
            totalGasto: 0,
            vip: false
        };
    }

    if (idade >= 16) {

        cliente.compras++;
        cliente.totalGasto += valor;

        if (cliente.compras >= 6 || cliente.totalGasto >= 3500) {
            cliente.vip = true;
        }

        localStorage.setItem(nome, JSON.stringify(cliente));

        msg.innerHTML = `✅ Venda autorizada para ${nome}`;
        msg.style.color = "#00ff88";

        if (cliente.vip) {
            opcaoVIP.disabled = false;
            document.getElementById("inputVIP").value = "true";
        }

        let valorFinal = (valor > 500 || cupom)
            ? valor * 0.85
            : valor;

        const estoque = [
            "Placa de Vídeo",
            "Processador",
            "Memória RAM"
        ];

        lista.innerHTML = "";

        estoque.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `✔ ${item} reservado`;
            lista.appendChild(li);
        });

        relatorio.style.display = "block";

        relatorio.innerHTML = `
            <strong>📋 RESUMO DO PEDIDO</strong>
            <hr>

            Cliente: ${cliente.nome}<br>
            Compras realizadas: ${cliente.compras}<br>
            Total gasto: R$ ${cliente.totalGasto.toFixed(2)}<br>
            Status: ${cliente.vip ? "💎 CLIENTE VIP" : "Cliente Comum"}<br><br>

            Valor original: R$ ${valor.toFixed(2)}<br>
            Valor final: R$ ${valorFinal.toFixed(2)}
        `;

    } else {

        msg.innerHTML = " Venda bloqueada: Menor de 16 anos";
        msg.style.color = "#ff4444";

        relatorio.style.display = "none";
        lista.innerHTML = "";
    }
}

// Troca de telas
function irCadastrar() {
    document.getElementById("form").style.display = "none";
    document.getElementById("cadastro").style.display = "block";
}

function voltarFormulario() {
    document.getElementById("form").style.display = "block";
    document.getElementById("cadastro").style.display = "none";
}

// Carrega último cliente
window.onload = function () {

    const ultimoCliente =
        localStorage.getItem("ultimoCliente");

    if (ultimoCliente) {
        document.getElementById("inputNome").value =
            ultimoCliente;
    }

};
// SISTEMA DE DESCONTO VIP E NÃO VIP

let desconto = 0;

// Desconto normal
if (valor > 500 || cupom) {
    desconto += 15;
}

// Desconto extra VIP
if (cliente.vip) {
    desconto += 10;
}

let valorFinal = valor * (1 - desconto / 100);

relatorio.innerHTML = `
<strong>📋 RESUMO DO PEDIDO</strong>
<hr>

Cliente: ${cliente.nome}<br>
Compras realizadas: ${cliente.compras}<br>
Total gasto: R$ ${cliente.totalGasto.toFixed(2)}<br>
Status: ${cliente.vip ? "💎 CLIENTE VIP" : "Cliente Comum"}<br>
Desconto aplicado: ${desconto}%<br><br>

Valor original: R$ ${valor.toFixed(2)}<br>
Valor final: R$ ${valorFinal.toFixed(2)}
`;


