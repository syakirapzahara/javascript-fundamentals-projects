let budget = 100000;
let totalKeluar = 0;
let jumlahTrx = 0;

let totalEl = document.getElementById("total");
let sisaEl = document.getElementById("sisa");
let daftarEl = document.getElementById("daftar");
let ketInput = document.getElementById("ket");
let hargaInput = document.getElementById("harga");
let jumlahEl = document.getElementById("jumlah");
let tanggalEl = document.getElementById("tanggal");

// fungsi helper utk  convert angka ke format rp
function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// display tanggal hari ini
let hariIni = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
tanggalEl.textContent = "(" + hariIni + ")";

function catat() {
  let ket = ketInput.value;
  let harga = Number(hargaInput.value);

  if (ket == "" || harga <= 0) {
    alert("Isi dulu apa yang dibeli dan harganya!");
    return;
  }

  totalKeluar = totalKeluar + harga;
  jumlahTrx = jumlahTrx + 1;

  totalEl.textContent = rupiah(totalKeluar);

  let sisa = budget - totalKeluar;
  sisaEl.textContent = rupiah(sisa);
  jumlahEl.textContent = jumlahTrx;

  // warning warna kalau sisa tipis / over
  if (sisa < 0) {
    sisaEl.style.color = "red";
  } else if (sisa < 20000) {
    sisaEl.style.color = "orange";
  } else {
    sisaEl.style.color = "black";
  }

  // tambah ke history
  daftarEl.textContent =
    daftarEl.textContent + ket + " - " + rupiah(harga) + " | ";

  ketInput.value = "";
  hargaInput.value = "";
}

function resetHari() {
  let yakin = confirm("Reset semua catatan hari ini?");

  if (yakin == false) {
    return;
  }

  totalKeluar = 0;
  jumlahTrx = 0;

  totalEl.textContent = rupiah(0);
  sisaEl.textContent = rupiah(budget);
  sisaEl.style.color = "black";
  jumlahEl.textContent = 0;
  daftarEl.textContent = "";
  ketInput.value = "";
  hargaInput.value = "";
}
