document.addEventListener("DOMContentLoaded", () => {
    const map = document.getElementById("map");
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const options = document.getElementById("options");
    const inventory = document.getElementById("inventory");
    const tower = document.getElementById("tower");
    const ariImgContainer = document.getElementById("ari-character");
    const submitAnswer = document.getElementById("submit-answer");
    const backToMap = document.getElementById("back-to-map");

    // Data kuis
    const quizData = {
        1: { 
            question: "Apa itu variabel?", 
            options: ["Penyimpan data", "Fungsi", "Loop"], 
            answer: 0 
        },
        2: { 
            question: "Apa hasil dari 3 + 2?", 
            options: ["5", "6", "7"], 
            answer: 0 
        },
        3: {
            question: "Apa itu Debugging?",
            options: ["Proses mencari dan memperbaiki bug", "Menggunakan framework", "Membuat variabel baru"],
            answer: 0
        },
        4: {
            question: "Apa yang dimaksud dengan Algoritma?",
            options: ["Langkah-langkah pemecahan masalah", "Sistem operasi", "Bahasa pemrograman"],
            answer: 0
        }
    };

    // Array untuk gambar Ari yang akan ditambahkan
    const ariImages = [
        "assets/images/ari-walking1.png",
        "assets/images/ari-walking2.png",
        "assets/images/ari-walking3.png",
        "assets/images/ari-walking4.png"
    ];

    let ariWalkCounter = 0; // Menghitung berapa kali gambar Ari ditambahkan
    let collectedComponents = 0; // Menyimpan jumlah komponen yang terkumpul

    // Event listener untuk pos
    document.querySelectorAll(".pos").forEach(pos => {
        pos.addEventListener("click", () => {
            const posNumber = pos.getAttribute("data-pos");
            loadQuiz(posNumber);
        });
    });

    // Event untuk tombol kembali ke peta
    backToMap.addEventListener("click", () => {
        map.classList.remove("hidden");
        quiz.classList.add("hidden");
    });

    // Event untuk Bangun Menara
    document.getElementById("final-level").addEventListener("click", () => {
        if (collectedComponents >= 4) {
            showSuccessMessage();
        } else {
            alert("Kumpulkan semua komponen terlebih dahulu!");
        }
    });

    // Fungsi memuat kuis
    function loadQuiz(posNumber) {
        const data = quizData[posNumber];
        if (!data) return;

        question.textContent = data.question;
        options.innerHTML = "";
        data.options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.dataset.index = index;
            btn.addEventListener("click", () => checkAnswer(posNumber, index));
            options.appendChild(btn);
        });

        map.classList.add("hidden");
        quiz.classList.remove("hidden");
    }

    // Fungsi mengecek jawaban
    function checkAnswer(posNumber, selectedIndex) {
        const correctAnswer = quizData[posNumber].answer;
        if (selectedIndex == correctAnswer) {
            alert("Benar! Anda mendapatkan item.");
            addImageToAriWalk(); // Menambahkan gambar Ari ke bawah setiap selesai pos
            collectedComponents++; // Menambahkan komponen tower yang terkumpul
            backToMap.click();
        } else {
            alert("Jawaban salah. Coba lagi!");
        }
    }

    // Fungsi menambahkan gambar Ari ke dalam container
    function addImageToAriWalk() {
        // Pastikan gambar Ari belum mencapai batas 4
        if (ariWalkCounter < ariImages.length) {
            const img = document.createElement("img");
            img.src = ariImages[ariWalkCounter]; // Ambil gambar Ari sesuai urutan
            ariImgContainer.appendChild(img); // Tambahkan gambar ke dalam container ari-character
            ariWalkCounter++; // Increment counter untuk gambar berikutnya
        }
    }

    // Fungsi untuk menampilkan pesan sukses
    function showSuccessMessage() {
        const successMessage = document.createElement("div");
        successMessage.id = "success-message";
        successMessage.textContent = "Selamat! Anda berhasil membangun Menara Coding!";
        document.body.appendChild(successMessage);

        // Menambahkan tombol untuk restart
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.addEventListener("click", () => restartGame());
        successMessage.appendChild(restartButton);

        successMessage.style.display = "block"; // Menampilkan pesan sukses
    }

    function restartGame() {
        // Reset semua komponen permainan
        collectedComponents = 0;
        ariWalkCounter = 0;
        tower.innerHTML = "";
        ariImgContainer.innerHTML = `<img id="ari-img" src="assets/images/ari-standing.gif" alt="Ari" />`; // Reset gambar Ari
        const successMessage = document.getElementById("success-message");
        if (successMessage) {
            successMessage.style.display = "none"; // Sembunyikan pesan sukses
            successMessage.remove(); // Hapus elemen success message
        }
        map.classList.remove("hidden"); // Tampilkan kembali peta
        quiz.classList.add("hidden"); // Sembunyikan quiz
    }
    
});
