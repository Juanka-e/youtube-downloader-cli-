@echo off
echo Kurulum ve Guncelleme Baslatiliyor...

echo.
echo --- yt-dlp Guncelleniyor ---
pip install -U yt-dlp

echo.
echo --- FFmpeg Yukleniyor (Winget ile) ---
echo Lutfen onay pencereleri acilirsa onaylayin.
winget install --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements

echo.
echo Islem tamamlandi. Pencereyi kapatabilirsiniz.
pause