// 1. DATABASE DATA SISWA (KELAS 1 SMP - KELAS 6 SMA/SMK)
const databaseSiswa = {
    smp: [
        { kelas: "Kelas 1 SMP", nama: "Ahmad Fauzi", nisn: "00123451", jabatan: "Ketua Kelas" },
        { kelas: "Kelas 1 SMP", nama: "Siti Aminah", nisn: "00123452", jabatan: "Anggota" },
        { kelas: "Kelas 2 SMP", nama: "Budi Santoso", nisn: "00123453", jabatan: "Anggota" },
        { kelas: "Kelas 2 SMP", nama: "Dewi Lestari", nisn: "00123454", jabatan: "Sekretaris" },
        { kelas: "Kelas 3 SMP", nama: "Fajar Ramadhan", nisn: "00123455", jabatan: "Anggota" }
    ],
    sma: [
        { kelas: "Kelas 4 SMA/SMK", nama: "Rangga Aditya", nisn: "00234561", jabatan: "Ketua Organisasi" },
        { kelas: "Kelas 4 SMA/SMK", nama: "Andini Putri", nisn: "00234562", jabatan: "Anggota" },
        { kelas: "Kelas 5 SMA/SMK", nama: "Rian Hidayat", nisn: "00234563", jabatan: "Wakil Ketua" },
        { kelas: "Kelas 5 SMA/SMK", nama: "Sania Utama", nisn: "00234564", jabatan: "Bendahara" },
        { kelas: "Kelas 6 SMA/SMK", nama: "Rizky Pratama", nisn: "00234565", jabatan: "Anggota MPO" }
    ]
};

// 2. FUNGSI UNTUK MENAMPILKAN DATA KE HALAMAN WEB
function tampilkanData(kategori) {
    const container = document.getElementById('kelas-display-container');
    container.innerHTML = ''; // Mengosongkan tampilan lama

    // Tentukan data mana yang akan diambil berdasarkan filter tombol
    let dataYangDipilih = [];
    if (kategori === 'all') {
        dataYangDipilih = [...databaseSiswa.smp, ...databaseSiswa.sma];
    } else {
        dataYangDipilih = databaseSiswa[kategori];
    }

    // Kelompokkan data berdasarkan Nama Kelasnya
    const kelompokKelas = {};
    dataYangDipilih.forEach(siswa => {
        if (!kelompokKelas[siswa.kelas]) {
            kelompokKelas[siswa.kelas] = [];
        }
        kelompokKelas[siswa.kelas].push(siswa);
    });

    // Buat HTML Tabel otomatis untuk setiap kelompok kelas
    for (const namaKelas in kelompokKelas) {
        const blokKelas = document.createElement('div');
        blokKelas.className = 'kelas-block';

        let tabelHTML = `
            <h3>${namaKelas}</h3>
            <table class="table-siswa">
                <thead>
                    <tr>
                        <th>Nama Siswa</th>
                        <th>NISN</th>
                        <th>Jabatan / Peran</th>
                    </tr>
                </thead>
                <tbody>
        `;

        kelompokKelas[namaKelas].forEach(siswa => {
            tabelHTML += `
                <tr>
                    <td><strong>${siswa.nama}</strong></td>
                    <td>${siswa.nisn}</td>
                    <td>${siswa.jabatan}</td>
                </tr>
            `;
        });

        tabelHTML += `</tbody></table>`;
        blokKelas.innerHTML = tabelHTML;
        container.appendChild(blokKelas);
    }
}

// 3. FUNGSI LOGIKA FILTER TOMBOL (BERUBAH WARNA SAAT DIKLIK)
function filterTingkat(kategori) {
    // Ambil semua tombol dan hapus class 'active'
    const tombolTombol = document.querySelectorAll('.neo-btn');
    tombolTombol.forEach(tombol => tombol.classList.remove('active'));

    // Tambahkan class 'active' pada tombol yang sedang diklik
    const tombolAktif = event.target;
    tombolAktif.classList.add('active');

    // Jalankan fungsi tampilkan data sesuai kategori pilihan
    tampilkanData(kategori);
}

// 4. JALANKAN PERTAMA KALI SAAT WEBSITE DIBUKA (MENAMPILKAN SEMUA DATA)
document.addEventListener('DOMContentLoaded', () => {
    tampilkanData('all');
});

//* ====== LOGIKA TEMA GELAP NEUBRUTALISME (DARK MODE) ====== */
body.dark-theme {
    background-color: #121318; /* Latar belakang utama hitam kebiruan gelap */
    color: #ffffff; 
}

/* Trik Utama: Ubah warna border & bayangan menjadi PUTIH agar kotak terlihat jelas */
body.dark-theme .neo-card, 
body.dark-theme .kelas-block,
body.dark-theme .kegiatan-card,
body.dark-theme .neo-navbar {
    background-color: #1e1f26; /* Warna kotak abu-abu gelap solid */
    color: #ffffff;
    border: 3px solid #ffffff; /* Garis tepi berubah jadi PUTIH */
    box-shadow: 6px 6px 0px #000000; /* Bayangan tetap hitam tebal agar efek 3D neubrutalisme kontras */
}

/* Mengubah warna teks di dalam kartu agar kontras dengan background gelap */
body.dark-theme p, 
body.dark-theme li,
body.dark-theme .sub-heading {
    color: #cbd5e1; /* Abu-abu terang agar nyaman dibaca */
}

/* Memastikan nama kelas di tabel tetap menyala */
body.dark-theme .kelas-block h3 {
    color: #000000; /* Teks judul kelas tetap hitam karena background-nya cyan menyala */
}

/* Menyesuaikan tabel di mode gelap */
body.dark-theme .table-siswa th {
    background-color: #2d2f39;
    color: #ffffff;
    border-color: #ffffff;
}

body.dark-theme .table-siswa td {
    border-color: #ffffff;
    color: #ffffff;
}