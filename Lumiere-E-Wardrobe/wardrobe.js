/**
 * BAUHAUS: THE E-WARDROBE 
 */

// 1. Session Security Check
const sessionData = localStorage.getItem('lumiere_active_session');
if (!sessionData) {
    window.location.href = 'index.html';
} else {
    const user = JSON.parse(sessionData);
    document.getElementById('userGreeting').textContent = `Welcome, ${user.username}`;
    document.getElementById('profileName').textContent = `Stylist: ${user.username}`;
    document.getElementById('profLogin').textContent = new Date(user.loginTime).toLocaleString();
}

// 2. OOP Blueprint
class WardrobeItem {
    constructor(id, name, category, color, season, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.color = color;
        this.season = season;
        this.image = image;
        this.dateAdded = new Date().toLocaleDateString();
    }
}

// 3. Array Data Store & Persistence
let wardrobeCollection = [];
let currentOpenId = null;

function loadWardrobeData() {
    const saved = localStorage.getItem('lumiere_wardrobe');
    if (saved) {
        const parsed = JSON.parse(saved);
        wardrobeCollection = parsed.map(i => new WardrobeItem(i.id, i.name, i.category, i.color, i.season, i.image));
    }
    updateDashboardKPIs();
}

function saveWardrobeData() {
    localStorage.setItem('lumiere_wardrobe', JSON.stringify(wardrobeCollection));
    updateDashboardKPIs();
}

// 4. Dashboard KPIs
function updateDashboardKPIs() {
    document.getElementById('kpiTotal').textContent = wardrobeCollection.length;
    document.getElementById('profCount').textContent = wardrobeCollection.length + ' Pieces';
    document.getElementById('kpiScore').textContent = Math.min(wardrobeCollection.length * 10, 100) + '%';

    if (wardrobeCollection.length > 0) {
        const cats = wardrobeCollection.map(i => i.category);
        const topCat = cats.sort((a,b) => cats.filter(v=>v===a).length - cats.filter(v=>v===b).length).pop();
        document.getElementById('kpiCategory').textContent = topCat;

        const seasons = wardrobeCollection.map(i => i.season);
        const topSeason = seasons.sort((a,b) => seasons.filter(v=>v===a).length - seasons.filter(v=>v===b).length).pop();
        document.getElementById('kpiSeason').textContent = topSeason;
    } else {
        document.getElementById('kpiCategory').textContent = 'None';
        document.getElementById('kpiSeason').textContent = 'None';
    }
}

// 5. Wardrobe Closet Rendering & Modal
const closetInterior = document.getElementById('closetInterior');
const itemModal = document.getElementById('itemModal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalMeta = document.getElementById('modalMeta');
const modalDeleteBtn = document.getElementById('modalDeleteBtn');

function renderCloset() {
    closetInterior.innerHTML = '';
    if (wardrobeCollection.length === 0) {
        closetInterior.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#555; font-weight:700;">Wardrobe is empty. Add pieces to hang them in the closet.</p>`;
        return;
    }

    wardrobeCollection.forEach(item => {
        const card = document.createElement('div');
        card.className = 'closet-item-card';
        card.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}">
            <h4>${item.name}</h4>
            <span>${item.category}</span>
        `;
        card.addEventListener('click', () => {
            currentOpenId = item.id;
            modalImg.src = item.image;
            modalName.textContent = item.name;
            modalMeta.textContent = `Category: ${item.category} | Color: ${item.color} | Season: ${item.season} | Added: ${item.dateAdded}`;
            itemModal.style.display = 'flex';
        });
        closetInterior.appendChild(card);
    });
}

modalClose.addEventListener('click', () => { itemModal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === itemModal) itemModal.style.display = 'none'; });

modalDeleteBtn.addEventListener('click', () => {
    if (currentOpenId) {
        wardrobeCollection = wardrobeCollection.filter(i => i.id !== currentOpenId);
        saveWardrobeData();
        renderCloset();
        itemModal.style.display = 'none';
        currentOpenId = null;
    }
});

// 6. Add Piece with Image Upload (FileReader API)
const addPieceForm = document.getElementById('addPieceForm');
addPieceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    const category = document.getElementById('itemCategory').value;
    const color = document.getElementById('itemColor').value.trim();
    const season = document.getElementById('itemSeason').value;
    const fileInput = document.getElementById('itemImageFile');

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;
            const newId = 'item_' + Date.now();
            const newItem = new WardrobeItem(newId, name, category, color, season, base64Image);
            
            wardrobeCollection.push(newItem);
            saveWardrobeData();
            renderCloset();
            addPieceForm.reset();
            document.querySelector('[data-target="sec-gallery"]').click();
        };
        reader.readAsDataURL(file);
    }
});

// 7. Style Suggester, Weather API Integration & Mannequin Rotation
const suggesterForm = document.getElementById('suggesterForm');
const suggestionText = document.getElementById('suggestionText');
const mannequinWrapper = document.getElementById('mannequinWrapper');
let rotationAngle = 0;

document.getElementById('rotateLeft').addEventListener('click', () => {
    rotationAngle -= 45;
    mannequinWrapper.style.transform = `rotateY(${rotationAngle}deg)`;
});
document.getElementById('rotateRight').addEventListener('click', () => {
    rotationAngle += 45;
    mannequinWrapper.style.transform = `rotateY(${rotationAngle}deg)`;
});

suggesterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const occasion = document.getElementById('occInput').value;
    const place = document.getElementById('placeInput').value;

    if (wardrobeCollection.length === 0) {
        suggestionText.textContent = "Your wardrobe is empty! Add pieces first.";
        return;
    }

    suggestionText.innerHTML = "Consulting live weather API & curating fit...";

    try {
        // Fetch live weather data to determine season context
        const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=14.75&longitude=120.94&current_weather=true');
        const weatherData = await weatherRes.json();
        const temp = weatherData.current_weather.temperature;

        let seasonContext = 'All Season';
        if (temp > 26) seasonContext = 'Summer';
        else if (temp < 20) seasonContext = 'Winter';
        else seasonContext = 'Spring';

        // Filter valid pieces matching weather or all season
        const availableItems = wardrobeCollection.filter(i => i.season === seasonContext || i.season === 'All Season');
        const pool = availableItems.length > 0 ? availableItems : wardrobeCollection;

        const tops = pool.filter(i => i.category === 'Tops' || i.category === 'Dresses' || i.category === 'Outerwear');
        const bottoms = pool.filter(i => i.category === 'Bottoms');
        const shoes = pool.filter(i => i.category === 'Shoes');

        const topPick = tops.length > 0 ? tops[Math.floor(Math.random() * tops.length)] : null;
        const bottomPick = bottoms.length > 0 ? bottoms[Math.floor(Math.random() * bottoms.length)] : null;
        const shoePick = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : null;

        suggestionText.innerHTML = `Live Temp: <strong>${temp}°C</strong> (${seasonContext})<br>Fit for <strong>${occasion}</strong> at <strong>${place}</strong>:`;

        document.getElementById('layerTop').textContent = topPick ? `Top: ${topPick.name}` : 'Top: [None]';
        document.getElementById('layerBottom').textContent = bottomPick ? `Bottom: ${bottomPick.name}` : 'Bottom: [None]';
        document.getElementById('layerShoes').textContent = shoePick ? `Shoes: ${shoePick.name}` : 'Shoes: [None]';

    } catch (err) {
        suggestionText.innerHTML = `<span style="color:var(--bh-red);">Weather API sync failed. Curating from local collection...</span>`;
        // Fallback random selection if network fails
        const tops = wardrobeCollection.filter(i => i.category === 'Tops' || i.category === 'Dresses' || i.category === 'Outerwear');
        const bottoms = wardrobeCollection.filter(i => i.category === 'Bottoms');
        const shoes = wardrobeCollection.filter(i => i.category === 'Shoes');

        const topPick = tops.length > 0 ? tops[Math.floor(Math.random() * tops.length)] : null;
        const bottomPick = bottoms.length > 0 ? bottoms[Math.floor(Math.random() * bottoms.length)] : null;
        const shoePick = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : null;

        document.getElementById('layerTop').textContent = topPick ? `Top: ${topPick.name}` : 'Top: [None]';
        document.getElementById('layerBottom').textContent = bottomPick ? `Bottom: ${bottomPick.name}` : 'Bottom: [None]';
        document.getElementById('layerShoes').textContent = shoePick ? `Shoes: ${shoePick.name}` : 'Shoes: [None]';
    }
});

// 8. Profile Clear Data & Navigation SPA Switcher
document.getElementById('clearDataBtn').addEventListener('click', () => {
    if (confirm("Wipe local storage wardrobe collection?")) {
        wardrobeCollection = [];
        saveWardrobeData();
        renderCloset();
        alert("Wardrobe reset successfully.");
    }
});

const navButtons = document.querySelectorAll('.nav-btn:not(.btn-logout)');
const sections = document.querySelectorAll('.app-section');
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-sec'));
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-target')).classList.add('active-sec');
    });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('lumiere_active_session');
    window.location.href = 'index.html';
});

// Initialize on load
loadWardrobeData();
renderCloset();