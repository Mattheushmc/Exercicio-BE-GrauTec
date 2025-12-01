const fs = require('fs');

function carregarUsuarios() {
  fs.readFile('usuarios.json', 'utf8', (err, dados) => {
    if (err) {
      console.log('Erro ao ler o arquivo:', err.message);
    } else {
      const usuarios = JSON.parse(dados);
      filtrarUsuarios(usuarios);
    }
  });
}

function filtrarUsuarios(lista) {
  const resultado = lista.filter((usuario) => usuario.idade > 18);
  console.log('Usuários maiores de idade:');
  resultado.forEach((u) => {
    console.log(`- ${u.nome} (${u.idade} anos)`);
  });
}

function exibirMensagem() {
  console.log(mensagem);
}

function main() {
  carregarUsuarios();
  exibirMensagem();
}

main();
