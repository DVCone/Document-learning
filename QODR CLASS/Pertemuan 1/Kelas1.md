Pertemuan Sabtu 6-10-2018

KESIMPULAN

###Perancangan database dan halaman login

1. Membuat table database beserta view tablenya.
= dalam pembuatan View table ada beberapa hal yang perlu diperhatikan yaitu:

a. Struktur penulisan

Maksud pembuatannya adalah:

```markdown
"Buat View dengan nama {nama_view} dengan isian mengambil dari
{table_data_ygAkan_diAmbil}.{kolom_data_ygAkan_diGunakan} sebagai {nama_kolom_diVIEWnya},
{table_data_ygAkan_diAmbil}.{kolom_data_ygAkan_diGunakan} sebagai {nama_kolom_diVIEWnya},
{table_data_ygAkan_diAmbil}.{kolom_data_ygAkan_diGunakan} sebagai {nama_kolom_diVIEWnya}

dari {table_data_ygAkan_diAmbil}"

```

```markdown
##jika diambil dari satu table

CREATE VIEW {nama_view} AS
SELECT {table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru},
{table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru},
{table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru}

FROM {nama_table};

##jika dari beberapa table yang berbeda


CREATE VIEW {nama_view} AS
SELECT {table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru},
{table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru},
{table_data_ygAkan_diAmbil}.{field_data_ygAkan_diAmbil} AS {nama_field baru}

FROM {nama_table1}

JOIN {nama_table2} ON ({nama_table2}.{field} = {nama_table1}.{field})
JOIN {nama_table2} ON ({nama_table2}.{field} = {nama_table1}.{field});
```
b. Contoh :
Buat ::: VIEW :::

v_tr_keluar
- id -> dari table inv_tr_keluar
- id_barang -> dari table inv_barang
- nama_barang -> dari table inv_barang
- id_user -> dari table inv_user
- nama_user -> dari table inv_user
- qty -> dari table inv_tr_keluar
- tanggal -> dari table inv_tr_keluar
- detail -> dari table inv_tr_keluar

Maka SQLnya adalah sebagai berikut :

```markdown

CREATE VIEW v_tr_keluar AS

SELECT
inv_tr_keluar.id AS id,
inv_tr_keluar.id_barang AS id_barang,
inv_tr_keluar.qty AS qty,
inv_tr_keluar.tanggal AS tanggal,
inv_tr_keluar.detail AS detail,
inv_barang.nama AS nama_barang,
inv_user.name AS nama_user

FROM inv_tr_keluar

JOIN inv_barang ON (inv_barang.id = inv_tr_keluar.id_barang)
JOIN inv_user ON (inv_user.id = inv_tr_keluar.id_user);
```

c. Dalam penulisan koma harus teliti diantaranya:
1. tidak boleh memakai koma sebelum FROM.
2. tidak memakai koma pada ON antara JOIN karena sudah dibatas dengan tutup kurung "()".

2. Sumber :
a. https://www.w3schools.com/sql/sql_view.asp
b. https://www.w3schools.com/sql/sql_join.asp
