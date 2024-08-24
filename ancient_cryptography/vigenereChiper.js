// Import readline module
const readline = require('readline');

// Buat interface untuk input dan output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk enkripsi
function encrypt(plaintext, key) {
  let ciphertext = '';
  let keyIndex = 0;
  key = key.toUpperCase();

  for (let i = 0; i < plaintext.length; i++) {
    let c = plaintext[i];
    if (isLetter(c)) {
      let isLowerCase = c === c.toLowerCase();
      c = c.toUpperCase();
      let charCode = c.charCodeAt(0) - 65;
      let keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;
      let encryptedCharCode = (charCode + keyCode) % 26;
      let encryptedChar = String.fromCharCode(encryptedCharCode + 65);
      ciphertext += isLowerCase ? encryptedChar.toLowerCase() : encryptedChar;
      keyIndex++;
    } else {
      ciphertext += c;
    }
  }
  return ciphertext;
}

// Fungsi untuk dekripsi
function decrypt(ciphertext, key) {
  let plaintext = '';
  let keyIndex = 0;
  key = key.toUpperCase();

  for (let i = 0; i < ciphertext.length; i++) {
    let c = ciphertext[i];
    if (isLetter(c)) {
      let isLowerCase = c === c.toLowerCase();
      c = c.toUpperCase();
      let charCode = c.charCodeAt(0) - 65;
      let keyCode = key[keyIndex % key.length].charCodeAt(0) - 65;
      let decryptedCharCode = (charCode - keyCode + 26) % 26;
      let decryptedChar = String.fromCharCode(decryptedCharCode + 65);
      plaintext += isLowerCase ? decryptedChar.toLowerCase() : decryptedChar;
      keyIndex++;
    } else {
      plaintext += c;
    }
  }
  return plaintext;
}

// Fungsi pembantu untuk memeriksa apakah karakter adalah huruf
function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
}

// Fungsi utama untuk menjalankan program
function main() {
  rl.question('Menu:\n1. Enkripsi\n2. Dekripsi\n3. Exit\nPilih menu: ', function (choice) {
    switch (choice) {
      case '1':
        rl.question('Masukkan teks asli: ', function (plaintext) {
          rl.question('Masukkan kunci: ', function (key) {
            let encryptedText = encrypt(plaintext, key);
            console.log('Hasil enkripsi:', encryptedText);
            rl.close(); // Tutup interface setelah selesai
          });
        });
        break;

      case '2':
        rl.question('Masukkan teks terenkripsi: ', function (ciphertext) {
          rl.question('Masukkan kunci: ', function (key) {
            let decryptedText = decrypt(ciphertext, key);
            console.log('Hasil dekripsi:', decryptedText);
            rl.close(); // Tutup interface setelah selesai
          });
        });
        break;

      case '3':
        rl.close(); // Tutup interface dan keluar
        break;

      default:
        console.log('Pilihan tidak valid.');
        rl.close(); // Tutup interface setelah selesai
        break;
    }
  });
}

// Jalankan program
main();
