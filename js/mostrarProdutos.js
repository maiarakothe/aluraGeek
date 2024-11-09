import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiCard(id, nome, preco, imagem) {
    const produto = document.createElement("li");
    produto.className = "produtos__item";
    produto.innerHTML = ` <div class="card">
                        <img src="${imagem}" alt="Imagen del producto" class="card__imagem>
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
    });

    return produto;
}

async function listaProduto() {
    const listaApi = await conectaApi.listaProdutos();
    listaApi.forEach(elemento => 
        lista.appendChild(constroiCard(elemento.id, elemento.nome, elemento.preco, elemento.imagem)))
}

listaProduto();