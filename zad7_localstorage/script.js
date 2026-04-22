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
            event.preventDefault(); 
            let isValid = true;

            const imie = document.getElementById("imie").value.trim();
            const nazwisko = document.getElementById("nazwisko").value.trim();
            const email = document.getElementById("email").value.trim();
            const wiadomosc = document.getElementById("wiadomosc").value.trim();

            document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

            const showError = (id, message) => {
                document.getElementById(id + "-error").textContent = message;
                isValid = false;
            };

            if (!imie) {
                showError("imie", "Imię jest wymagane.");
            } else if (/\d/.test(imie)) {
                showError("imie", "Imię nie może zawierać cyfr.");
            }

            if (!nazwisko) {
                showError("nazwisko", "Nazwisko jest wymagane.");
            } else if (/\d/.test(nazwisko)) {
                showError("nazwisko", "Nazwisko nie może zawierać cyfr.");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError("email", "E-mail jest wymagany.");
            } else if (!emailRegex.test(email)) {
                showError("email", "Podaj poprawny adres e-mail.");
            }

            if (!wiadomosc) {
                showError("wiadomosc", "Wiadomość nie może być pusta.");
            }

            if (isValid) {
                alert("Walidacja zakończona sukcesem! Formularz jest gotowy do wysłania.");
                form.reset(); 
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
            const skillsList = document.getElementById('skills-list');
            if (skillsList) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }

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

document.addEventListener("DOMContentLoaded", loadDataFromJson);

/**
 * Zadanie 7: Obsługa Local Storage (Notatki)
 */
document.addEventListener("DOMContentLoaded", function() {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');

    if (!notesList) return;

    // Funkcja pobierająca i renderująca notatki
    function renderNotes() {
        notesList.innerHTML = '';
        const savedNotes = JSON.parse(localStorage.getItem('myNotes')) || [];
        
        savedNotes.forEach((note, index) => {
            const li = document.createElement('li');
            li.style.marginBottom = "5px";
            li.textContent = note + " ";

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.style.padding = '2px 6px';
            deleteBtn.style.fontSize = '0.8em';
            deleteBtn.style.cursor = 'pointer';
            
            // Obsługa usuwania
            deleteBtn.onclick = function() {
                removeNote(index);
            };

            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }

    // Dodawanie notatki
    function addNote() {
        const text = noteInput.value.trim();
        if (text === "") return;

        const savedNotes = JSON.parse(localStorage.getItem('myNotes')) || [];
        savedNotes.push(text);
        localStorage.setItem('myNotes', JSON.stringify(savedNotes));
        
        noteInput.value = '';
        renderNotes();
    }

    // Usuwanie notatki po indeksie
    function removeNote(index) {
        const savedNotes = JSON.parse(localStorage.getItem('myNotes')) || [];
        savedNotes.splice(index, 1);
        localStorage.setItem('myNotes', JSON.stringify(savedNotes));
        renderNotes();
    }

    // Nasłuchiwanie na przycisk
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', addNote);
    }

    // Inicjalizacja przy ładowaniu
    renderNotes();
});