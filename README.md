# Suspect Expander
Author: Faris Rizki Ekananda (13518125) IF '18  
Dalam rangka memenuhi Seleksi Labpro 2020 Tahap 2  

![Overview](asset/overview.gif)  
GIF 1. Aplikasi Suspect Expander

Suspect Expander adalah aplikasi pencarian yang memanfaatkan [API yang disediakan](https://avatar.labpro.dev/) untuk melakukan pencarian (ID, Nama, ataupun elemen) yang menghasilkan output berupa graf yang dapat diluaskan/ditelusuri lebih lanjut.

# Instalasi
Clone repositori ini terlebih dahulu
```
git clone https://github.com/darkGrimoire/labpro-atlasearcher.git

```
Lalu pergi ke direktori repositori yang telah di-*clone*. Buka command line Anda lalu ketikkan perintah berikut. **Pastikan Anda telah meng-*install* Node.js terlebih dahulu.** [Node.js dapat diunduh disini.](https://nodejs.org/en/download/)
```
cd app
npm install
npm start
```
Browser Anda akan otomatis terbuka untuk menjalankan software dalam development mode. Lokasi aplikasi dijalankan adalah https://localhost:3000/.

# Penggunaan
Masukkan kata kunci pencarian ke dalam Text Field yang telah disediakan (Search me!). Anda dapat melakukan pencarian berupa **ID** (angka), **element** (air/water/earth/fire), ataupun **nama**. Hasil pencarian akan langsung muncul. Anda dapat menempatkan kursor di hasil pencarian untuk melihat informasi lengkap dari simpul graf yang dihasilkan, atau meng-klik simpul graf untuk menelusurinya lebih lanjut. Seluruh simpul yang telah terpilih akan memiliki highlight berwarna hijau muda. Apabila pencarian menghasilkan banyak data, simpul yang akan diperlihatkan pertama kali adalah hasil pencarian pertama.

![Usage_NameSearch](asset/usage_name.gif)  
GIF 2. Pencarian Nama  

![Usage_IDSearch](asset/usage_id.gif)  
GIF 3. Pencarian ID  

![Usage_ElementSearch](asset/usage_element.gif)  
GIF 4. Pencarian Elemen  

![Usage_ExpandSearch](asset/usage_expand.gif)  
GIF 5. Menelusuri hasil pencarian  

# Requirements
- [react](https://create-react-app.dev/) (bawaan create-react-app)
- [react-dom](https://create-react-app.dev/) (bawaan create-react-app)
- [react-lineto](https://create-react-app.dev/) (bawaan create-react-app)
- [react-scripts](https://create-react-app.dev/) (bawaan create-react-app)
- [@material-ui/core](material-ui.com/)  (UI yang digunakan)
- [fontsource-roboto](https://material-ui.com/components/typography/#general) (Font yang digunakan material-ui)  
- [axios](https://github.com/axios/axios) (HTTP Request Library, untuk meminta data dari API)  
- [lodash](https://lodash.com/) (Library yang digunakan untuk membuat pencarian dilakukan setelah pengguna selesai mengetik)

# Library Reviews
- [create-react-app](https://create-react-app.dev/) merupakan library yang sangat bagus dalam memulai pemrograman menggunakan ReactJS bagi baik pengguna pemula maupun mahir. Deploymentnya juga sangat mudah karena sudah terdapat [Buildpack Heroku](https://github.com/mars/create-react-app-buildpack).
- [@material-ui/core](material-ui.com/) atau Material UI adalah library front-end yang menawarkan tampilan UI dengan desain material yang performan dan modern. Material UI juga memiliki fungsi-fungsi yang mempermudah pemrograman front-end seperti Controlled Components, Grid Layouting, dan lainnya.
- [axios](https://github.com/axios/axios) adalah library request berbasis promise yang mempermudah pembuatan request terhadap API.
- [lodash](https://lodash.com/) adalah library luas yang memiliki banyak tools-tools untuk meningkatkan performansi dan mempermudah pemrograman javascript, namun pada kali ini kita hanya menggunakan fungsi debounce yang memungkinkan pencarian dapat dilakukan setelah pengguna selesai mengetik (bukan setiap pengguna mengetikkan satu karakter) sehingga meningkatkan performansi pencarian.

# FAQ/Troubleshooting
#### >>> Pertanyaan: Hasil pencarian menghasilkan `"No matching data found"`  
> Jawaban: Pencarian tidak dapat menemukan kata kunci terkait.

#### >>> Pertanyaan: Hasil pencarian menghasilkan `"SearchList has not been built. Please try typing it again"`  
>Jawaban: Laman belum siap menjalankan fungsi pencarian. Mohon ketikkan ulang kata pencariannya. Error ini hanya terjadi pada pencarian nama dan elemen.

#### >>> Pertanyaan: Hasil pencarian menghasilkan `"Error fetching search list"`  
> Jawaban: Terjadi kesalahan koneksi ketika berkomunikasi dengan API. Mohon periksa koneksi internet Anda, dan coba lagi (refresh) setelah beberapa saat.

#### >>> Pertanyaan: Graf menjadi tidak teratur
> Jawaban: Mohon klik salah satu simpul untuk melakukan render ulang garis graf.
