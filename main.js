jQuery(document).ready(function ($) {
    $('img[title]').each(function () {
        $(this).removeAttr('title');
    });
});

(function () {
    if (document.body.classList.contains('elementor-editor-active')) return;

    // Forzar scroll al inicio
    window.scrollTo(0, 0);

    const UI = {
        botonEntrar: document.querySelector('.v2-boton-entrar'),
        seccionBloqueo: document.getElementById('v2-capa-bloqueo'),
        musica: document.getElementById('v2-musica'),
        botonMusica: document.getElementById('v2-boton-control')
    };

    if (UI.botonEntrar && UI.seccionBloqueo) {
        UI.botonEntrar.addEventListener('click', function (e) {
            e.preventDefault();

            const docElm = document.documentElement;
            const entrarFS = docElm.requestFullscreen ||
                docElm.webkitRequestFullscreen ||
                docElm.msRequestFullscreen ||
                docElm.mozRequestFullScreen;
            if (entrarFS) {
                entrarFS.call(docElm).catch(function (err) {
                    console.warn("FS denegado:", err.message);
                });
            }

            if (UI.musica) {
                UI.musica.play().catch(function (err) {
                    console.log("Reproducción bloqueada por navegador");
                });
            }

            if (UI.botonMusica) {
                UI.botonMusica.style.display = 'flex';
                setTimeout(function () {
                    UI.botonMusica.style.opacity = '1';
                }, 100);
            }

            UI.seccionBloqueo.classList.add('v2-abrir');

            setTimeout(function () {
                document.body.style.overflow = 'auto';
            }, 1000);

            setTimeout(function () {
                UI.seccionBloqueo.style.display = 'none';
            }, 1500);
        });
    }

    if (UI.botonMusica && UI.musica) {
        UI.botonMusica.addEventListener('click', function (e) {
            e.stopPropagation();
            if (UI.musica.paused) {
                UI.musica.play();
                UI.botonMusica.classList.remove('paused');
            } else {
                UI.musica.pause();
                UI.botonMusica.classList.add('paused');
            }
        });
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    const elementos = document.querySelectorAll(".zoom-animar");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("zoom-in");
                entry.target.classList.remove("zoom-out");
            } else {
                entry.target.classList.remove("zoom-in");
                entry.target.classList.add("zoom-out");
            }
        });
    }, { threshold: 0.25 });

    elementos.forEach(function (el) {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        const boton = e.target.closest('.btn-mapa-dinamico');

        if (boton) {
            let info = boton.getAttribute('data-coords');

            if (info) {
                if (info.includes('google.com/maps')) {
                    const match = info.match(/q=([^&]+)/) || info.match(/place\/([^/]+)/);
                    if (match) {
                        info = match[1];
                    }
                }

                setTimeout(function () {
                    const iframe = document.querySelector('#mapa-dinamico iframe');
                    if (iframe) {
                        const nuevaUrl = 'https://maps.google.com/maps?q=' + info + '&t=m&z=16&output=embed';
                        iframe.src = nuevaUrl;
                    }
                }, 500);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const btnEntrar = document.getElementById("btnIngresar");
    const secciones = document.querySelectorAll(".seccion-invitacion");
    const musica = document.getElementById("musica");
    const botonFlotante = document.getElementById("botonMusica");

    secciones.forEach(function (sec) {
        sec.style.display = "none";
    });

    if (btnEntrar) {
        btnEntrar.addEventListener("click", function () {
            const portada = btnEntrar.closest(".elementor-section, .e-con");
            if (portada) portada.style.display = "none";

            secciones.forEach(function (sec) {
                sec.style.display = "block";
            });

            if (botonFlotante) botonFlotante.style.display = "flex";

            if (musica) {
                musica.play().catch(function (err) {
                    console.log("El navegador bloqueó el auto-play inicial");
                });
            }
        });
    }

    if (botonFlotante && musica) {
        botonFlotante.addEventListener("click", function () {
            if (musica.paused) {
                musica.play();
                botonFlotante.classList.remove("paused");
            } else {
                musica.pause();
                botonFlotante.classList.add("paused");
            }
        });
    }
});

(function () {
    const lazyloadRunObserver = function () {
        const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
        const lazyloadBackgroundObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyloadBackground = entry.target;
                    if (lazyloadBackground) {
                        lazyloadBackground.classList.add('e-lazyloaded');
                    }
                    lazyloadBackgroundObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px 0px 200px 0px' });

        lazyloadBackgrounds.forEach(function (lazyloadBackground) {
            lazyloadBackgroundObserver.observe(lazyloadBackground);
        });
    };

    const events = ['DOMContentLoaded', 'elementor/lazyload/observe'];
    events.forEach(function (event) {
        document.addEventListener(event, lazyloadRunObserver);
    });
})();

(function () {
    if ("querySelector" in document && "addEventListener" in window) {
        var e = document.body;
        e.addEventListener("pointerdown", function () {
            e.classList.add("using-mouse");
        }, { passive: true });
        e.addEventListener("keydown", function () {
            e.classList.remove("using-mouse");
        }, { passive: true });
    }
})();

// Countdown Timer Logic - Target: March 16, 2026 at 13:00
document.addEventListener('DOMContentLoaded', function () {
    // JavaScript months are 0-indexed (Jan = 0, Feb = 1, Mar = 2)
    const targetDate = new Date(2026, 4, 16, 13, 0, 0).getTime();

    const daysEl = document.querySelector('.elementor-countdown-days');
    const hoursEl = document.querySelector('.elementor-countdown-hours');
    const minutesEl = document.querySelector('.elementor-countdown-minutes');
    const secondsEl = document.querySelector('.elementor-countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Initialize immediately
    updateCountdown();
    // Update the counter every second
    setInterval(updateCountdown, 1000);
});

// Lógica para Token, Fetch y Formulario RSVP
document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Cambiar esta URL una vez que se tenga el backend NodeJS real
    const API_BASE_URL = 'http://localhost:3000/api';

    const nameDisplay = document.getElementById('guest-name-display');
    const ticketsDisplay = document.getElementById('guest-tickets-display');
    const formNombre = document.getElementById('form-field-nombre');
    const formAsistencia = document.getElementById('form-field-asistencia');
    const busContainer = document.getElementById('bus-field-container');
    const form = document.getElementById('guest-rsvp-form');
    let btnSubmit = null;
    if (form) {
        btnSubmit = form.querySelector('button[type="submit"]');
    }

    let guestData = null;

    if (token) {
        try {
            const response = await fetch(`${API_BASE_URL}/invitado?token=${token}`);
            if (!response.ok) {
                console.warn("No se pudo conectar al backend o el token es inválido.");
                // Mock provisorio para testear la UI mientras creas tu backend
                guestData = {
                    "Nombre(s)": "Invitado de Honor",
                    "Tickets": 3,
                    "TicketsConfirmados": 0,
                    "IraEnBus": "",
                    "Token": token
                };
            } else {
                guestData = await response.json();
            }

            // Llenar HTML
            if (nameDisplay) nameDisplay.innerText = guestData["Nombre(s)"];
            if (ticketsDisplay) ticketsDisplay.innerText = guestData["Tickets"];
            if (formNombre) formNombre.value = guestData["Nombre(s)"];

            // Comprobar si ya respondió
            if (guestData["TicketsConfirmados"] > 0 || guestData["RespondioFormulario"]) {
                if (form) {
                    form.innerHTML = "<h3 style='text-align: center; color: #333;'>Ya has respondido a esta invitación. ¡Gracias!</h3>";
                }
                return;
            }

            // Configurar Select de Asistencia
            if (formAsistencia) {
                formAsistencia.innerHTML = "";
                const totalTickets = parseInt(guestData["Tickets"]) || 1;

                for (let i = totalTickets; i > 0; i--) {
                    const opt = document.createElement('option');
                    opt.value = i;
                    if (i === totalTickets) {
                        opt.innerText = totalTickets > 1 ? `Asistiremos los ${i}` : "Asistiré solo";
                    } else if (i === 1) {
                        opt.innerText = "Asistiré solo";
                    } else {
                        opt.innerText = `Asistiremos solo ${i}`;
                    }
                    formAsistencia.appendChild(opt);
                }

                const optNo = document.createElement('option');
                optNo.value = "0";
                optNo.innerText = "No podré asistir";
                formAsistencia.appendChild(optNo);
                
                // Event listener for Bus control is now registered globally outside the token block.
                formAsistencia.dispatchEvent(new Event('change'));
            }

        } catch (error) {
            console.error("Error al obtener datos:", error);
            if (nameDisplay) nameDisplay.innerText = "Invitado";
            if (ticketsDisplay) ticketsDisplay.innerText = "-";
        }
    } else {
        if (nameDisplay) nameDisplay.innerText = "Invitado Genérico";
        if (ticketsDisplay) ticketsDisplay.innerText = "-";
    }

    // Controlar campo de Bus independientemente del token
    if (formAsistencia) {
        formAsistencia.addEventListener('change', function () {
            const busSelect = document.getElementById('form-field-bus');
            // Validar ambas posibles formas en que un invitado indique que no va
            const noVal = this.value === "0" || this.value === "No podré, lo siento";
            if (noVal) {
                if (busContainer) busContainer.style.display = 'block'; 
                if (busSelect) {
                    let noOption = Array.from(busSelect.options).find(opt => opt.value === "No" || opt.text.toLowerCase() === "no");
                    if (!noOption) {
                        noOption = document.createElement('option');
                        noOption.value = "No";
                        noOption.innerText = "No";
                        busSelect.appendChild(noOption);
                    }
                    busSelect.value = noOption.value;
                    busSelect.disabled = true; // Deshabilitar para que no pueda cambiarlo
                }
            } else {
                if (busContainer) busContainer.style.display = 'block';
                if (busSelect) {
                    busSelect.disabled = false; 
                }
            }
        });

        // Trigger inicial si no hay token, para configurar el estado por defecto de la opción en el HTML (usualmente index 0, que es "Si asistiré")
        if (!token) {
            formAsistencia.dispatchEvent(new Event('change'));
        }
    }

    // Interceptar envío del formulario
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (btnSubmit) {
                btnSubmit.disabled = true;
                const textSpan = btnSubmit.querySelector('.elementor-button-text');
                if (textSpan) textSpan.innerText = "Enviando...";
            }

            const formData = new FormData(form);
            const busSelect = document.getElementById('form-field-bus');
            const dataToSubmit = {
                token: token,
                asistencia: formData.get('form_fields[asistencia]'),
                bus: busSelect ? busSelect.value : (formData.get('form_fields[bus]') || ""),
                mensaje: formData.get('form_fields[mensaje]') || ""
            };

            try {
                // Modificar esta URL a donde enviar los datos (NodeJS/Express)
                const postResponse = await fetch(`${API_BASE_URL}/confirmar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSubmit)
                });

                // MOCK Si no hay backend, puedes comentar las 2 líneas siguientes y asumirlo exitoso.
                // if (!postResponse.ok) throw new Error("Error en servidor");

                form.innerHTML = "<h3 style='text-align: center; color: #333;'>¡Gracias por confirmar tu asistencia! Hemos registrado tus datos.</h3>";
            } catch (error) {
                console.error("Error enviando RSVP:", error);
                alert("Hubo un problema guardando tu confirmación. Intenta más tarde.");
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    const textSpan = btnSubmit.querySelector('.elementor-button-text');
                    if (textSpan) textSpan.innerText = "Enviar";
                }
            }
        });
    }
});