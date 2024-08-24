const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Mengenkripsi teks menggunakan metode Caesar Cipher.
 * @param {string} plainteks - Teks yang akan dienkripsi.
 * @param {number} shift - Jumlah pergeseran (0-25).
 * @returns {string} Teks terenkripsi.
 */
function enkripsi(plainteks, shift) {
  return plainteks
    .split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const kode = char.toUpperCase().charCodeAt(0);
        const enkripsiKode = ((kode - 65 + shift) % 26) + 65;
        return String.fromCharCode(enkripsiKode);
      }
      return char;
    })
    .join('');
}

/**
 * Mendekripsi teks yang dienkripsi menggunakan metode Caesar Cipher.
 * @param {string} cipherteks - Teks terenkripsi yang akan didekripsi.
 * @param {number} shift - Jumlah pergeseran (0-25).
 * @returns {string} Teks asli (plainteks).
 */
function dekripsi(cipherteks, shift) {
  return enkripsi(cipherteks, 26 - shift);
}

function tampilkanMenu() {
  console.log('\nMenu:');
  console.log('1. Enkripsi');
  console.log('2. Dekripsi');
  console.log('3. Brute Force Dekripsi');
  console.log('4. Kembali');
  console.log('5. Exit');

  rl.question('Pilih menu: ', (pilihan) => {
    switch (pilihan) {
      case '1':
        prosesEnkripsi();
        break;
      case '2':
        prosesDekripsi();
      case '3':
        bruteForceDekripsi();
        break;
      case '4':
        tampilkanMenu();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Pilihan tidak valid. Silakan coba lagi.');
        tampilkanMenu();
    }
  });
}

function prosesEnkripsi() {
  rl.question('Ketikkan pesan: ', (plainteks) => {
    rl.question('Masukkan jumlah pergeseran (0-25): ', (shift) => {
      shift = parseInt(shift);
      if (isNaN(shift) || shift < 0 || shift > 25) {
        console.log('Jumlah pergeseran tidak valid. Gunakan angka 0-25.');
        return tampilkanMenu();
      }
      const cipherteks = enkripsi(plainteks, shift);
      console.log('Hasil enkripsi: ' + cipherteks);
      tampilkanMenu();
    });
  });
}

function prosesDekripsi() {
  rl.question('Ketikkan pesan terenkripsi: ', (cipherteks) => {
    rl.question('Masukkan jumlah pergeseran (0-25): ', (shift) => {
      shift = parseInt(shift);
      if (isNaN(shift) || shift < 0 || shift > 25) {
        console.log('Jumlah pergeseran tidak valid. Gunakan angka 0-25.');
        return tampilkanMenu();
      }
      const plainteks = dekripsi(cipherteks, shift);
      console.log('Hasil dekripsi: ' + plainteks);
      tampilkanMenu();
    });
  });
}

function bruteForceDekripsi() {
  rl.question('Ketikkan pesan terenkripsi: ', (cipherteks) => {
    console.log('Kemungkinan hasil dekripsi:');
    for (let shift = 0; shift < 26; shift++) {
      const plainteks = dekripsi(cipherteks, shift);
      console.log(`Shift ${shift}: ${plainteks}`);
    }
    console.log('\nPilih hasil yang paling masuk akal.');
    tampilkanMenu();
  });
}

tampilkanMenu();
