let noButtonClickCount = 0;
let noButtonState = 0;
const requiredNoClicks = 3; // Número de veces que debe hacer clic en "No" antes de poder dar "Sí"

const encourageNoMessages = [
"¿Segura de decir sí tan rápido? 🤔",
"¿No quieres ver qué pasa si dices 'No'? 🙈",
"¿Estas muy muy segura de decir que Si? 🤫",
];

// Función para mostrar mensaje flotante
function showFloatingMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        background-color: rgba(255, 192, 203, 0.9);
        padding: 10px 20px;
        border-radius: 20px;
        color: #d4145a;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: floatAndFade 3s forwards;
        z-index: 1000;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        text-align: center;
        white-space: nowrap;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
}

// Añadir el estilo de la animación
const style = document.createElement('style');
style.textContent = `
    @keyframes floatAndFade {
        0% { 
            opacity: 0;
            transform: translate(-50%, -30%);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -70%);
        }
    }
`;
document.head.appendChild(style);

// Añadir animación de pulso para el botón "Sí"
const pulseAnimation = document.createElement('style');
pulseAnimation.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 0, 128, 0.7);
        }
        
        70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(255, 0, 128, 0);
        }
        
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 0, 128, 0);
        }
    }
`;
document.head.appendChild(pulseAnimation);

// Función efecto máquina de escribir
function typeWriterEffect(elementId, text, speed, callback = null) {
    let container = document.getElementById(elementId);
    container.innerHTML = ''; // Limpiar el contenedor antes de escribir
    let index = 0;

    function writeCharacter() {
        if (index < text.length) {
            container.innerHTML += text.charAt(index);
            index++;
            setTimeout(writeCharacter, speed);
        } else if (callback) {
            callback();
        }
    }

    writeCharacter();
}

// Evento click del botón "Sí"
document.getElementById('siBtn').addEventListener('click', function(e) {
    if (noButtonClickCount < requiredNoClicks) {
        e.preventDefault();
        const randomMessage = encourageNoMessages[Math.floor(Math.random() * encourageNoMessages.length)];
        showFloatingMessage(randomMessage);
        return;
    }

    document.getElementById('sadGifContainer').style.display = 'none';
    document.getElementById('sadGifContainer1').style.display = 'none';
    document.getElementById('sadGifContainer2').style.display = 'none';
    document.getElementById('gifContainer').style.display = 'none';
    document.getElementById('happyGifContainer').style.display = 'block';

    document.getElementById('question').style.display = 'none';
    document.getElementById('siBtn').style.display = 'none';
    document.getElementById('noBtn').style.display = 'none';

    document.body.style.backgroundImage = "url('romantic.jpg')";
    document.body.style.backgroundSize = "cover";

    document.getElementById('messageContainer').style.display = 'block';

    typeWriterEffect('messageContainer', '¡Mi amor! 😍 No sabes cuánto te amo ❤️', 50, function() {
        setTimeout(() => {
            typeWriterEffect('messageContainer', 'Eres lo mejor que me ha pasado, mi personita especial (Mi Peque) 💖', 50, function() {
                setTimeout(() => {
                    typeWriterEffect('messageContainer', '¿Qué te parece si celebramos este momento juntos?', 50, function() {
                        setTimeout(() => {
                            typeWriterEffect('messageContainer', 'Podemos ir a cenar o pasar la tarde juntos 💕', 50, function() {
                                setTimeout(() => {
                                    typeWriterEffect('messageContainer', 'Porque verte sonreír es mi mayor alegría 😘💖', 50);
                                }, 4000);
                            });
                        }, 4000);
                    });
                }, 4000);
            });
        }, 4000);
    });

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// Evento click del botón "No"
document.getElementById('noBtn').addEventListener('click', function() {
    noButtonClickCount++;
    
    if (noButtonClickCount === requiredNoClicks) {
        document.getElementById('siBtn').style.animation = 'pulse 1s infinite';
        showFloatingMessage('¡Ahora sí! Ya puedes decir que sí 💖');
    }

    switch (noButtonState) {
        case 0:
            document.getElementById('happyGifContainer').style.display = 'none';
            document.getElementById('gifContainer').style.display = 'none';
            document.getElementById('sadGifContainer').style.display = 'block';
            document.getElementById('noBtn').innerHTML = '¡Oh no! ¿Estás segura?';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '40px';
            document.getElementById('siBtn').style.padding = '20px 40px';
            noButtonState++;
            break;

        case 1:
            document.getElementById('noBtn').innerHTML = '¡¿Realmente estas segura?!';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('sadGifContainer').style.display = 'none';
            document.getElementById('sadGifContainer2').style.display = 'block';
            document.getElementById('siBtn').style.fontSize = '50px';
            document.getElementById('siBtn').style.padding = '30px 50px';
            noButtonState++;
            break;

        case 2:
            document.getElementById('noBtn').innerHTML = 'Estás segura de verdad, ¿eh?';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('sadGifContainer').style.display = 'none';
            document.getElementById('sadGifContainer2').style.display = 'none';
            document.getElementById('sadGifContainer1').style.display = 'block';
            document.getElementById('siBtn').style.fontSize = '60px';
            document.getElementById('siBtn').style.padding = '40px 60px';
            noButtonState++;
            break;

        case 3:
            document.getElementById('noBtn').innerHTML = '¿Eres positva?';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '70px';
            document.getElementById('siBtn').style.padding = '50px 70px';
            noButtonState++;
            break;

        case 4:
            document.getElementById('noBtn').innerHTML = 'Di que si por favor :(  ?';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '80px';
            document.getElementById('siBtn').style.padding = '60px 80px';
            noButtonState++;
            break;

        case 5:
            document.getElementById('noBtn').innerHTML = 'Solo piensa en ello';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '90px';
            document.getElementById('siBtn').style.padding = '70px 90px';
            noButtonState++;
            break;

        case 6:
            document.getElementById('noBtn').innerHTML = 'Si dices que no esta bien';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '100px';
            document.getElementById('siBtn').style.padding = '80px 100px';
            noButtonState++;
            break;

        case 7:
            document.getElementById('noBtn').innerHTML = 'Estaré muy triste';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '120px';
            document.getElementById('siBtn').style.padding = '90px 120px';
            noButtonState++;
            break;

        case 8:
            document.getElementById('noBtn').innerHTML = 'Estaré muy muy muy triste';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '140px';
            document.getElementById('siBtn').style.padding = '100px 140px';
            noButtonState++;
            break;

        case 9:
            document.getElementById('noBtn').innerHTML = 'Estaré muy muy muy muy triste.';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '160px';
            document.getElementById('siBtn').style.padding = '110px 160px';
            noButtonState++;
            break;

        case 10:
            document.getElementById('noBtn').innerHTML = 'Vale, ya dejaré de preguntar...';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '180px';
            document.getElementById('siBtn').style.padding = '120px 180px';
            noButtonState++;
            break;

        case 11:
            document.getElementById('noBtn').innerHTML = 'Es broma, POR FAVOR DI SÍ';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '200px';
            document.getElementById('siBtn').style.padding = '130px 200px';
            noButtonState++;
            break;

        case 12:
            document.getElementById('noBtn').innerHTML = 'Estaré muy muy muy muy muy triste.';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '220px';
            document.getElementById('siBtn').style.padding = '140px 220px';
            noButtonState++;
            break;

        case 13:
            document.getElementById('noBtn').innerHTML = 'Estás rompiendo mi corazón :(';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '240px';
            document.getElementById('siBtn').style.padding = '150px 240px';
            noButtonState++;
            break;

        case 14:
            document.getElementById('noBtn').innerHTML = 'NO... ya di que si';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '260px';
            document.getElementById('siBtn').style.padding = '160px 260px';
            noButtonState++;
            break;

        case 15:
            document.getElementById('noBtn').innerHTML = 'Anda Siiiiiiiiiiiiiiiiiiiiiiiiiii';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('siBtn').style.fontSize = '300px';
            document.getElementById('siBtn').style.padding = '170px 280px';
            noButtonState++;
            break;

        case 16:
            document.getElementById('noBtn').innerHTML = 'por favooooooor';
            document.getElementById('noBtn').style.backgroundColor = '#F1330A';
            document.getElementById('sadGifContainer').style.display = 'none';
            document.getElementById('sadGifContainer1').style.display = 'none';
            document.getElementById('sadGifContainer2').style.display = 'none';
            document.getElementById('gifContainer').style.display = 'block';
            document.getElementById('happyGifContainer').style.display = 'none';
            noButtonState = 0;
            break;

        default:
            break;
    }
});