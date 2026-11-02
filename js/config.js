/* ==========================================================
   KONFIGURASI KONTEN — edit file ini untuk ganti semua teks,
   PIN, musik, dan gambar. Tidak perlu menyentuh app.js.
   ========================================================== */
const CONFIG = {
  siteTitle: "Untuk Yasmine",

  // PIN = tanggal lahir Yasmine, format DDMMYY (6 digit).
  // Contoh: 17 Agustus 2003 -> "170803"
  pinCode: "220408",

  landing: {
    title: "I made this, just for you 'Yasmine'",
    subtitle: "ini yang aku bilang 'something special for u'",
    button: "Klik ini"
  },

  pin: {
    title: "Masukin PIN",
    hint: "Hayoo apaa cobaa?",
    button: "Buka"
  },

  // Popup kalau PIN salah
  pinError: {
    message: "SALAH, Coba masukin tanggal lahir kamu",
    button: "Coba lagi"
  },

  // Surat: ganti semua placeholder dengan tulisan lo sendiri.
  // Tambah/kurangi item di "paragraphs" — satu item = satu paragraf.
  letter: {
    greeting: "Yasmine,",
    paragraphs: [
      "Sebelumnya aku mau minta maaf kalau tulisan ini nggak sebagus atau serapih tulisan kamu. I know I'm not really good at putting my feelings into words, kadang aku sendiri bingung gimana cara menyampaikannya. Tapi Kayak yang pernah kamu bilang, nggak apa-apa, yang penting pake perasaan. So, here I am, trying my best to tell you what's been on my mind.",
      "Sometimes I still find it hard to believe how we got here. Padahal awalnya untuk sekadar follow saja aku sampe harus mikir seharian. Bahkan aku masih inget kalau aku minta semua pendapat teman-teman kerja cuma untuk menentukan harus chat dan bilang 'hi' atau 'hallo'.",
      "Lucu sih kalau diinget sekarang. Apalagi waktu kamu bilang terima kasih karena aku sudah berani DM kamu. Jujur, aku senang banget bacanya. Ternyata hal kecil yang dulu sulit aku coba, ternyata juga berarti buat kamu.",
      "Aku suka gimana kamu membuatku lebih nyaman jadi diriku sendiri. Aku bisa cerita banyak hal dan bahkan hal-hal yang biasanya malu untuk aku tunjukkin. And I really appreciate that. Hal-hal kecil darimu juga sering membuat hariku lebih baik. Kayak ucapan semangatmu as aku mau kerja atau pujianmu setiap aku mengirim foto. Mungkin itu sederhana buat kamu, but it means a lot to me.",
      "Aku nggak tahu apakah aku selalu bisa menjadi orang yang tahu harus berbuat apa ketika kamu sedang punya masalah. Kadang aku bahkan bingung harus menjawab apa pas kamu cerita. Tapi aku selalu pengen mendengarnya. There are times when I just wish I could be there, memelukmu dan menemanimu, terutama ketika semuanya terasa berat buatmu.",
      "Aku senang banget bisa kenal kamu, Mine. Aku pengen kita bisa terus saling cerita tanpa harus takut dianggap merepotkan. Aku pengen liat kita tumbuh, kejar hal-hal yang kita impikan, dan saling menemani dalam prosesnya. Nggak harus selalu punya hari yang menyenangkan, yang penting kita tau kalau kita punya satu sama lain untuk berbagi cerita.",
      "Thank you for being here, Mine. Terima kasih udah jadi bagian dari hari-hariku dan membuat banyak hal jadi sedikit lebih baik."
    ],
    closing: "I Love You.",
    continueButton: "Lanjut"
  },

  // Taruh file musik di assets/music/ lalu samakan nama file-nya
  music: {
    src: "assets/music/Karolina.m4a",
    playLabel: "Song for u (Karolina - Sore)",
    pauseLabel: "Jeda musik"
  },

  proposal: {
    question: "Will you be my girlfriend?",
    yes: "IYA, MAU",
    no: "ENGA"
  },

  // Gambar: timpa file di assets/images/ (nama sama), atau ubah path di bawah
  final: {
    title: "YEAYY, THANK YOUUUU",
    message: "So.., we're officially a couple noww..?",
    gifts: [
      { image: "assets/images/gambar-tangan.svg", alt: "Gambar tangan wajah Yasmine", caption: "Ini aku gambar kamu(foto dari samping biar ga keliatan peyang)" },
      { image: "assets/images/chibi.svg",         alt: "Ilustrasi chibi Yasmine",      caption: "Ini aku iseng bikin di Adobe Illustrator" }
    ]
  }
};
