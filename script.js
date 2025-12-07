let punkte = 10;
const punkteBox = document.getElementById("punkteBox");
const popup = document.getElementById("popup");
const timerText = document.getElementById("timer");

// Drei GIF Quellen (wie du wolltest)
const gifSources = [
    "https://nekos.best/api/v2/neko",           // API 1
    "https://api.waifu.pics/nsfw/waifu",        // API 2
    "https://api.waifu.pics/sfw/waifu"          // API 3
];

updatePunkte();

function updatePunkte() {
    punkteBox.innerText = "Punkte: " + punkte;
}

async function showGif() {
    if (punkte <= 0) {
        startTimer();
        return;
    }

    punkte--;
    updatePunkte();

    let randomApi = gifSources[Math.floor(Math.random() * gifSources.length)];

    // API 1 = spezielle Struktur
    if (randomApi.includes("nekos.best")) {
        let res = await fetch(randomApi);
        let data = await res.json();
        document.getElementById("gifImage").src = data.results[0].url;
        return;
    }

    // API 2 & 3 = gleiche Struktur
    let res = await fetch(randomApi);
    let data = await res.json();
    document.getElementById("gifImage").src = data.url;
}

function startTimer() {
    popup.classList.remove("hidden");

    let sekunden = 60;
    timerText.innerText = sekunden;

    let countdown = setInterval(() => {
        sekunden--;
        timerText.innerText = sekunden;

        if (sekunden <= 0) {
            clearInterval(countdown);
            popup.classList.add("hidden");
            punkte += 10;
            updatePunkte();
        }
    }, 1000);
}

// Creator Codes
function redeemCode() {
    const code = document.getElementById("creatorInput").value;

    if (code === "IloveAnimeweb") {
        punkte += 5;
        alert("✔ +5 Punkte erhalten!");
    } else if (code === "freewerbung") {
        punkte += 20;
        alert("✔ +20 Punkte erhalten!");
    } else if (code === "IHateAnime") {
        punkte += 50;
        alert("😂🔥 Du bist wild! +50 Punkte");
    } else {
        alert("❌ Ungültiger Code!");
    }

    updatePunkte();
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Speichern
function saveFavorite() {
    const img = document.getElementById("gifImage").src;

    if (!img || img.length < 5) {
        alert("Kein GIF zum Speichern 😭");
        return;
    }

    if (!favorites.includes(img)) {
        favorites.push(img);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("❤️ GIF gespeichert!");
    } else {
        alert("Dieses GIF ist schon in deinen Favoriten 😳");
    }
}

// Favoriten Panel öffnen / schließen
function toggleFavorites() {
    const panel = document.getElementById("favoritesPanel");
    const list = document.getElementById("favList");

    if (panel.classList.contains("hidden")) {
        list.innerHTML = "";
        favorites.forEach(url => {
            list.innerHTML += `<img src="${url}">`;
        });
    }

    panel.classList.toggle("hidden");
}


const ageGate = document.getElementById("ageGate");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Prüfen ob schon bestätigt
if (localStorage.getItem("ageVerified") === "true") {
    ageGate.style.display = "none";
}

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageVerified", "true");
    ageGate.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Dann ist die Seite leider nix für dich 😭");
    window.location.href = "https://www.google.com"; // oder Kinderseite haha
});

