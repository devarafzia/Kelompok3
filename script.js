<script>

// --- 1. Load GeoJSON (gabungan 1 file) ---
let potensiLayer;           // layer utama
let potensiByClass = {};    // sublayer per kelas
let selectedClass = {       // status checkbox
  kurang: false,
  cukup: false,
  sangat: false
};

// warna per kelas
const classStyle = {
  "Kurang": { color: "#ff4d4d", weight: 2, fillOpacity: 0.6 },
  "Cukup": { color: "#ffc107", weight: 2, fillOpacity: 0.6 },
  "Sangat": { color: "#28a745", weight: 2, fillOpacity: 0.6 }
};

// Load file GeoJSON utama
fetch("hasil_potensi.geojson")
  .then(res => res.json())
  .then(data => {
    
    // --- 2. Pecah menjadi sublayer berdasarkan atribut "kelas" ---
    potensiByClass = {
      Kurang: L.geoJSON(data, { 
        filter: f => f.properties.kelas === "Kurang",
        style: classStyle["Kurang"]
      }),

      Cukup: L.geoJSON(data, { 
        filter: f => f.properties.kelas === "Cukup",
        style: classStyle["Cukup"]
      }),

      Sangat: L.geoJSON(data, { 
        filter: f => f.properties.kelas === "Sangat",
        style: classStyle["Sangat"]
      })
    };

  });

// --- 3. Fungsi Tampilkan/Hilangkan per kelas ---
function toggleClassLayer(kelas, checkbox) {
  const layer = potensiByClass[kelas];

  if (checkbox.checked) {
    map.addLayer(layer);
  } else {
    map.removeLayer(layer);
  }
}

// --- 4. Zoom ke kelas tertentu ---
function zoomToClass(kelas) {
  const layer = potensiByClass[kelas];
  if (layer && layer.getBounds) {
    map.fitBounds(layer.getBounds());
  }
}

// --- 5. Slider opacity untuk semua kelas ---
function setOpacity(value) {
  Object.values(potensiByClass).forEach(layer => {
    layer.setStyle({ fillOpacity: value / 100 });
  });
}

</script>
