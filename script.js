function executarSistema(){
    //  Dados de Entrada
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    //  Dados de saída
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");

    //  Validação para campos vazios
    if(!nome || isNaN(idade) || isNaN(valor)){
        alert("Por favor, preencha todos os campos!");
        return;
    }

    //  Regra de negócio
    if(idade>=16){
        msg.innerText = `Venda autorizada: ${nome}`;
        msg.style.color = "#00ff88";


    //  Desconto
    let valorFinal = (valor>500 || cupom) ? valor * 0.85 : valor;

    //  Estoque
    let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
    lista.innerHTML = ""; //  Limpa a lista anterior

    // forEach: Percorre um array e aplica uma ação para cada elemento
    estoque.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `Item ${item} reservado.`;
        lista.appendChild(li); // usado para adicionar um novo elemento
    }); 

    //Relatorio
    relatorio.style.display= "block";
    relatorio.innerHTML=`
    <srtrong> RESUMO DO PEDIDO <\strong><br>
    Cliente:  R$ ${(nome)} <br>
    Total Original: R$ ${valor.toFixed(2)} <br>
    <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong>
    `;
    }else{ 
        msg .innerHTML = "Venda bloqueada: Menor de 16 anos.";
        msg.style.color = "#ff4444";
        relatorio.style.display = "none";
        lista.innerHTML = ""

    }

}
//função para ir pro cadastro vip
function irCadastrar(){

    const formulario = document.getElementById("form");
    const cadastro = document.getElementById("cadastro");

    formulario.style.display = "none"
    cadastro.style.display = "block"
}
function voltarFormulario(){

    

    const formulario = document.getElementById("form");
    const cadastro = document.getElementById("cadastro");

    formulario.style.display = "block"
    cadastro.style.display = "none"
}

const formvip=document.getElementById('opcaoVIP');
let vip = false;

if(vip===true){
    formvip.disabled= false;
}
else{
    formvip.disabled= true ;
}



