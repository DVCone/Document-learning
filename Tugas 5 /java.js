
// soal 1 -menampilkan pop up
function pesan() {
	window.alert('Tugas 4 - JavaScript Dasar');
}

// soal 2 -menampilkan di console log
var v = 1000;
var x = 30;
var y = 6;
var z = 4;
var aa = 2;

var no2 = (v+x-y)*z/aa;

function jumlah(x, y, z) {    
   	console.log(no2);
}

// soal3 -membuat string panjang
var nama = 'dvcone';
var alamat = 'sana';

var no3 = "ini profil mas " + nama + " tinggal di " + alamat;

function biodate(){
	console.log (no3);
}

// soal 4 -membuat rumus lingkaran
var p = Math.PI;

function lingkaran(r) {
	var no4 = (p*(r*2));

	return (no4);
}

// soal 5 -memanipulasi object
var laptop = {
	type: "gamer",
	model: "none", 
	warna: "putih", 
	merk: "hp", 
	tahun: "2222"
	};

var no5 = laptop.merk;

function object() {
		console.log(no5);
	}

// soal 6 -memanipulasi string
var qord   = "Quality Muslim Coder";
var ganti  = qord.replace("Muslim", "Muslimah");
var ambil  = ganti.slice(8,22);

var no6 = ambil.concat(" ", "ngimpi").toUpperCase();

function ejakata() {
	return (no6);
}

 // soal 7 -mengkonversi number ke string
var isi = no2;

var no7 = isi.toString();

function conversi() {
	console.log(no7);
}

// soal 8 -membuat jam versi indonesia
var inti = new Date();

var no8 = inti.getDate() + "/" + Number(inti.getMonth() + 1) + "/" + inti.getFullYear() + " " + inti.getHours() + ":" + inti.getMinutes();


// soal 9 -memaniulasi array
var sayur, text;
 	sayur = ["jipan", "sawi", "kol"],
	sayur [0] = "tauge";
	text += sayur;
var hapus = sayur.pop();
var ubah = sayur [1] = "buncis";

var no9 = "sayurnya ada 2 :" + sayur.sort();
		
function ayurmayur() {
	console.log(no9);
}

// soal 10 -boolean
var no10 = no2 < 100;

function coba() { 	 
 	console.log(no10);
}

// soal 11
document.getElementById("qwe").innerHTML =lingkaran(10); 
document.getElementById("demo").innerHTML = ejakata(); 
document.getElementById("asd").innerHTML = no8; 
document.getElementById("lmn").innerHTML = 
"no 1" +" " +typeof function pesan(){} +
"<br> no 2" +" "+ typeof no2 +
"<br> no 3" +" " + typeof no3+
"<br> no 4" +" " + typeof lingkaran(10)+
"<br> no 5" +" " + typeof no5+
"<br> no 6" +" " + typeof no6+
"<br> no 7" +" " + typeof no7+
"<br> no 8" +" " + typeof no8+
"<br> no 9" +" " + typeof no9+
"<br> no 10" +" " + typeof no10; 

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// 
// ..................................................ALHAMDULILLAH SELESAI...................................................................................
// 
// -----------------------------------------------------------------------------------------------------------------------------------------------------
