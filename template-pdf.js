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
    doc.setFont('times new roman', 'bold');
    doc.setFontSize(16);
    doc.text('FUTURE LEADERS FELLOWSHIP', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    doc.text('CHAPTER UNIVERSITAS JEMBER', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('times new roman', 'normal');
    doc.text('flfchapterunej@gmail.com', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

    // ===== JUDUL =====
    doc.setFontSize(16);
    doc.setFont('times new roman', 'bold');
    doc.text('BUKTI LOLOS SELEKSI', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });
    
    // ===== GARIS PEMISAH =====
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);


    // ===== PARAGRAF =====
    doc.setFontSize(12);
    doc.setFont('times new roman', 'normal');
    doc.text('Dengan ini menyatakan bahwa Calon Peserta dengan data di bawah ini:', 20, 60);

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
      styles: { 
        font: 'times new roman', // <-- FONT TABEL DIUBAH DI SINI
        cellPadding: 1.5, 
        fontSize: 12
      },
      columnStyles: { 
        0: { 
          fontStyle: 'bold', 
          cellWidth: 55 
        } 
      }
    });

    let finalY = doc.lastAutoTable.finalY || 100;

    doc.text('Telah dinyatakan LOLOS dan berhak untuk mengikuti program Future Leaders Fellowship Chapter Universitas Jember.', 20, finalY + 10);

    // ===== KALIMAT PENUTUP =====
    doc.text('Wallahul Muwafieq Illa Aqwamith Tharieq', 20, finalY + 30);

    // ===== TTD =====
    doc.text(`Jember, ${tglCetak}`, 190, finalY + 45, { align: 'right' });
    doc.text('Hormat Kami,', 190, finalY + 52, { align: 'right' });
    doc.text('Commitee FLF Chapter UNEJ', 190, finalY + 70, { align: 'right' });

    // ===== SIMPAN FILE =====
    doc.save(`Bukti Lolos FLF - ${peserta['NAMA LENGKAP']}.pdf`);
}
