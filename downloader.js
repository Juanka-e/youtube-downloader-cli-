const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- YouTube Video & Ses İndirici (Gelişmiş) ---");

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    try {
        const url = await askQuestion("YouTube Linkini Girin: ");
        if (!url) {
            console.log("Link girmediniz!");
            rl.close();
            return;
        }

        console.log("\n--- İndirme Modu ---");
        console.log("1. Tamamını İndir");
        console.log("2. Belirli Bir Aralığı Kes ve İndir (Saniye/Dakika)");
        
        const modeChoice = await askQuestion("Seçiminiz (1 veya 2): ");
        let rangeArgs = [];

        if (modeChoice.trim() === '2') {
            console.log("\n--- Zaman Aralığı ---");
            console.log("NOT: Kesme işlemi için FFmpeg kurulu olmalıdır.");
            const start = await askQuestion("Başlangıç (Örn: 00:01:30 veya 90): ");
            const end = await askQuestion("Bitiş     (Örn: 00:02:00 veya 120): ");
            
            if (!start || !end) {
                console.log("Zaman girilmedi, işlem iptal.");
                rl.close();
                return;
            }
            
            rangeArgs = ['--download-sections', `*${start}-${end}`];
            console.log(`\n${start} ile ${end} arası hazırlanıyor...`);
        } else if (modeChoice.trim() !== '1') {
            console.log("Geçersiz seçim!");
            rl.close();
            return;
        }

        console.log("\n--- Format Seçimi ---");
        console.log("1. Video (MP4) - Windows Uyumlu (H.264)");
        console.log("2. Ses   (MP3) - Sadece Ses");

        const formatChoice = await askQuestion("Format Seçiniz (1 veya 2): ");
        let formatArgs = [];

        if (formatChoice.trim() === '1') {
            console.log("MP4 Video formatı seçildi...");
            // Windows uyumlu (H.264) video + ses
            formatArgs = [
                '-f', 'bestvideo[vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                '--merge-output-format', 'mp4'
            ];
        } else if (formatChoice.trim() === '2') {
            console.log("MP3 Ses formatı seçildi...");
           
            formatArgs = ['-x', '--audio-format', 'mp3'];
        } else {
            console.log("Geçersiz format! Varsayılan (MP4) seçiliyor.");
            formatArgs = [
                '-f', 'bestvideo[vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                '--merge-output-format', 'mp4'
            ];
        }

       
        // Sıralama: [Zaman Aralığı (varsa)] + [Format Ayarları] + [Çıktı Ayarları] + [URL]
        const finalArgs = [
            ...rangeArgs,
            ...formatArgs,
            '-o', '%(title)s.%(ext)s',
            '--windows-filenames',
            '--no-mtime',
            '--force-keyframes-at-cuts', 
            url
        ];

        console.log("\nİndirme işlemi başlatılıyor...\n");

     
        const downloadProcess = spawn('yt-dlp', finalArgs, { stdio: 'inherit', shell: false });

        downloadProcess.on('close', (code) => {
            if (code === 0) {
                console.log("\nİşlem Başarıyla Tamamlandı!");
            } else {
                console.log(`\nİşlem bir hata ile sonlandı. Hata kodu: ${code}`);
            }
            rl.close();
        });

    } catch (error) {
        console.error("Bir hata oluştu:", error);
        rl.close();
    }
}

main();