const databaseSiswa = {
    smp: [
        { kelas: "Kelas 1 SMP", nama: "Ahmad Fauzi", nisn: "00123451", jabatan: "Ketua Pengurus SMP" },
        { kelas: "Kelas 1 SMP", nama: "Siti Aminah", nisn: "00123452", jabatan: "Anggota Divisi" },
        { kelas: "Kelas 2 SMP", nama: "Budi Santoso", nisn: "00123453", jabatan: "Anggota Divisi" },
        { kelas: "Kelas 3 SMP", nama: "Fajar Ramadhan", nisn: "00123455", jabatan: "Sekretaris II" }
    ],
    sma: [
        { kelas: "Kelas 4 SMA/SMK", nama: "Rangga Aditya", nisn: "00234561", jabatan: "Ketua Utama OSPI/OPPI" },
        { kelas: "Kelas 4 SMA/SMK", nama: "Andini Putri", nisn: "00234562", jabatan: "Bendahara Umum" },
        { kelas: "Kelas 5 SMA/SMK", nama: "Rian Hidayat", nisn: "00234563", jabatan: "Wakil Ketua" },
        { kelas: "Kelas 6 SMA/SMK", nama: "Rizky Pratama", nisn: "00234565", jabatan: "Majelis Pembina" }
    ]
};

function tampilkanData(kategori) {
    const container = document.getElementById('kelas-display-container');
    if(!container) return;
    container.innerHTML = ''; 

    let dataYangDipilih = [];
    if (kategori === 'all') {
        dataYangDipilih = [...databaseSiswa.smp, ...databaseSiswa.sma];
    } else {
        dataYangDipilih = databaseSiswa[kategori];
    }

    const kelompokKelas = {};
    dataYangDipilih.forEach(siswa => {
        if (!kelompokKelas[siswa.kelas]) {
            kelompokKelas[siswa.kelas] = [];
        }
        kelompokKelas[siswa.kelas].push(siswa);
    });

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

function filterTingkat(kategori) {
    const tombolTombol = document.querySelectorAll('.filter-container .neo-btn');
    tombolTombol.forEach(tombol => tombol.classList.remove('active'));

    if(event && event.target) {
        event.target.classList.add('active');
    }

    tampilkanData(kategori);
}

// TOGGLE DARK MODE
document.addEventListener('DOMContentLoaded', () => {
    tampilkanData('all');

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    if(modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                modeToggle.textContent = '☀️ MODE TERANG';
            } else {
                modeToggle.textContent = '🌙 MODE GELAP';
            }
        });
    }
});