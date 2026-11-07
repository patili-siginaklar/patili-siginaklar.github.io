// Gerçek ve doğrulanmış barınaklar hazır olduğunda bu listeye eklenir.
// Örnek: {name:"Barınak Adı",lat:41.0,lng:29.0,description:"Kısa açıklama"}

const shelters = [
  {
    name: "1. Barınak - Gümüşhane Merkez",
    lat: 40.437711,
    lng: 39.505150,
    description: "Harşit Çayı kenarındaki yürüyüş yolunda, demir korkulukların yanında bulunmaktadır. Sokak hayvanları için mama ve temiz su bırakabilirsiniz.",
    image: "assets/Turuncu İşaretli Barınak Konumu.png"
  
  },
  {
    name: "2. Barınak - Gümüşhane Merkez",
    lat: 40.4362420,
    lng: 39.5082806,
    description: "Harşit Çayı kenarındaki yürüyüş yolunda, demir korkulukların yanında bulunmaktadır. Kırmızı yürüyüş parkurunun yanındaki barınağa mama ve temiz su bırakabilirsiniz.",
    image: "assets/barinak.-2.png"
  },
{
  name: "3. Barınak - Gümüşhane Merkez (A101 Karşısı)",
  lat: 40.4358628,
  lng: 39.5127737,
  description: "A101 marketin hemen karşısında bulunmaktadır. Sokak hayvanları için bu noktaya mama ve temiz su bırakabilirsiniz.",
  image: "assets/barinak-3.png.png"
}

];


const map = L.map("map").setView([39.0, 35.0], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap katkıcıları'
}).addTo(map);
const orangeIcon = L.divIcon({
  className:"custom-marker",
  html:'<div style="background:#f47b20;color:white;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;box-shadow:0 4px 12px rgba(0,0,0,.2);"><span style="transform:rotate(45deg);font-size:17px;">🐾</span></div>',
  iconSize:[34,34],iconAnchor:[17,34],popupAnchor:[0,-32]
});
const list = document.getElementById("shelterList");
if (!shelters.length) list.innerHTML = '<p class="empty-shelters">Henüz yayınlanmış barınak konumu yok. Konumlar doğrulandıktan sonra burada görünecek.</p>';
const bounds=[];
shelters.forEach(shelter=>{
  const lat=Number(shelter.lat),lng=Number(shelter.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
  bounds.push([lat,lng]);
  const marker=L.marker([lat,lng],{icon:orangeIcon}).addTo(map);
  const popup=document.createElement('div');
  const title=document.createElement('div');title.className='popup-title';title.textContent='🐾 '+shelter.name;
  const desc=document.createElement('div');desc.className='popup-desc';desc.textContent=shelter.description;
  const link=document.createElement('a');link.className='popup-directions';link.textContent='🧭 Google Haritalar’da Yol Tarifi Al';
  link.href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(lat+','+lng);
  link.target='_blank';link.rel='noopener noreferrer';
 
if (shelter.image) {
  const photo = document.createElement("img");
  photo.src = shelter.image;
  photo.alt = shelter.name + " konum fotoğrafı";
  photo.style.width = "100%";
  photo.style.maxWidth = "260px";
  photo.style.borderRadius = "10px";
  photo.style.margin = "10px 0";
  photo.style.display = "block";
  popup.append(title, photo, desc, link);
} else {
  popup.append(title, desc, link);
}
marker.bindPopup(popup);

  const item=document.createElement('div');item.className='shelter-item';
  const name=document.createElement('strong');name.textContent='📍 '+shelter.name;
  const details=document.createElement('p');details.textContent=shelter.description;
  item.append(name,details);item.addEventListener('click',()=>{map.setView([lat,lng],17);marker.openPopup();});list.appendChild(item);
});
if(bounds.length)map.fitBounds(bounds,{padding:[40,40],maxZoom:14});
document.getElementById('shelterCount').textContent=bounds.length;
document.getElementById('listCount').textContent=bounds.length+' konum';



/* Mobil menüyü açıp kapat */
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Menüyü kapat" : "Menüyü aç"
    );
  });

  /* Menü bağlantısına basılınca menüyü kapat */
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menüyü aç");
    });
  });
}
