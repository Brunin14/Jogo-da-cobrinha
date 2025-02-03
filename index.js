let tela = document.getElementById("tela");
        let contexto = tela.getContext("2d");
        let tamanho = 20;
        let cobrinha = [{ x: 200, y: 200 }];
        let direcao = "cima";
        let maca = { x: 100, y: 100 };
        let pontuacao = 0;
        let contador = document.getElementById("contador");
        let botaoRecomecar = document.getElementById("botao-recomecar");
        let dificuldade = document.getElementById("dificil");
        let dificuldade2 = document.getElementById("facil");
        let velocidade = 100;
        let intervalo;

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "ArrowUp" && direcao !== "baixo") direcao = "cima";
            if (evento.key === "ArrowDown" && direcao !== "cima") direcao = "baixo";
            if (evento.key === "ArrowLeft" && direcao !== "direita") direcao = "esquerda";
            if (evento.key === "ArrowRight" && direcao !== "esquerda") direcao = "direita";
        });

        function atualizar() {
            let cabeca = { ...cobrinha[0] };
            if (direcao === "cima") cabeca.y -= tamanho;
            if (direcao === "baixo") cabeca.y += tamanho;
            if (direcao === "esquerda") cabeca.x -= tamanho;
            if (direcao === "direita") cabeca.x += tamanho;
            
            if (cabeca.x === maca.x && cabeca.y === maca.y) {
                maca.x = Math.floor(Math.random() * 20) * tamanho;
                maca.y = Math.floor(Math.random() * 20) * tamanho;
                pontuacao++;
                contador.textContent = "Maçãs comidas: " + pontuacao;
            } else {
                cobrinha.pop();
            }
            
            if (cabeca.x < 0 || cabeca.x >= 400 || cabeca.y < 0 || cabeca.y >= 400 || cobrinha.some(p => p.x === cabeca.x && p.y === cabeca.y)) {
                recomeçarJogo();
            }
            
            cobrinha.unshift(cabeca);
        }

        function desenhar() {
            contexto.clearRect(0, 0, tela.width, tela.height);
            contexto.fillStyle = "DarkGreen" ;
            contexto.fillRect(0, 0, tela.width, tela.height);
            
            contexto.fillStyle = "red";
            contexto.fillRect(maca.x, maca.y, tamanho, tamanho);
            
            contexto.fillStyle = "CadetBlue";
            cobrinha.forEach(parte => contexto.fillRect(parte.x, parte.y, tamanho, tamanho));
        }

        function jogo() {
            atualizar();
            desenhar();
        }

        function iniciarJogo() {
            if (intervalo) clearInterval(intervalo);
            intervalo = setInterval(jogo, velocidade);
        }

        function recomeçarJogo() {
            cobrinha = [{ x: 200, y: 200 }];
            maca = { x: 100, y: 100 };
            pontuacao = 0;
            contador.textContent = "Maçãs comidas: " + pontuacao;
            iniciarJogo();
        }

        function nivel1(){
            cobrinha = [{ x: 200, y: 200 }];
            maca = { x: 200, y: 200 };
            pontuacao = 0;
            contador.textContent = "Maçãs comidas: " + pontuacao;
            tamanho = 20;
            iniciarJogo();
        }

        function nivel2(){
            cobrinha = [{ x: 200, y: 200 }];
            maca = { x: 200, y: 200 };
            pontuacao = 0;
            contador.textContent = "Maçãs comidas: " + pontuacao;
            tamanho = 10;
            iniciarJogo();
        }
        

        botaoRecomecar.addEventListener("click", recomeçarJogo);
        dificuldade.addEventListener("click", nivel2);
        facil.addEventListener("click", nivel1);



        iniciarJogo();