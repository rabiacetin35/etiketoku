document.getElementById('readButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    const result = document.getElementById('result');
    
    // Fotoğraf yüklendi mi kontrol et
    if (imageInput.files.length === 0) {
        alert("Lütfen bir fotoğraf yükleyin.");
        return;
    }

    const image = imageInput.files[0];

    // Yüklenen fotoğrafı konsola yazdır
    console.log("Yüklenen Fotoğraf:", image);

    // Tesseract.js kullanarak metni tara
    Tesseract.recognize(
        image,
        'eng', // Dil: İngilizce
        {
            logger: info => console.log(info) // İşlem ilerlemesini konsolda göster
        }
    ).then(({ data: { text } }) => {
        // Okunan metni temizleme
        const cleanedText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(); // Satır sonlarını kaldır, çoklu boşlukları tek boşlukla değiştir ve baş/son boşlukları temizle
        console.log("Düzenlenmiş Metin:", cleanedText);

        // "soya lestini" kelimesini kırmızı yap
        const highlightedText = cleanedText.replace(/gluten/gi, '<span class="highlighted">gluten</span>');

        result.innerHTML = "Etiketteki Metin: \n" + highlightedText; // HTML olarak ekle
    }).catch(err => {
        console.error("Okuma Hatası:", err);
        result.innerText = "Bir hata oluştu. Lütfen tekrar deneyin.";
    });
});

