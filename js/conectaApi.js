
async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function criaProduto(nome, preco, imagem) {
    const conexao = await fetch("http://localhost:3000/produtos", {
    method: "POST", 
    headers: {
        "content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            imagem: imagem
        })
    })

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function removeProduto(id) {
    await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
    });
}

export const conectaApi = {
    listaProdutos,
    criaProduto, 
    removeProduto
}

//json-server db.json –watch