import express from "express";

const app = express();

app.use(express.json())

const bebidas = [
    {
        id: 1,
        nome: "Vodka 1 litro",
        descricao: "Vodka Stolichinaya 1 litro",
        preco: 59.99,
        quantidade: 6
    },
    {
        id: 2,
        nome: "Skol 350ml",
        descricao: "Cerveja Skol 350ml",
        preco: 4.99,
        quantidade: 26
    },
    {
        id: 3,
        nome: "Vinho Gato Negro 750ml",
        descricao: "Vinho Gato Negro Malbec 750ml",
        preco: 51.99,
        quantidade: 8
    },
]

function buscaBebida(id){
    return bebidas.findIndex(bebidas =>{
        return bebidas.id === Number(id);
    })
}

app.route("/cardapio")

    .get((req, res) => {
        res.status(200).json(bebidas);
    })

    .post((req, res) => {
        bebidas.push(req.body);
        res.status(201).send("Adicionado com sucesso");
    });

app.route("/cardapio/:id")

    .get((req, res) => {
        const id = buscaBebida(req.params.id);
        res.status(200).json(bebidas[id]);
    })

    .put((req, res) => {
        const id = buscaBebida(req.params.id);
        bebidas[id].nome = req.body.nome;
        bebidas[id].descricao = req.body.descricao;
        bebidas[id].preco = req.body.preco;
        bebidas[id].quantidade = req.body.quantidade;
        res.status(200).json(bebidas[id]);
    })

    .delete((req, res) => {
        const id = buscaBebida(req.params.id);
        console.log(id);
        if(bebidas[id]){
            bebidas.splice(id, 1);
            res.status(200).send("Removido com sucesso");
        } else {
            res.status(200).send("Carro não encontrado");
        }
    });

export default app;