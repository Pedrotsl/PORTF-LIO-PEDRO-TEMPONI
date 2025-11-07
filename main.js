document.addEventListener('DOMContentLoaded', () => {
 
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    function updateToggleIcon(isDarkMode) {
        modeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'; 
    }

    if (currentTheme) {
        body.classList.add(currentTheme);
        updateToggleIcon(currentTheme === 'dark-mode');
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateToggleIcon(true);
        }
    }

    modeToggle.addEventListener('click', () => {
        const isDarkMode = !body.classList.contains('dark-mode');
        body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
        updateToggleIcon(isDarkMode);
    });


    const sr = ScrollReveal({
        distance: '60px',
        duration: 1000,
        easing: 'cubic-bezier(.5, 0, 0, 1)',
        reset: false 
    });

    sr.reveal('.profile-card', { origin: 'top', delay: 200 });
    sr.reveal('.section h2', { origin: 'left', interval: 100 });
    sr.reveal('.grid-layout .card', { origin: 'bottom', interval: 150, distance: '40px' });
    sr.reveal('.contact-form', { origin: 'right', distance: '40px' });
    sr.reveal('footer', { origin: 'bottom', delay: 100 });


    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, ""); 
        
   
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } 

        else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        } 
    
        else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
        } 

        else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        event.target.value = value;
    });



    const typingElement = document.getElementById('typing-text');
    const texts = ["Desenvolvedor Web em Formação", "Entusiasta de Tecnologia", "Aprendiz Constante"];
    let textIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (textIndex === texts.length) {
            textIndex = 0;
        }
        
        const currentText = texts[textIndex];
        
        if (charIndex < currentText.length) {
            typingElement.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        } else {
          
            setTimeout(erase, 1500); 
        }
    }

    function erase() {
        const currentText = texts[textIndex];
        
        if (charIndex > 0) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40); 
        } else {
            textIndex++;
          
            setTimeout(type, 500); 
        }
    }

    type();



    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const detailsButtons = document.querySelectorAll('.details-button');

  
    const projectData = {
        'modal-projeto-1': {
            title: 'Projeto Landing Page',
            description: 'Uma landing page moderna e totalmente responsiva, desenvolvida como projeto inicial para demonstrar proficiência em design adaptável e organização de código CSS.',
            tech: 'HTML5, CSS3, Responsividade.',
            github: 'URL_DO_GITHUB_PROJETO_1'
        },
        'modal-projeto-2': {
            title: 'Calculadora Interativa',
            description: 'Uma calculadora completa que suporta operações básicas. O foco foi na manipulação do DOM e na lógica de operações matemáticas usando JavaScript puro.',
            tech: 'HTML, CSS, JavaScript (Manipulação de DOM).',
            github: 'URL_DO_GITHUB_PROJETO_2'
        }
    };

    detailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            const targetId = e.target.closest('.project-item').dataset.modalTarget;
            const data = projectData[targetId];

            if (data) {
                
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-description').textContent = data.description;
                document.getElementById('modal-tech').textContent = data.tech;
                document.getElementById('modal-github').href = data.github;
                
                modal.style.display = 'block';
                body.style.overflow = 'hidden'; 
            }
        });
    });


    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    });


    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            body.style.overflow = 'auto';
        }
    });
});