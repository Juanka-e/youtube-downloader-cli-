# Youtube Video & Playlist İndirici (Gelişmiş CLI)

Bu proje, **yt-dlp** kütüphanesini kullanarak YouTube videolarını, playlistlerini veya videoların belirli kısımlarını (keserek) indirmeyi sağlayan kullanıcı dostu bir araçtır.

## Özellikler

*   **Kolay Kurulum:** `setup.bat` ile gerekli tüm araçları (ffmpeg, yt-dlp güncellemesi) otomatik kurar.
*   **Video Kesme:** Videonun tamamını indirmek zorunda değilsiniz. Saniye/Dakika vererek sadece istediğiniz kısmı indirebilirsiniz.
*   **Playlist Desteği:** Tüm playlisti veya seçtiğiniz sıradaki videoları indirebilirsiniz.
*   **Otomatik Klasörleme:** İndirilen playlistler `Playlistlerim/Playlist Adı` şeklinde düzenli klasörlenir.
*   **Format Seçimi:** 
    *   🎥 **Video:** MP4 (H.264 Codec - %100 Windows Uyumlu)
    *   🎵 **Ses:** MP3
*   **Hata Düzeltmeleri:** Windows dosya ismi hataları ve desteklenmeyen video formatı sorunları giderilmiştir.

## Kurulum

1. Bu projeyi bilgisayarınıza indirin (ZIP veya Git Clone).
2. Klasör içindeki **`setup.bat`** dosyasına çift tıklayın.
   * *Bu işlem gerekli kütüphaneleri ve FFmpeg aracını kuracaktır.*

## Kullanım

### Tek Video İndirmek veya Kesmek İçin:
1. **`start.bat`** dosyasını çalıştırın.
2. Linki yapıştırın.
3. Videonun tamamını mı yoksa belirli bir aralığını mı istediğinizi seçin.
4. Formatı (MP4/MP3) seçin ve indirme başlasın.

### Playlist İndirmek İçin:
1. **`playlist_baslat.bat`** dosyasını çalıştırın.
2. Playlist linkini yapıştırın.
3. Hepsini mi yoksa belirli numaraları mı indireceğinizi seçin.
4. Kaliteyi seçin. Dosyalar `Playlistlerim` klasörüne inecektir.

## Gereksinimler

*   Node.js (Kurulu olmalıdır)
*   Windows İşletim Sistemi (Scriptler .bat formatındadır)

## Lisans

Bu proje açık kaynaklıdır ve eğitim amaçlı geliştirilmiştir.