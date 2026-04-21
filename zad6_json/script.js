/**
 * Funkcja zmieniająca motyw kolorystyczny strony.
 * @param {string} themeName - Nazwa pliku CSS (np. 'green.css' lub 'red.css')
 */
function changeTheme(themeName) {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
        themeLink.href = themeName;
        console.log('Zmieniono motyw na: ' + themeName);
    }
}

/**
 * Funkcja ukrywająca i pokazująca sekcję CV.
 * @param {string} sectionId - Identyfikator sekcji HTML
 */
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
        if (section.style.display === "none") {
            section.style.display = "block";
            console.log('Sekcja ' + sectionId + ' jest teraz widoczna.');
        } else {
            section.style.display = "none";
            console.log('Sekcja ' + sectionId + ' została ukryta.');
        }
    }
}

// Walidacja Formularza
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    
    if (form) {
        form.addEventListener("submit", function(event) {
            // Zatrzymujemy domyślne wysłanie formularza (brak backendu)
            event.preventDefault(); 
            let isValid = true;

            // Pobieranie wartości i usuwanie białych znaków
            const imie = document.getElementById("imie").value.trim();
            const nazwisko = document.getElementById("nazwisko").value.trim();
            const email = document.getElementById("email").value.trim();
            const wiadomosc = document.getElementById("wiadomosc").value.trim();

            // Czyszczenie starych komunikatów błędów
            document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

            // Funkcja pomocnicza do wyświetlania błędów
            const showError = (id, message) => {
                document.getElementById(id + "-error").textContent = message;
                isValid = false;
            };

            // 1. Walidacja Imienia (wymagane, brak cyfr)
            if (!imie) {
                showError("imie", "Imię jest wymagane.");
            } else if (/\d/.test(imie)) {
                showError("imie", "Imię nie może zawierać cyfr.");
            }

            // 2. Walidacja Nazwiska (wymagane, brak cyfr)
            if (!nazwisko) {
                showError("nazwisko", "Nazwisko jest wymagane.");
            } else if (/\d/.test(nazwisko)) {
                showError("nazwisko", "Nazwisko nie może zawierać cyfr.");
            }

            // 3. Walidacja E-mail (wymagane, poprawny format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError("email", "E-mail jest wymagany.");
            } else if (!emailRegex.test(email)) {
                showError("email", "Podaj poprawny adres e-mail.");
            }

            // 4. Walidacja Wiadomości (wymagane)
            if (!wiadomosc) {
                showError("wiadomosc", "Wiadomość nie może być pusta.");
            }

            // Podsumowanie działania
            if (isValid) {
                alert("Walidacja zakończona sukcesem! Formularz jest gotowy do wysłania.");
                form.reset(); // Czyszczenie formularza po sukcesie
            }
        });
    }
});

/**
 * Zadanie 6: Pobieranie danych z JSON i dynamiczne budowanie list.
 */
function loadDataFromJson() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd podczas ładowania pliku JSON');
            }
            return response.json();
        })
        .then(data => {
            // 1. Generowanie listy umiejętności
            const skillsList = document.getElementById('skills-list');
            if (skillsList) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }

            // 2. Generowanie listy projektów
            const projectsList = document.getElementById('projects-list');
            if (projectsList) {
                data.projects.forEach(project => {
                    const li = document.createElement('li');
                    li.textContent = project;
                    projectsList.appendChild(li);
                });
            }
            console.log('Dane z JSON zostały załadowane pomyślnie.');
        })
        .catch(error => {
            console.error('Wystąpił problem z operacją fetch:', error);
        });
}

// Wywołujemy funkcję po załadowaniu DOM
document.addEventListener("DOMContentLoaded", loadDataFromJson);