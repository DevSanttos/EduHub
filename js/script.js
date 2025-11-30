
//eu coloquei essa função estranha pra evitar que o js rode antes do html
document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');

    if (localStorage.getItem('usuario_logado') === 'true') {
        header.classList.add('modo-logado');
    }

    const botaoLogin = document.getElementById('login_btn');

    if (botaoLogin) {
        botaoLogin.addEventListener('click', function(event) {
            event.preventDefault(); 
            header.classList.add('modo-logado');
            localStorage.setItem('usuario_logado', 'true');
        });
    }

    const setaPerfil = document.getElementById('seta_perfil'); 
    const funcPerfil = document.getElementById('func_perfil');
    const menuDropdown = document.querySelector('.menu_dropdown');
    
    if (setaPerfil && menuDropdown) {
        setaPerfil.addEventListener('click', function(event) {
            event.stopPropagation(); 
            funcPerfil.classList.toggle('ativo');
        });

        document.addEventListener('click', function() {
            funcPerfil.classList.remove('ativo');
        });

        menuDropdown.addEventListener('click', function(event){
            event.stopPropagation();
        });
    }

    const btnLogout = document.getElementById('btn_logout');

    if (btnLogout) {
        btnLogout.addEventListener('click', function(event) {
            
            event.preventDefault();

            if(menuDropdown){
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

});