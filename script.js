document.addEventListener("DOMContentLoaded", function() {
    const svgObject = document.getElementById("interactive-svg");
    const infoPanel = document.getElementById("info-panel");
    const infoText = document.getElementById("info-text");

    // Funktion zum Anzeigen von Informationen
    function showInfo(text, event) {
        infoText.innerHTML = text; // Nutze innerHTML, um HTML-Inhalt zu setzen
        infoPanel.classList.remove("hidden");
        infoPanel.style.display = "block";
        infoPanel.style.left = event.pageX + "px";
        infoPanel.style.top = event.pageY + "px";
    }

    // Funktion zum Ausblenden des Info-Panels
    function hideInfoPanel() {
        infoPanel.classList.add("hidden");
        infoPanel.style.display = "none";
        console.log("Info-Panel ausgeblendet, da außerhalb geklickt wurde.");
    }

    svgObject.addEventListener("load", function() {
        const svgDoc = svgObject.contentDocument;

        if (svgDoc) {
            console.log("SVG-Dokument erfolgreich geladen.");

            // Schleife durch alle interaktiven Elemente im JavaScript-Objekt
            Object.keys(textContent).forEach(id => {
                const element = svgDoc.getElementById(id);
                if (element) {
                    element.addEventListener("click", function(event) {
                        showInfo(textContent[id].description, event);
                        event.stopPropagation(); // Verhindert das Schließen des Panels, wenn ein interaktives Element angeklickt wird
                    });
                } else {
                    console.warn(`Element mit ID '${id}' wurde nicht gefunden.`);
                }
            });

            // Klick-Ereignis für das SVG-Dokument, um das Info-Panel zu schließen
            svgDoc.addEventListener("click", function(event) {
                hideInfoPanel(); // Ruft die Funktion korrekt auf
            });
        } else {
            console.error("SVG-Dokument konnte nicht geladen werden.");
        }
    });

    // Schließen des Info-Panels bei Klick außerhalb der interaktiven Elemente und des Info-Panels
    document.addEventListener("click", function(event) {
        const clickedInsidePanel = event.target.closest("#info-panel");
        const clickedInsideSVG = event.target.closest("#interactive-svg");

        if (!clickedInsidePanel && !clickedInsideSVG) {
            hideInfoPanel(); // Ruft die Funktion korrekt auf
        }
    });

    // Verhindert das Schließen des Panels, wenn innerhalb des Panels geklickt wird
    infoPanel.addEventListener("click", function(event) {
        event.stopPropagation(); // Verhindert das Schließen des Panels bei Klick innerhalb des Panels
    });
});
