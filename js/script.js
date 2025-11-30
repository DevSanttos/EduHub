
//eu coloquei essa função estranha pra evitar que o js rode antes do html
document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');

    if (localStorage.getItem('usuario_logado') === 'true') {
        header.classList.add('modo-logado');
    }

    const botaoLogin = document.getElementById('login_btn');

    if (botaoLogin) {
        botaoLogin.addEventListener('click', function (event) {
            event.preventDefault();
            header.classList.add('modo-logado');
            localStorage.setItem('usuario_logado', 'true');
        });
    }

    const setaPerfil = document.getElementById('seta_perfil');
    const funcPerfil = document.getElementById('func_perfil');
    const menuDropdown = document.querySelector('.menu_dropdown');

    if (setaPerfil && menuDropdown) {
        setaPerfil.addEventListener('click', function (event) {
            event.stopPropagation();
            funcPerfil.classList.toggle('ativo');
        });

        document.addEventListener('click', function () {
            funcPerfil.classList.remove('ativo');
        });

        menuDropdown.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

    const btnLogout = document.getElementById('btn_logout');

    if (btnLogout) {
        btnLogout.addEventListener('click', function (event) {

            event.preventDefault();

            if (menuDropdown) {
                funcPerfil.classList.remove('ativo');
            }

            header.classList.remove('modo-logado');
            localStorage.removeItem('usuario_logado');
            window.location.href = "principal.html";

        });
    }

    //esses métodos/funções aqui pra baixo são, exclusivamente, da tela de certificados. Eu coloquei eles mais separados pra não embananar tudo kkkkkkkkkk
    const botoesAbrir = document.querySelectorAll('.ver_certificado_btn');
    const botaoFechar = document.querySelector('.close_btn');
    const modalOverlay = document.querySelector('.modal_overlay');

    if (modalOverlay) {

        botoesAbrir.forEach(botao => {
            botao.addEventListener('click', () => {
                modalOverlay.classList.add('mostrar');
            });
        });

        if (botaoFechar) {
            botaoFechar.addEventListener('click', () => {
                modalOverlay.classList.remove('mostrar');
            });
        }

        modalOverlay.addEventListener('click', (evento) => {
            if (evento.target === modalOverlay) {
                modalOverlay.classList.remove('mostrar');
            }
        });
    }

    //código para tela de questions

    window.selectOption = function (radio) {
        const label = radio.closest('label');
        const optionsDiv = radio.closest('.options');

        optionsDiv.querySelectorAll('label').forEach(lbl => {
            lbl.classList.remove('selected');
            lbl.querySelector('input[type="radio"]').checked = false;
        });

        label.classList.add('selected');
        radio.checked = true;
    }

    const RESPOSTAS_CORRETAS = {
        'q1': '3-1-4-2-5',
        'q2': 'a',
        'q3': 'd',
        'q4': 'b',
        'q5': 'a',
        'q6': 'b',
    };

    const QUESTOES_INFO = [
        {
            id: 'q1',
            titulo: 'Associe os números aos parênteses, marcando a opção onde aparece a sequência correta:',
            respostas: {
                '2-1-3-4-5': '2-1-3-4-5',
                '3-1-2-4-5': '3-1-2-4-5',
                '3-1-4-2-5': '3-1-4-2-5',
                '5-1-4-2-3': '5-1-4-2-3'
            }
        },
        {
            id: 'q2',
            titulo: 'Qual destas é a assinatura correta do método principal em Java?',
            respostas: {
                'a': 'a) public static void main(String args[])',
                'b': 'b) static public main(String[] args)',
                'c': 'c) public void main(String[] args)',
                'd': 'd) public static int main(String[] args)'
            }
        },
        {
            id: 'q3',
            titulo: 'Qual operador é usado para comparar igualdade entre dois valores?',
            respostas: {
                'a': 'a) =',
                'b': 'b) :=',
                'c': 'c) equals',
                'd': 'd) =='
            }
        },
        {
            id: 'q4',
            titulo: 'O que o comando System.out.println() faz?',
            respostas: {
                'a': 'a) Lê dados do teclado',
                'b': 'b) Imprime texto com quebra de linha',
                'c': 'c) Imprime texto sem quebra de linha',
                'd': 'd) Finaliza o programa'
            }
        },
        {
            id: 'q5',
            titulo: 'Sobre conceitos básicos da linguagem Java, analise as afirmações abaixo e marque V para verdadeiro e F para falso, depois assinale a alternativa que apresenta a sequência correta:',
            respostas: {
                'a': '(A) V, V, V, F.',
                'b': '(B) V, F, V, F.',
                'c': '(C) F, V, V, V.',
                'd': '(D) V, V, F, F.'
            }
        },
        {
            id: 'q6',
            titulo: 'Qual tipo de dado é usado para armazenar texto em Java?',
            respostas: {
                'a': 'a) text',
                'b': 'b) String',
                'c': 'c) char[]',
                'd': 'd) word'
            }
        }
    ];

    function finalizarTeste() {
        let acertos = 0;
        const totalQuestoes = Object.keys(RESPOSTAS_CORRETAS).length;

        const reviewContainer = document.getElementById('question-review-container');
        reviewContainer.innerHTML = '';

        QUESTOES_INFO.forEach(info => {
            const questaoId = info.id;
            const respostaCorreta = RESPOSTAS_CORRETAS[questaoId];

            const inputSelecionado = document.querySelector(`input[name="${questaoId}"]:checked`);
            const respostaUsuario = inputSelecionado ? inputSelecionado.value : null;

            let status = 'errada';
            if (respostaUsuario === respostaCorreta) {
                acertos++;
                status = 'correta';
            }

            const textoOpcaoUsuario = respostaUsuario ? info.respostas[respostaUsuario] : 'Nenhuma resposta selecionada';
            const textoOpcaoCorreta = info.respostas[respostaCorreta];

            const reviewElement = document.createElement('div');
            reviewElement.className = `review-item`;

            let feedback = '';
            if (status === 'correta') {
                feedback = `<button class="finish-button feedback-question correta">Resposta correta!</button>`;
            } else {
                feedback = `<button class="finish-button feedback-question errada">Resposta incorreta!</button>`;
            }

            reviewElement.innerHTML = `
                <div class="questions-title">${info.titulo}</div>
                
                <p><strong>Sua Resposta:</strong> <span class="${status === 'correta' ? 'correct-question-text' : 'user-answer-text'}">${textoOpcaoUsuario}</span></p>
                
                ${status === 'errada' ?
                    `<p><strong>Resposta Correta:</strong> <span class="correct-question-text">${textoOpcaoCorreta}</span></p>`
                    : ''}
                
                ${feedback}
                
                <div class="divider"></div>
            `;
            reviewContainer.appendChild(reviewElement);
        });

        const resultHeading = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');

        const APROVADO = acertos >= 3;

        const mensagem = APROVADO
            ? `Parabéns! Você acertou ${acertos} de ${totalQuestoes} questões e está apto a receber seu certificado de Desenvolvimento Full Stack!`
            : `Você acertou ${acertos} de ${totalQuestoes} questões. Reveja o conteúdo para obter o certificado.`;

        resultHeading.textContent = mensagem;
        resultSubtitle.textContent = "Confira as respostas abaixo:";

        const buttonContainerResultado = document.querySelector('#result-screen .button-container');
        buttonContainerResultado.innerHTML = '';

        if (APROVADO) {
            buttonContainerResultado.innerHTML = `
                <a href="certificados.html" target="_blank">
                    <button class="finish-button certificato-btn">Obter Certificado</button>
                </a>
            `;
        } else {

            buttonContainerResultado.innerHTML = `
                <button class="finish-button" onclick="reiniciarTeste()">Refazer Teste</button>
            `;
        }


        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';

        window.scrollTo(0, 0);
    }

    // Botão finalizar

    window.finalizarTeste = finalizarTeste;

    window.reiniciarTeste = function () {
        window.location.reload();
    }

    const finalizarQuizButton = document.querySelector('#quiz-screen .finish-button');

    if (finalizarQuizButton) {
        finalizarQuizButton.addEventListener('click', finalizarTeste);
    }

});