-------------------------------------------------------------------------

                        #DEKSJOB INVENTORY QODR#

                    Class   : Backend.
                    Teacher : @AhmadShifa.
                    QODR    : Magelang.
                    target  : Buat Admin Control panel 
                              untuk Inventaris.

                              Bagian  : III

-------------------------------------------------------------------------

##REQUEST :
1. Multiple Select nama barang 
2. Validasi transaksi agar tidak minus ( - ) 
3. Search log by tanggal 
4. view tanggal log dengan tanggal default (masih view seluruh data) 
5. log activity user (saya buat table DB baru)
6. CSS Button 
7. Field (qty) edit barang di dissable 
8. log transaction barang 
9. Reset log 
-------------------------------------------------------------------------

##Reset Log

Pada table log merupakan table untuk mencatat dan memantau seluruh 
aktivitas barang mulai dari masuk hingga keluarnya barang.
oleh karenanya tidak dtambahkan fungsi creat dan edit, hanya fungsi 
delete dan reset yang akan digunakan.

untuk membuat fungsi reset mirip dengan membuat funsi delete tetapi 
ada sedikit perbedaan.

1. javascript
```markdown

<button id="resetData" type="button" class="btn btn-danger">RESET</button>

    $('#resetData').on('click', function() {
        resetlog();
    })

    function resetlog() {
        $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'resetlog',
        dataType: "json",
        success:function(res) {

            console.log(res)
                if (res == "null") {
                    show_notify('kesalahan!', 'Terjadi kesalahan ketika menghapus data');
                } else {
                    show_notify('Berhasil!', 'Data berhasil dihapus!');
                    setTimeout(function () {
                        datalog.ajax.reload(null, false)
                    }, 1000);
                }

             if (res == 'error') {
                show_notify('Error', 'Mohon periksa sambungan koneksi anda.')
            }

            $('#dataModal').modal('hide');
        }
    });
    }
```

2. Php&Sql
```markdown

else if(empty($_POST['resetlog']))
{
	resetLog($db);
}

function resetLog($db)
{
    $result = $db->query("TRUNCATE TABLE inv_log");
    if ($result) {
        echo json_encode(
            array(
            "success"=>true
            )
        ) ;
    }
}
```
karena kita akan mengkosongkan tablenya maka yang sebelumnya tidak boleh
kosong (!empty) dirubah menjadi (empty).

##Log transaksi barang 

Pada bagian ini telah saya jabarkan di DEKSJOB bagian ke II
dapat dilihat kembali pada link berikut :
[Bagian I](https://github.com/DVCone/Document-learning/blob/master/QODR%20CLASS/TUGAS/DESKJOB%20BAG.1.md)
[Bagian II ](https://github.com/DVCone/Document-learning/blob/master/QODR%20CLASS/TUGAS/DESKJOB%20BAG.2.md)

##Multiple Select

untuk insert maupun edit data pemasukan atau pengeluaran field nama barang
saya masih menggunakan tag input type="number", ini akan dirubah dengan 
Multiple select.

1. Html
```markdown
<div class="form-group has-feedback">
    
    //cara lama
    <input type="number" name="id_barang" class="form-control" placeholder="Nama barang"> 

    //multiple select 
    <select name="states[]" size="5" multiple>
        <option value="2">state 1</option>
        <option value="3">state 2</option>
        <option value="4">state 3</option>
        <option value="5">state 4</option>
        <option value="6">state 5</option>
    </select>
</div>
```

2. php
```markdown
<?
    foreach($_POST['states'] as $state) {
        $data = mysql_query("SELECT * from inv_barang WHERE nama = '$state'",$db);
        $row = mysql_fetch_array($data);
        echo $row['description'];
    } 
?>
```

multiple selectnya masih gagal, data nama barang dari table 
inv_barang belum masuk kedalam option valuenya.

##log Activity User 

saya membedakan table log untuk keluar masuk barang dan login logout user.
jadi saya buat table baru untuk log user.

```markdown
CREATE TABLE `inv_qodr`.`inv_logUser` 

( `id` INT NOT NULL AUTO_INCREMENT ,  
`id_user` VARCHAR(50) NOT NULL ,  
`tanggal` DATETIME NOT NULL ,  
`keterangan` VARCHAR(50) NOT NULL ,   
 PRIMARY KEY  (`id`))
 ENGINE = InnoDB;

```

❌GO AWAY !!! Under construction❌

Loading page . . .

-------------------------------------------------------------------------
