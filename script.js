window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('opacity-0');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 700);
            }, 500);
        });


        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });


    document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const alertBox = document.getElementById('form-alert');
    const submitBtn = document.getElementById('submit-btn');
    
    // Ubah status tombol jadi Loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Mengirim...</span>`;

    // Ambil data langsung menggunakan objek FormData standar
    const formData = new FormData();
    formData.append('access_key', document.getElementById('access_key').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);

    // Jalankan AJAX Request ke Web3Forms tanpa pindah halaman
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alertBox.classList.remove('hidden');
            document.getElementById('contact-form').reset();
        } else {
            alert('Gagal mengirim: ' + data.message);
        }
    })
        .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan koneksi internet atau CORS Browser.');
        })
        .finally(() => {
            // Kembalikan tombol ke keadaan semula
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane text-sm"></i> <span>Kirim Pesan</span>`;
        });
    });
// Data modal riwayat pendidikan
const educationDetails = {
    tk: {
        year: '2013–2014',
        title: 'TK Kartika XVII-07',
        subtitle: 'Taman Kanak-kanak',
        description: 'Masa awal mengenal dunia belajar melalui kegiatan bermain, bersosialisasi, mewarnai, dan membaca dasar.'
    },
    sd: {
        year: '2014–2020',
        title: 'SD Negeri 02 Anjongan',
        subtitle: 'Sekolah Dasar',
        description: 'Membangun pengetahuan dasar dalam berbagai mata pelajaran, mengembangkan kemampuan berpikir, serta belajar bekerja sama melalui kegiatan sekolah.'
    },
    smp: {
        year: '2020–2023',
        title: 'SMP Negeri 01 Anjongan',
        subtitle: 'Sekolah Menengah Pertama',
        description: 'Mengembangkan kemampuan akademik serta mengeksplorasi minat dan bakat melalui kegiatan sekolah.'
    },
    sma: {
        year: '2023–2026',
        title: 'SMA Negeri 01 Sungai Pinyuh',
        subtitle: 'Sekolah Menengah Atas – Kurikulum Merdeka',
        description: 'Menjalani pembelajaran dengan memilih mata pelajaran sesuai minat, yaitu Matematika, Fisika, Informatika, dan Bahasa Inggris. Pilihan ini membantu mengembangkan kemampuan berpikir logis, pemecahan masalah, serta ketertarikan pada teknologi dan pemrograman.'
    },
    kuliah: {
        year: '2026–Sekarang',
        title: 'Universitas Tanjungpura',
        subtitle: 'S1 Sistem Informasi',
        description: 'Masih dalam tahap adaptasi dengan lingkungan perkuliahan dan proses pembelajaran di bidang Sistem Informasi. Mulai mempelajari dasar-dasar pemrograman, analisis sistem, serta desain antarmuka pengguna (UI/UX) sebagai langkah awal untuk mengembangkan keterampilan di bidang teknologi informasi.'
    }
};

function openModal(level) {
    const detail = educationDetails[level];
    const modal = document.getElementById('edu-modal');

    if (!detail || !modal) return;

    document.getElementById('modal-year').textContent = detail.year;
    document.getElementById('modal-title').textContent = detail.title;
    document.getElementById('modal-subtitle').textContent = detail.subtitle;
    document.getElementById('modal-desc').textContent = detail.description;

}

function closeModal() {
    document.getElementById('edu-modal')?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

document.getElementById('edu-modal')?.addEventListener('click', (event) => {
    if (event.target.id === 'edu-modal') closeModal();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});

