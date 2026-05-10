<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License: GPL v3][license-shield]][license-url]
[![F-Droid][fdroid-shield]][fdroid-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/toprakpt1/Focusbudy">
    <img src="assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FocusBuddy</h3>

  <p align="center">
    Gizlilik odaklı, sevimli bir Pomodoro arkadaşı ile odaklanmanı destekleyen açık kaynak uygulama.
    <br />
    <a href="https://github.com/toprakpt1/Focusbudy/issues/new?labels=bug&template=bug-report---.md">Hata Bildir</a>
    &middot;
    <a href="https://github.com/toprakpt1/Focusbudy/issues/new?labels=enhancement&template=feature-request---.md">Özellik Öner</a>
    &middot;
    <a href="README.md">English</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>İçindekiler</summary>
  <ol>
    <li>
      <a href="#hakkında">Hakkında</a>
      <ul>
        <li><a href="#kullanılan-teknolojiler">Kullanılan Teknolojiler</a></li>
      </ul>
    </li>
    <li>
      <a href="#başlangıç">Başlangıç</a>
      <ul>
        <li><a href="#gereksinimler">Gereksinimler</a></li>
        <li><a href="#kurulum">Kurulum</a></li>
      </ul>
    </li>
    <li><a href="#özellikler">Özellikler</a></li>
    <li><a href="#ekran-görüntüleri">Ekran Görüntüleri</a></li>
    <li><a href="#kullanım">Kullanım</a></li>
    <li><a href="#yol-haritası">Yol Haritası</a></li>
    <li><a href="#katkıda-bulunma">Katkıda Bulunma</a></li>
    <li><a href="#lisans">Lisans</a></li>
    <li><a href="#gizlilik">Gizlilik</a></li>
    <li><a href="#iletişim">İletişim</a></li>
    <li><a href="#teşekkürler">Teşekkürler</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Hakkında

FocusBuddy, **gizlilik odaklı ve açık kaynak** bir Android Pomodoro zamanlayıcısıdır. Oyunlaştırılmış, sıcak bir deneyim sunar. Bir hayvan dostu seç, odak seansına başla ve çalışırken yanında seni bekleyen dostunla birlikte odaklan. Seansları tamamlayarak XP kazan, seviye atla, yeni dostlarının kilidini aç ve günlük serini koru.

Bu uygulama, **reklamsız, takipsiz ve aboneliksiz** bir odak aracı arayanlar için tasarlandı.

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



### Kullanılan Teknolojiler

* [![React Native][ReactNative-shield]][ReactNative-url]
* [![Expo][Expo-shield]][Expo-url]
* [![TypeScript][TypeScript-shield]][TypeScript-url]
* [![Zustand][Zustand-shield]][Zustand-url]
* [![i18next][i18next-shield]][i18next-url]

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- GETTING STARTED -->
## Başlangıç

### Gereksinimler

* [Node.js](https://nodejs.org/) (LTS önerilir)
* [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
* [Android Studio](https://developer.android.com/studio) (yerel Android derlemeleri için)
* [Java 17](https://openjdk.org/) veya üstü

### Kurulum

1. Depoyu klonlayın
   ```sh
   git clone https://github.com/toprakpt1/Focusbudy.git
   cd Focusbudy
   ```
2. Bağımlılıkları yükleyin
   ```sh
   npm install
   ```
3. Geliştirme sunucusunu başlatın
   ```sh
   npx expo start
   ```
4. Android için derleyin (F-Droid / yerel APK)
   ```sh
   npx expo prebuild --platform android
   cd android
   ./gradlew assembleRelease
   ```
   İmzasız APK şu konumda olacaktır: `android/app/build/outputs/apk/release/app-release-unsigned.apk`.

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- FEATURES -->
## Özellikler

- **Pomodoro Zamanlayıcı** — Özelleştirilebilir odak & mola süreleri (10 sn test, 25 dk, 45 dk, 60 dk)
- **Hayvan Dostları** — Bir dost seç; seviye atladıkça yenilerinin kilidini aç
- **XP & Seviye Sistemi** — Her tamamlanan seans için XP kazan
- **Günlük Seri** — Düzenli odak seanslarıyla serini koru
- **Odak Haritası** — Zaman içindeki üretkenliğini görselleştir
- **Temalar** — Sıcak pastel, Gece ve Kağıt temaları
- **Bildirimler** — Seans bitiş ve seri hatırlatmaları (isteğe bağlı)
- **Ekran Hep Açık** — Seans sırasında ekran kapanmasını önle
- **Tamamen Çevrimdışı** — İnternet gerektirmez; reklam ve takip yok
- **Çift Dilli** — İngilizce & Türkçe desteği (daha fazla dil katkılarına açık!)

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- SCREENSHOTS -->
## Ekran Görüntüleri



| Ana Sayfa & Zamanlayıcı | Profil & İstatistikler | Mağaza |
|---|---|---|
| ![Ekran Görüntüsü 1][screenshot-1] | ![Ekran Görüntüsü 2][screenshot-2] | ![Ekran Görüntüsü 3][screenshot-3] |

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- USAGE EXAMPLES -->
## Kullanım

1. **Hoş Geldin** — Uygulamayı aç ve ilk dostunu seç.
2. **Seans Başlat** — Ana sayfada "Odağa Başla" butonuna dokun.
3. **Odaklan** — Zamanlayıcı çalışırken dostun seninle kalır.
4. **Tamamla & Kazan** — Seansı bitir, XP kazan ve konfeti gör!
5. **İlerlemeni İzle** — Profil sekmesinden serini, toplam odak süreni ve haritayı gör.
6. **Dostların Kilidini Aç** — Seviye atlayarak Mağaza sekmesinden yeni hayvan dostlarını aç.

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- ROADMAP -->
## Yol Haritası

- [x] Özelleştirilebilir Pomodoro zamanlayıcı
- [x] XP & seviye sistemi
- [x] Günlük seriler
- [x] Dost kilidi açma sistemi
- [x] Odak haritası
- [x] Tema desteği (Sıcak, Gece, Kağıt)
- [x] Bildirimler
- [x] İngilizce & Türkçe yerelleştirme
- [ ] Widget desteği
- [ ] Seans geçmişi & dışa aktarma
- [ ] Daha fazla dost ve ruh hali
- [ ] Wear OS desteği

Tüm önerilen özellikleri (ve bilinen sorunları) görmek için [açık issue'ları](https://github.com/toprakpt1/Focusbudy/issues) inceleyin.

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- CONTRIBUTING -->
## Katkıda Bulunma

Katkılar, açık kaynak topluluğunu öğrenmek, ilham almak ve yaratmak için harika bir yer haline getirir. Yaptığınız tüm katkılar **büyük takdirle karşılanır**.

Bir öneriniz varsa, lütfen depoyu forklayın ve bir pull request oluşturun. "enhancement" etiketiyle bir issue açmak da yeterli.
Projeye yıldız vermeyi unutmayın! Teşekkürler!

1. Projeyi Forklayın
2. Özellik Dalınızı Oluşturun (`git checkout -b feature/HarikaOzellik`)
3. Değişikliklerinizi Commit Edin (`git commit -m 'HarikaOzellik eklendi'`)
4. Dala Push Edin (`git push origin feature/HarikaOzellik`)
5. Bir Pull Request Açın

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- LICENSE -->
## Lisans

GNU Genel Kamu Lisansı v3.0 altında dağıtılmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- PRIVACY -->
## Gizlilik

FocusBuddy, gizlilik ilkeleriyle tasarlandı:

- Temel işlevler için **sıfır ağ izni** gerektirir
- **Analiz, çökme izleyici veya reklam yok**
- Tüm veriler cihazınızda **yerel olarak** saklanır
- Tamamen **çevrimdışı** çalışır

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- CONTACT -->
## İletişim

Toprak Talha Karcılar — [@toprakpt1](https://github.com/toprakpt1)

Proje Bağlantısı: [https://github.com/toprakpt1/Focusbudy](https://github.com/toprakpt1/Focusbudy)

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Teşekkürler

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [i18next](https://www.i18next.com)
- [Lucide Icons](https://lucide.dev)

<p align="right">(<a href="#readme-top">başa dön</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/toprakpt1/Focusbudy.svg?style=for-the-badge
[contributors-url]: https://github.com/toprakpt1/Focusbudy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/toprakpt1/Focusbudy.svg?style=for-the-badge
[forks-url]: https://github.com/toprakpt1/Focusbudy/network/members
[stars-shield]: https://img.shields.io/github/stars/toprakpt1/Focusbudy.svg?style=for-the-badge
[stars-url]: https://github.com/toprakpt1/Focusbudy/stargazers
[issues-shield]: https://img.shields.io/github/issues/toprakpt1/Focusbudy.svg?style=for-the-badge
[issues-url]: https://github.com/toprakpt1/Focusbudy/issues
[license-shield]: https://img.shields.io/github/license/toprakpt1/Focusbudy.svg?style=for-the-badge
[license-url]: https://github.com/toprakpt1/Focusbudy/blob/main/LICENSE
[fdroid-shield]: https://img.shields.io/badge/F--Droid-1976D2?style=for-the-badge&logo=f-droid&logoColor=white
[fdroid-url]: https://f-droid.org/packages/com.focusbuddy.app

[ReactNative-shield]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactNative-url]: https://reactnative.dev/
[Expo-shield]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Zustand-shield]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white
[Zustand-url]: https://github.com/pmndrs/zustand
[i18next-shield]: https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white
[i18next-url]: https://www.i18next.com/
[license-shield]: https://img.shields.io/badge/License-GPLv3-blue.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0

[screenshot-1]: fastlane/metadata/android/tr/images/phoneScreenshots/1.jpg
[screenshot-2]: fastlane/metadata/android/tr/images/phoneScreenshots/2.jpg
[screenshot-3]: fastlane/metadata/android/tr/images/phoneScreenshots/3.jpg
