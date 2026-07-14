# Product Design & UI/UX Guidelines: GiziLog
**Design Philosophy:** Clean, Health-Centric, High Contrast, Intuitive Mobile UX.  
**Primary Palette:** Bio-Green (Primary action/health), Deep Charcoal (Text readability), Warning Orange/Red (Threshold anomalies).

---

## 1. Design System & Tokens
*   **Color Palette:**
    *   Primary Green: `#22C55E` (Tailwind `green-500`)
    *   Accent Blue: `#2563EB` (Tailwind `blue-600` - Used for primary UI emphasis)
    *   Dark Neutral: `#1F2937` (Tailwind `gray-800` - Base text)
    *   Light Neutral: `#F9FAFB` (Tailwind `gray-50` - Background surfaces)
*   **Typography:**
    *   Headings: Inter / Sans-Serif, Semi-Bold to Black weight.
    *   Body text: Inter, Regular weight, high line-height tracking for accessibility.

---

## 2. Layout Structure & Wireframe Mapping

### Component A: Hero Value Proposition (Landing Banner)
*   **Visual Layout:** High-contrast text stack aligned to center or left-grid boundaries.
*   **Headline Styling:** Font weight 800 (Black), Font size 2.5rem. Highlight action terminology in Accent Blue.
    *   *Text:* "Foto Nutrisi. Bebas **[Blue Accent]Stunting[/Blue Accent]**."
*   **Sub-headline Styling:** Font size 1rem, gray text `#4B5563`. Max-width constrained to 45ch for ideal paragraph scannability.
    *   *Text:* "Supercharge pemantauan gizimu dengan teknologi AI food object scanner yang praktis dan analisis nutrisi harian yang akurat."

### Component B: Camera Scanner Overlay
*   **Viewfinder View:** `react-webcam` component must stretch to fit the absolute viewport boundaries of the parent component box container (`border-radius: 16px`, `overflow: hidden`).
*   **Scanning Animation CSS Rule:** Overlap an absolute div layer inside the camera container. Apply a dynamic scanning laser line effect:
    ```css
    @keyframes scan-line {
      0% { top: 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    ```
*   **UI Controls:** Place a single prominent circular button layered over the center-bottom portion of the camera layout. Disabled state must reflect a processing spinner text overlay.

### Component C: Sekat Piring Makan (Nutrient Feedback)
*   **Visual Grid:** Split display into a top card holding the Recharts Pie Chart and a bottom vertical list holding nutritional indicators.
*   **Data Indicators:** Use Tailwind-styled pills (`px-3 py-1 rounded-full text-xs font-semibold`).
    *   Sodium Excess State: Background `#FEE2E2` (Red-100), Text `#991B1B` (Red-800), Label: `SANGAT TINGGI`.
    *   Ideal Fiber State: Background `#DCFCE7` (Green-100), Text `#166534` (Green-800), Label: `IDEAL`.

### Component D: Responsive Desktop Analytics Layout
*   **Media Query Breakdown:** `@media (min-width: 1024px)` must trigger grid conversion.
*   **Layout Shift:** 
    *   The core navigation switches from a mobile bottom-bar to a sticky sidebar layout on desktop views.
    *   The layout container switches from a single-column view to a multi-column asymmetric grid: Left span (70%) displays full widescreen Recharts graphs; Right span (30%) renders a persistent profile parameter controller card, target calorie dial sliders, and AI health suggestions (`Gizi Insight`).

## 3. Strict Responsive Architecture (Screen-Detection Rules)

AI Agent wajib mengimplementasikan strategi Mobile-First dengan breakpoint Tailwind CSS `lg:` (`1024px`) untuk mendeteksi screen desktop secara mutlak.

1.  **Sistem Navigasi:**
    * **Mobile Screen (< 1024px):** Sembunyikan sidebar. Tampilkan **Bottom Navigation Bar** yang melayang di bawah layar dengan ikon: Dashboard, Scan, Statistik, Profil.
    * **Desktop Screen (>= 1024px):** Sembunyikan bottom nav. Tampilkan **Sticky Sidebar** di sisi kiri layar dengan lebar tetap `260px` berisi menu navigasi vertikal.
2.  **Sistem Switch Screen:**
    * Gunakan kombinasi utilitas class Tailwind `block lg:hidden` untuk elemen khusus mobile, dan `hidden lg:block` untuk elemen khusus desktop.
    * Jangan membuat route URL terpisah untuk desktop dan mobile. Halaman harus otomatis merender UI yang sesuai di bawah route yang sama (misal: `/dashboard` otomatis berganti layout saat window di-resize).

---

## 4. Page-by-Page UI Layout Detail

### PAGE 01: Landing & Auth Page (`/` / `/login` / `/register`)
* **Mobile Layout (< 1024px):** Layout vertikal satu kolom penuh (`flex flex-col`). Bagian atas menampilkan logo dan teks Hero Section, bagian bawah langsung menampilkan Card Form Login/Register yang berjarak penuh (*full width*).
* **Desktop Layout (>= 1024px):** Layout dua kolom simetris (`grid grid-cols-2 h-screen`).
    * *Kolom Kiri:* Ilustrasi/Mockup GiziLog estetis dengan background gradient warna Bio-Green, disertai teks Hero utama: "Foto Nutrisi. Bebas Stunting."
    * *Kolom Kanan:* Form Login/Register ditaruh di tengah (*centered container* dengan batas `max-w-md`) dengan latar belakang bersih Light Neutral (`#F9FAFB`).

### PAGE 02: Dashboard Utama (`/dashboard`)
* **Mobile Layout (< 1024px):** Scroll vertikal satu kolom. 
    * *Seksi 1:* Header selamat datang dan sisa kalori dalam bentuk lingkaran dial besar.
    * *Seksi 2:* Grid 3 kolom horizontal untuk rincian makronutrisi harian (Protein, Karbo, Lemak).
    * *Seksi 3:* Daftar vertikal `Timeline Makan` (Sarapan, Makan Siang, dll.).
* **Desktop Layout (>= 1024px):** Layout dua kolom asimetris (`grid grid-cols-3 gap-6`).
    * *Sisi Kiri (Span 2):* Menampilkan `Timeline Makan` berwujud kartu-kartu horizontal besar dan rangkuman asupan harian.
    * *Sisi Kanan (Span 1):* Kartu status kalori berbentuk lingkaran dial statis di bagian atas, dan di bawahnya terdapat widget *Quick Actions* untuk membuka modal kamera/log cepat.

### PAGE 03: AI Scanner & Hasil Sekat Piring (`/scan`)
* **Mobile Layout (< 1024px):** Fokus penuh pada kamera. Komponen `react-webcam` mengambil 100% lebar area atas. Tombol jepret bulat besar mengambang di bawah kamera. Begitu terdeteksi, card analisis gizi *Sekat Piring* muncul menyelimuti layar dari bawah (*slide-up sheet*).
* **Desktop Layout (>= 1024px):** Layout pisah sisi (`flex flex-row gap-8 items-start`).
    * *Sisi Kiri (Lebar 45%):* Box kamera berbingkai rapi (`aspect-video` atau `aspect-square`) lengkap dengan laser animasi scan naik-turun.
    * *Sisi Kanan (Lebar 55%):* Panel hasil scan AI langsung terlihat secara real-time di samping kamera tanpa menutupi layar. Skema grafik Recharts Pie Chart langsung dirender di panel kanan ini berdampingan dengan indikator status ambang batas gizi.

### PAGE 04: Statistik & Analitik Jangka Panjang (`/statistics`)
* **Mobile Layout (< 1024px):** Satu kolom. Grafik mingguan Recharts disederhanakan hanya berupa grafik batang tunggal agar tidak padat. Di bawah grafik terdapat ringkasan teks evaluasi mingguan pendek.
* **Desktop Layout (>= 1024px):** High-Density Dashboard (`grid grid-cols-4 gap-6`).
    * *Main Panel (Span 3):* Menampilkan dua grafik besar sekaligus berdampingan (Grafik Bar Chart untuk kalori harian dan Area Chart untuk fluktuasi berat badan bulanan).
    * *Side Panel (Span 1):* Menampilkan kotak interaktif bertenaga AI yaitu `Gizi Insight`. Sisi ini menampung rekomendasi makanan sehat otomatis dari OpenClaw berbasis performa grafik mingguan user.

### PAGE 05: Profil & Pengaturan (`/profile`)
* **Mobile Layout (< 1024px):** Daftar menu navigasi pengaturan vertikal (tipe list baris per baris) seperti aplikasi mobile pada umumnya, dengan tombol logout besar berwarna merah di paling bawah.
* **Desktop Layout (>= 1024px):** Layout tab horizontal terpisah (`flex flex-row gap-6`). Sisi kiri berisi sub-tab (Informasi Fisik, Notifikasi, Akun), sedangkan sisi kanan menampilkan form pengisian data dari sub-tab yang sedang aktif secara responsif.
