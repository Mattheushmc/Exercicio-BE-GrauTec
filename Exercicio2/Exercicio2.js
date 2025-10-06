// 1. Simular requisição assíncrona

function buscarDadosDoServidor() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 200, dados: "OK" });
        }, 2000);
    });
}

async function testarBuscarDados() {
    const resposta = await buscarDadosDoServidor();
    console.log("1:", resposta);
}

// 2. Validar idade

function validarIdade(idade) {
    return new Promise((resolve, reject) => {
        if (idade >= 18) {
            resolve("Acesso permitido");
        } else {
            reject("Acesso negado");
        }
    });
}

async function testarIdade() {
    try {
        console.log("2:", await validarIdade(20));
        console.log("2:", await validarIdade(16));
    } catch (erro) {
        console.log("2:", erro);
    }
}

// 3. Baixar imagem e vídeo em paralelo

function baixarImagem() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Imagem baixada"), 2000);
    });
}

function baixarVideo() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Vídeo baixado"), 3000);
    });
}

async function baixarMidias() {
    const resultados = await Promise.all([baixarImagem(), baixarVideo()]);
    console.log("3:", resultados);
}

// 4. Fazer Login

function fazerLogin(usuario, senha) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin" && senha === "1234") {
            resolve("Login bem-sucedido");
        } else {
            reject("Credenciais inválidas");
        }
    });
}

async function testarLogin() {
    try {
        console.log("4:", await fazerLogin("admin", "1234"));
        console.log("4:", await fazerLogin("user", "abcd"));
    } catch (erro) {
        console.log("4:", erro);
    }
}

// 5. Usuario e pedidos

function getUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 5, nome: "João" }), 1000);
    });
}

function getPedidos(idUsuario) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Pedido 1", "Pedido 2", "Pedido 3"]), 1500);
    });
}

async function mostrarPedidos() {
    const usuario = await getUsuario();
    const pedidos = await getPedidos(usuario.id);
    console.log("5:", `Usuário: ${usuario.nome}, Pedidos: ${pedidos.join(", ")}`);
}

// 6. Contar até tal numero

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function contarAte(numero) {
    for (let i = 1; i <= numero; i++) {
        console.log("6:", i);
        await delay(1000);
    }
}

// 7. Buscar com timeout

function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Dados encontrados"), 2000);
    });
}

function timeout() {
    return new Promise((_, reject) => {
        setTimeout(() => reject("Tempo esgotado"), 1000);
    });
}

async function buscarComTimeout() {
    try {
        const resultado = await Promise.race([buscarDados(), timeout()]);
        console.log("7:", resultado);
    } catch (erro) {
        console.log("7:", erro);
    }
}

// 8. Promise.allSettled

const promessaRapida = () =>
    new Promise(resolve => setTimeout(() => resolve("Teste retornou rápido"), 1000));

const promessaLentaRejeitada = () =>
    new Promise(resolve => setTimeout(() => resolve("Teste retornou em 2s"), 2000));

const promessaSuperRapida = () =>
    new Promise(resolve => setTimeout(() => resolve("Teste retornou em 0.5s"), 500));


async function verificarResultados() {
    const resultados = await Promise.allSettled([
        promessaRapida(),
        promessaLentaRejeitada(),
        promessaSuperRapida()
    ]);
    console.log("8:", resultados);
}


(async () => {
    await testarBuscarDados();
    await testarIdade();
    await baixarMidias();
    await testarLogin();
    await mostrarPedidos();
    await contarAte(5);
    await buscarComTimeout();
    await verificarResultados();
})();
