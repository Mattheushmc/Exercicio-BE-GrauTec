class Playlist {
    constructor(musicas = []) {
        this.musicas = musicas;
    }

    adicionarMusica(nome) {
        this.musicas.push(nome);
    }

    [Symbol.iterator]() {
        let index = 0;
        const musicas = this.musicas;

        return {
            next() {
                if (index < musicas.length) {
                    return { value: musicas[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

const minhaPlaylist = new Playlist(["Flowers - Miley Cyrus", "Venish into you - Lady Gaga"]);

minhaPlaylist.adicionarMusica("Pretend You're God - Miley Cyrus");
minhaPlaylist.adicionarMusica("Puss Puss - Zara Larsson");
minhaPlaylist.adicionarMusica("The Climb - Hannah Montana - The Movie")
minhaPlaylist.adicionarMusica("23 - Miley Cyrus")
minhaPlaylist.adicionarMusica("POV - Ariana Grande")

for (const musica of minhaPlaylist) {
    console.log(musica);
}