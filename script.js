class Kalkulator {
  constructor(teksOperasiSebelumnya, teksOperasiSekarang) {
    this.teksOperasiSebelumnya = teksOperasiSebelumnya;
    this.teksOperasiSekarang = teksOperasiSekarang;
    this.hapusSemua();
  }
  hapusSemua() {
    this.operasiSekarang = "";
    this.operasiSebelumnya = "";
    this.operasi = undefined;
  }
  hapus() {
    this.operasiSekarang = this.operasiSekarang.toString().slice(0, -1);
  }
  tambahkanNomor(nomor) {
    if (nomor === "." && this.operasiSekarang.includes(".")) return;
    this.operasiSekarang = this.operasiSekarang.toString() + nomor.toString();
  }
  pilihOperasi(operasi) {
    if (this.operasiSekarang === "") return;
    if (this.operasiSebelumnya !== "") {
      this.hitung();
    }
    this.operasi = operasi;
    this.operasiSebelumnya = this.operasiSekarang;
    this.operasiSekarang = "";
  }
  hitung() {
    let hasil;
    const nilaiSebelumnya = parseFloat(this.operasiSebelumnya);
    const nilaiSekarang = parseFloat(this.operasiSekarang);
    // Kalau nilai sebelumnya kosong atau nilai sekarang juga kosong maka stop perhitungannya
    if (isNaN(nilaiSebelumnya) || isNaN(nilaiSekarang)) return;
    switch (this.operasi) {
      case "+":
        hasil = nilaiSebelumnya + nilaiSekarang;
        break;
      case "- ":
        hasil = nilaiSebelumnya - nilaiSekarang;
        break;
      case "*":
        hasil = nilaiSebelumnya * nilaiSekarang;
        break;
      case "÷":
        hasil = nilaiSebelumnya / nilaiSekarang;
        break;
      default:
        return;
    }
    this.operasiSekarang = hasil;
    this.operasi = undefined;
    this.operasiSebelumnya = "";
  }

  getDisplayNumber(nomor) {
    const stringNumber = nomor.toString();
    const intDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let intDisplay;
    if (isNaN(intDigit)) {
      intDisplay = "";
    } else {
      intDisplay = intDigit.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigit != null) {
      return `${intDisplay}.${decimalDigit}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    this.teksOperasiSekarang.innerHTML = this.getDisplayNumber(
      this.operasiSekarang
    );
    if (this.operasi != null) {
      this.teksOperasiSebelumnya.innerHTML = `${this.getDisplayNumber(
        this.operasiSebelumnya
      )} ${this.operasi}`;
    } else {
      this.teksOperasiSebelumnya.innerText = "";
    }
  }
}

const tombolNomor = document.querySelectorAll("[data-nomor]");
const tombolOperasi = document.querySelectorAll("[data-operasi]");
const tombolHasil = document.querySelector("[data-hasil]");
const tombolHapus = document.querySelector("[data-hapus]");
const tombolHapusSemua = document.querySelector("[data-hapus-semua]");
const teksOperasiSebelumnya = document.querySelector(
  "[data-operasi-sebelumnya]"
);
const teksOperasiSekarang = document.querySelector("[data-operasi-sekarang]");

const kalkulator = new Kalkulator(teksOperasiSebelumnya, teksOperasiSekarang);

tombolNomor.forEach((nomor) => {
  nomor.addEventListener("click", () => {
    console.log(nomor);
    kalkulator.tambahkanNomor(nomor.innerText);
    kalkulator.updateDisplay();
  });
});

tombolOperasi.forEach((nomor) => {
  nomor.addEventListener("click", () => {
    console.log(nomor);
    kalkulator.pilihOperasi(nomor.innerText);
    kalkulator.updateDisplay();
  });
});

tombolHasil.addEventListener("click", (tombol) => {
  kalkulator.hitung();
  kalkulator.updateDisplay();
});

tombolHapusSemua.addEventListener("click", (tombol) => {
  kalkulator.hapusSemua();
  kalkulator.updateDisplay();
});

tombolHapus.addEventListener("click", (tombol) => {
  kalkulator.hapus();
  kalkulator.updateDisplay();
});
