const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- Gelistirilmis YouTube Playlist İndirici (Windows Uyumlu & Klasörlü) ---");
console.log("NOT: Dosyalar 'Playlistlerim/Playlist Adı/' klasörüne indirilecektir.");

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    try {
        const url = await askQuestion("\nPlaylist Linkini Girin: ");
        if (!url) {
            console.log("Link girmediniz!");
            rl.close();
            return;
        }

        console.log("\n--- İndirme Modu ---");
        console.log("1. BÜTÜN Playlist'i indir");
        console.log("2. Sadece BELİRLİ videoları indir");
        
        const modeChoice = await askQuestion("Seçiminiz (1 veya 2): ");

        let playlistArgs = [];
        
        if (modeChoice.trim() === '2') {
            console.log("\nİndirmek istediğiniz videoların sıra numaralarını girin (Örn: 1,3,5-10):");
            const items = await askQuestion("Sıra Numaraları: ");
            if (items) {
                playlistArgs.push('--playlist-items', items);
            }
        }
        playlistArgs.push('--yes-playlist');

        console.log("\n--- Kalite ve Format Seçimi ---");
        console.log("1. 1080p (MP4 - H.264 Codec - %100 Uyumlu)");
        console.log("2. 720p  (MP4 - H.264 Codec - %100 Uyumlu)");
        console.log("3. 480p  (MP4 - H.264 Codec - Düşük Boyut)");
        console.log("4. Sadece Ses (MP3)");

        const qualityChoice = await askQuestion("Kalite Seçiniz (1-4): ");
        let formatArgs = [];

        switch (qualityChoice.trim()) {
            case '1': // 1080p
                console.log("1080p H.264 (Windows Uyumlu) seçildi...");
                formatArgs = [
                    '-f', 'bestvideo[height<=1080][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                    '--merge-output-format', 'mp4'
                ];
                break;
            case '2': // 720p
                console.log("720p H.264 (Windows Uyumlu) seçildi...");
                formatArgs = [
                    '-f', 'bestvideo[height<=720][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                    '--merge-output-format', 'mp4'
                ];
                break;
            case '3': // 480p
                console.log("480p H.264 (Windows Uyumlu) seçildi...");
                formatArgs = [
                    '-f', 'bestvideo[height<=480][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                    '--merge-output-format', 'mp4'
                ];
                break;
            case '4': // MP3
                console.log("MP3 formatı seçildi...");
                formatArgs = ['-x', '--audio-format', 'mp3'];
                break;
            default:
                console.log("Geçersiz seçim, varsayılan 720p indirilecek.");
                formatArgs = [
                    '-f', 'bestvideo[height<=720][vcodec^=avc]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                    '--merge-output-format', 'mp4'
                ];
                break;
        }

       
        // Playlistlerim/PlaylistAdi/01 - VideoAdi.mp4
        const outputTemplate = 'Playlistlerim/%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s';

        const finalArgs = [
            ...formatArgs,
            ...playlistArgs,
            '-o', outputTemplate,
            '--windows-filenames', 
            '--no-mtime',
            '--ignore-errors',
            url
        ];

        console.log("\nİndirme başlatılıyor...\n");
        console.log("Dosyalar 'Playlistlerim' klasörüne kaydedilecek.");

        const downloadProcess = spawn('yt-dlp', finalArgs, { stdio: 'inherit', shell: false });

        downloadProcess.on('close', (code) => {
            if (code === 0) {
                console.log("\nİşlem Başarıyla Tamamlandı!");
            } else {
                console.log(`\nİşlem bitti (Kod: ${code}).`);
            }
            rl.close();
        });

    } catch (error) {
        console.error("Beklenmedik bir hata:", error);
        rl.close();
    }
}

main();