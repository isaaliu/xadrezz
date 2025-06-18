const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');

const tamanho = 50;
const ordem = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

const pecas = {};
const pecasCarregadas = [];

// URLs oficiais das peças (Wikimedia Commons, 45px)
const urls = {
    'white_rook': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    'white_knight': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    'white_bishop': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    'white_queen': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    'white_king': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    'white_pawn': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',

    'black_rook': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    'black_knight': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    'black_bishop': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    'black_queen': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    'black_king': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    'black_pawn': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
};

function carregarPecas(callback) {
    let total = Object.keys(urls).length;
    let carregadas = 0;

    for (const [nome, url] of Object.entries(urls)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            pecas[nome] = img;
            carregadas++;
            if (carregadas === total) callback();
        };
    }
}

function desenharTabuleiro() {
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            ctx.fillStyle = (linha + coluna) % 2 === 0 ? '#fff' : '#000';
            ctx.fillRect(coluna * tamanho, linha * tamanho, tamanho, tamanho);
        }
    }
}

function desenharPecas() {
    // Peças pretas (linha 0 e 1)
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(pecas['black_' + ordem[i]], i * tamanho, 0, tamanho, tamanho);
        ctx.drawImage(pecas['black_pawn'], i * tamanho, tamanho, tamanho, tamanho);
    }

    // Peças brancas (linha 6 e 7)
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(pecas['white_pawn'], i * tamanho, 6 * tamanho, tamanho, tamanho);
        ctx.drawImage(pecas['white_' + ordem[i]], i * tamanho, 7 * tamanho, tamanho, tamanho);
    }
}

carregarPecas(() => {
    desenharTabuleiro();
    desenharPecas();
});
