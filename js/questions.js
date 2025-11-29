function selectOption(radio) {
    const label = radio.closest('label');
    const isSelected = label.classList.contains('selected');
    const optionsDiv = radio.closest('.options');

    optionsDiv.querySelectorAll('label').forEach(lbl => {
        lbl.classList.remove('selected');
        lbl.querySelector('input[type="radio"]').checked = false;
    });

    if (!isSelected) {
        label.classList.add('selected');
        radio.checked = true;
    }
}

// --- LÓGICA DO QUIZ (JavaScript) ---

// 1. Respostas Corretas e Info das Questões (Manter como estava)
const RESPOSTAS_CORRETAS = {
    'q1': '3-1-4-2-5', // Associações
    'q2': 'a',         // Método Main
    'q3': 'd',         // Operador de igualdade (==)
    'q4': 'b',         // System.out.println()
    'q5': 'a',         // Conceitos Java (V, V, V, F)
    'q6': 'b',         // Tipo para texto (String)
};

const QUESTOES_INFO = [
    // ... (Mantenha as definições de QUESTOES_INFO aqui) ...
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


// 2. Função principal de Finalização
function finalizarTeste() {
    let acertos = 0;
    const totalQuestoes = Object.keys(RESPOSTAS_CORRETAS).length;

    const reviewContainer = document.getElementById('question-review-container');
    reviewContainer.innerHTML = '';

    // ... (Lógica de contagem de acertos e geração do resumo da questão - Manter como estava) ...
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
            feedback = `<button class="finish-button feedback-badge correta">Resposta correta!</button>`;
        } else {
            feedback = `<button class="finish-button feedback-badge errada">Resposta incorreta!</button>`;
        }


        reviewElement.innerHTML = `
                <div class="questions-title">${info.titulo}</div>
                
                ${feedback}

                <p><strong>Sua Resposta:</strong> <span class="${status === 'correta' ? 'correct-answer-text' : 'user-answer-text'}">${textoOpcaoUsuario}</span></p>
                
                ${status === 'errada' ?
                `<p><strong>Resposta Correta:</strong> <span class="correct-answer-text">${textoOpcaoCorreta}</span></p>`
                : ''}
                
                <div class="divider"></div>
            `;
        reviewContainer.appendChild(reviewElement);
    });


    // 3. Atualiza o cabeçalho e pontuação (Manter como estava)
    const resultHeading = document.getElementById('result-heading');
    const resultSubtitle = document.getElementById('main-subtitle');

    // Critério de aprovação: acertos >= 5
    const APROVADO = acertos >= 5;

    const mensagem = APROVADO
        ? `Parabéns! Você acertou ${acertos} de ${totalQuestoes} questões e está apto a receber seu certificado de Desenvolvimento Full Stack!`
        : `Você acertou ${acertos} de ${totalQuestoes} questões. Reveja o conteúdo para obter o certificado.`;

    resultHeading.textContent = mensagem;
    resultSubtitle.textContent = "Confira as respostas abaixo:";


    // 4. Geração do Botão Dinâmico (NOVO)
    const buttonContainerResultado = document.querySelector('#result-screen .button-container');
    buttonContainerResultado.innerHTML = ''; // Limpa o container anterior

    if (APROVADO) {
        buttonContainerResultado.innerHTML = `
                <a href="certificados.html" target="_blank">
                    <button class="finish-button certificato-btn">Obter Certificado</button>
                </a>
            `;
    } else {
        // Cria o botão Refazer Teste
        buttonContainerResultado.innerHTML = `
                <button class="finish-button" onclick="reiniciarTeste()">Refazer Teste</button>
            `;
    }


    // 5. Exibe a tela de resultados e oculta a tela de quiz (Manter como estava)
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    window.scrollTo(0, 0);
}

// 6. Função de Reiniciar Teste (Manter como estava)
function reiniciarTeste() {
    window.location.reload();
}