// =================================================
// FILE: template-pdf.js
// Berisi fungsi untuk membuat file PDF bukti kelulusan
// =================================================

// Ekspor fungsi agar bisa diimpor di file lain
export function generateBuktiLolosPDF(peserta, jsPDF, autoTable) {
    if (!peserta) {
        console.error("Data peserta tidak ditemukan.");
        return;
    }

    const doc = new jsPDF();

    // Fungsi untuk memastikan data kosong ditampilkan sebagai 'Belum Dilengkapi'
    function getData(value) {
        return value && String(value).trim() !== '' ? value : 'Belum Dilengkapi';
    }
    
    // Data dinamis
    const tglCetak = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const tempatTglLahir = `${getData(peserta['TEMPAT LAHIR'])}, ${getData(peserta['TANGGAL LAHIR'])}`;
    const noRegistrasi = `FLF-2024-${String(peserta.id).padStart(3, '0')}`;

    // ===== HEADER UTAMA =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('FUTURE LEADERS FELLOWSHIP', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    doc.text('CHAPTER UNIVERSITAS JEMBER', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Jalan Kalimantan No. 37, Kampus Tegalboto', doc.internal.pageSize.getWidth() / 2, 33, { align: 'center' });
    doc.text('Jember, Jawa Timur 68121', doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
    doc.text('flfchapterunej@gmail.com', doc.internal.pageSize.getWidth() / 2, 43, { align: 'center' });

    // ===== JUDUL =====
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('BUKTI LOLOS SELEKSI', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' });
    
    // ===== GARIS PEMISAH =====
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);


    // ===== PARAGRAF =====
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Dengan ini menyatakan bahwa Calon Peserta dengan data di bawah ini:', 20, 70);

    // ===== TABEL =====
    doc.autoTable({
      startY: 75,
      theme: 'plain',
      body: [
        ['Nama Lengkap', `: ${getData(peserta['NAMA LENGKAP'])}`],
        ['Tempat, Tanggal Lahir', `: ${tempatTglLahir}`],
        ['Perguruan Tinggi', ': Universitas Jember'],
        ['Fakultas', `: ${getData(peserta['NAMA FAKULTAS'])}`],
      ],
      styles: { cellPadding: 1.5, fontSize: 11 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 55 } }
    });

    let finalY = doc.lastAutoTable.finalY || 100;

    doc.text('Telah dinyatakan LOLOS dan berhak untuk mengikuti program Future Leaders', 20, finalY + 10);
    doc.text('Fellowship Chapter Universitas Jember.', 20, finalY + 17);

    // ===== KALIMAT PENUTUP =====
    doc.text('Wallahul Muwafieq Illa Aqwamith Tharieq', 20, finalY + 30);

    // ===== TTD =====
    doc.text(`Jember, ${tglCetak}`, 190, finalY + 45, { align: 'right' });
    doc.text('Hormat Kami,', 190, finalY + 52, { align: 'right' });
    doc.text('Commitee FLF Chapter UNEJ', 190, finalY + 70, { align: 'right' });

    // ===== SIMPAN FILE =====
    doc.save(`Bukti Lolos FLF - ${peserta['NAMA LENGKAP']}.pdf`);
}