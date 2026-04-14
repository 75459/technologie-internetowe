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