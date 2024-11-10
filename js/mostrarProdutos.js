import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");
const secaoProdutos = document.querySelector(".secao__produtos");

function exibeMensagemVazia() {
    if (!secaoProdutos.querySelector(".mensagem-vazia")) {
        const mensagem = document.createElement("div");
        mensagem.className = "mensagem-vazia";
        mensagem.innerHTML = `
            <h2 style="font-family: 'Press Start 2P', sans-serif; color: #5300C8; text-align: center;">
                Nenhum produto encontrado
            </h2>
        `;
        secaoProdutos.appendChild(mensagem);
    }
}

function removeMensagemVazia() {
    const mensagem = secaoProdutos.querySelector(".mensagem-vazia");
    if (mensagem) {
        mensagem.remove();
    }
}

function constroiCard(id, nome, preco, imagem) {
    const produto = document.createElement("li");
    produto.className = "produtos__item";
    produto.innerHTML = ` 
        <div class="card">
            <img src="${imagem}" alt="Imagem do produto" class="card__imagem">
            <div class="card-container--info">
                <p class="nome">${nome}</p>
                <div class="card-container--value">
                    <p>$ ${preco}</p>
                    <img src="/images/lixeira.png" alt="Ícone de exclusão" class="lixeira" data-id="${id}">
                </div>
            </div>
        </div>`;

    produto.querySelector(".lixeira").addEventListener("click", async () => {
        await conectaApi.removeProduto(id);
        produto.remove();
        if (!lista.hasChildNodes()) {
            exibeMensagemVazia();
        }
    });

    return produto;
}

async function listaProduto() {
    const listaApi = await conectaApi.listaProdutos();
    
    lista.innerHTML = ""; 

    if (listaApi.length === 0) {
        exibeMensagemVazia(); 
    } else {
        removeMensagemVazia(); 
        listaApi.forEach(elemento => 
            lista.appendChild(constroiCard(elemento.id, elemento.nome, elemento.preco, elemento.imagem))
        );
    }
}

listaProduto();
