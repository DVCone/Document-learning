-------------------------------------------------------------------------

                        #DEKSJOB INVENTORY QODR#

                    Class   : Backend.
                    Teacher : @AhmadShifa.
                    QODR    : Magelang.
                    target  : Buat Admin Control panel 
                              untuk Inventaris.

                              Bagian  : II

-------------------------------------------------------------------------

Pada bagian ini akan di jelaskan bagaimana cara menambahkan jumlah barang
yang ada di table inv_barang dengan jumlah barang yang ada di 
inv_tr_masuksesuai dengan nama barang yang ada di table inv_barang, 
begitu juga sebaliknya cara mengurangkan jumlah barang
yang ada di table inv_barang dengan jumlah barang yang ada di 
inv_tr_keluar sesuai dengan nama barang yang ada di table inv_barang.

yaitu menggunakan TIGGER . . .

# TRIGGER CREATE
```markdown
DEFINER$$
CREATE TRIGGER `barang_masuk` AFTER INSERT ON `inv_tr_masuk`
 FOR EACH ROW BEGIN
INSERT INTO inv_barang SET id = NEW.id_barang, qty = NEW.qty
ON DUPLICATE KEY UPDATE qty=qty+NEW.qty;
END$$
```

# TRIGGER UPDATE
```markdown
DEFINER$$
CREATE TRIGGER `update_masuk` BEFORE UPDATE ON `inv_tr_masuk`
 FOR EACH ROW BEGIN
INSERT INTO inv_barang SET id = NEW.id_barang, qty = NEW.qty
ON DUPLICATE KEY UPDATE qty=qty+NEW.qty;
END$$
```
# TRIGGER LOG
```markdown
DEFINER$$
CREATE TRIGGER `log_masuk` BEFORE INSERT ON `inv_tr_masuk`
 FOR EACH ROW BEGIN
 INSERT INTO inv_log SET
 id_barang = NEW.id_barang, id_user=NEW.id_user,
 qty=New.qty, detail=NEW.detail;
 END$$
```

Catatan :
1. Trigger diatas akan menggabungkannya table inv_tr_masuk dan inv_barang
dan akan menjumlahkan qty (inv_barang) + qty (inv_tr_masuk) = hasilnya
akan dimasukkan di qty (inv_barang).

2. Trigger untuk inv_tr_keluar sama saja, hanya tinggal disesuaikan.

3.  - AFTER INSERT  : Trigger log akan berjalan setelah query insert jalan.
    - BEFORE UPDATE : Trigger log akan bejalan sebelum query update jalan.
    - BEFORE INSERT : Trigger log akan berjalan Sebelum query insert jalan.

Alur :
    (Trigger log -> query insert -> Trigger barang)

Catatan : 
1. Beberapa masalah yang belum solved :
    - button RESET pada inv_log tidak bekerja (kesalahan dalam menulis
      AJAX).
    - TRIGGER pada inv_log dari inv_tr_masuk ataupun inv_tr_keluar,
    field (keterangan) tidak bisa diisi karena tidak ada field
    (keterangan) pada table inv_tr_masuk dan inv_tr_keluar.
    *seharusnya field (keterangan) berisi definisi log pemasukan atau
    log pengeluaran.
-------------------------------------------------------------------------
                    
                        SEKIAN, JAZAKALLAH KHAIRAN

CREATOR.
12/10/18 - 19/10/18.

@DVCone.

-------------------------------------------------------------------------