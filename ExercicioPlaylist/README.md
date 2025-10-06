# 🎵 Projeto Playlist

![GitHub repo size](https://img.shields.io/github/repo-size/Mattheushmc/Exercicio-BE-GrauTec)
![GitHub language count](https://img.shields.io/github/languages/count/Mattheushmc/Exercicio-BE-GrauTec)
![GitHub top language](https://img.shields.io/github/languages/top/Mattheushmc/Exercicio-BE-GrauTec)

---

## 🔹 Descrição
Este projeto implementa uma **classe Playlist em JavaScript**, permitindo:

- Adicionar músicas à playlist 🎶  
- Percorrer as músicas usando `for...of` graças ao protocolo de iteração (`Symbol.iterator`) 🔁  

É um exemplo prático de **estrutura de dados personalizada e iteração em JavaScript**.

---

## 🗂 Estrutura do Projeto


---

## 💻 Tecnologias utilizadas
- **Linguagem:** JavaScript  
- **Execução:** Node.js ou navegador (console)  

---

## 🚀 Como rodar o projeto

1. Abra o terminal na pasta do projeto.  
2. Execute:

```bash
node Playlist.js
```
✨ Funcionalidades

---

adicionarMusica(nome) → adiciona uma nova música à playlist.

```bash
Iteração personalizada → permite percorrer a playlist com for...of.
const minhaPlaylist = new Playlist([
    "Flowers - Miley Cyrus",
    "Venish into you - Lady Gaga"
]);

minhaPlaylist.adicionarMusica("Pretend You're God - Miley Cyrus");
minhaPlaylist.adicionarMusica("Puss Puss - Zara Larsson");
minhaPlaylist.adicionarMusica("The Climb - Hannah Montana - The Movie");
minhaPlaylist.adicionarMusica("23 - Miley Cyrus");
minhaPlaylist.adicionarMusica("POV - Ariana Grande");

for (const musica of minhaPlaylist) {
    console.log(musica);
}
```

📌 Autor

MatheusHMC
---
GitHub: [Mattheushmc](https://github.com/Mattheushmc)  
