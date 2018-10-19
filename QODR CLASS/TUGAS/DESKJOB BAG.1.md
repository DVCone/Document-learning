-------------------------------------------------------------------------

                        #DEKSJOB INVENTORY QODR#

                    Class   : Backend.
                    Teacher : @AhmadShifa.
                    QODR    : Magelang.
                    target  : Buat Admin Control panel 
                              untuk Inventaris.

                              Bagian  : I

-------------------------------------------------------------------------

#REQUEST :

 1. Buat CRUD untuk table berikut :
    + inv_tr_keluar
    + inv_tr_masuk
    + inv_log

 2. Pada qty pada inv_tr_masuk ataupun inv_tr_keluar akan berpengaruh 
    di qty pada inv_barang.
    + Apabila inv_tr_masuk maka akan menambah qty di inv_barang
    + Apabila inv_tr_keluar maka akan mengurang qty di inv_barang

 3. Seluruh inputan baik dari inv_tr_masuk ataupun inv_tr_keluar
    hanya bisa dilakukan oleh user yang login.

 4. Pada pemilihan nama barang di inv_tr_masuk ataupun inv_tr_keluar
    menggunakan multiple select yang diambil dari table inv_barang.

-------------------------------------------------------------------------

1. inv_tr_masuk

Setelah semua dipecah dan disesuaikan dengan module masing - masing 
maka akan ditampilkan pada DataTable.

- READ 

pada seluruh transaksi yang akan ditampilkan dari dataTable diambil dari
VIEW database dari inv_barang dan inv_tr_masuk.

# javascript
```markdown
var datamasuk = $('#datamasuk').DataTable({
    "ajax": "<?=BASE_URL?>api.php?datamasuk=true",
    columnDefs: [{
        "targets": 0,
        "data": null,
        "mRender": function(data, type, row) {
            return row.id
        },
    }, {
        "targets": 1,
        "data": null,
        "mRender": function(data, type, row) {
            return row.nama_barang
        },
    }, {
        "targets": 2,
        "data": null,
        "mRender": function(data, type, row) {
            return row.nama_user
        },
    }, {
        "targets": 3,
        "data": null,
        "mRender": function(data, type, row) {
            return row.qty
        },
    }, {
        "targets": 4,
        "data": null,
        "mRender": function(data, type, row) {
            return row.tanggal
        },
    }, {
        "targets": 5,
        "data": null,
        "mRender": function(data, type, row) {
            return row.detail
        },
    }, {
        "targets": 6,
        "data": null,
        "mRender": function(data, type, row) {
            return `<button onclick="return setUpdate(this)">Edit</button>
                  <button onclick="return setDelete(this)" >Delete</button>`
        },
    }],
    "pageLength": 5
});
```
#Php&Sql
```markdown
    else if(!empty($_GET['datamasuk']))
    {
	    dataMasuk($db);
    }

    function dataMasuk($db)
{
	$result = $db->query("SELECT * FROM v_tr_masuk");
	$res = array();

	while ($resMasuk = $result->fetch_object()) {
		$res[] = $resMasuk;
	}

	echo json_encode(
		array(
			"data" => $res
		)
	);
}
```

- CREATE
Hal pertama adalah membuat button yang ditambahkan 
(onclick="return addData(this)") akan menampilkan modal form 
untuk menambahkan data yang baru, dan data yang akan dimasukkan kedalam 
table inv_tr_masuk saja.

#javascript
```markdown
function addData() {
    var form = $('#formMasuk');
    var id_barang = form.find('input[name=id_barang]');
    var qty = form.find('input[name=qty]');
    var tanggal = form.find('input[name=tanggal]');
    var detail = form.find('input[name=detail]');
    var data = form.serialize();

    
    $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'addbarangmasuk=true&'+data,
        dataType: "json",
        complete:function(data, res) {
            
            console.log(data)

            if (res == 'success') {
                if (data.responseText == 'null') {
                    show_notify('Kesalahan!', 'Terjadi kesalahan ketika menambah data.');
                } else {
                    show_notify('Berhasil!', 'Data berhasil ditambah!');
                    setTimeout(function() {
                        datamasuk.ajax.reload(null, false)
                    }, 1000);
                }
            } else if(res == 'error') {
                show_notify('Error!', 'Mohon periksa sambungan koneksi anda.')
            }

            $('#inputBarangModal').modal('hide');
        }
    });
}
```

#Php&Sql
```markdown
else if(!empty($_POST['addbarangmasuk']))
{
	addMasuk($db);
}

function addMasuk($db)
{
    $id_barang = $_POST['id_barang'];
    $id_user = $_SESSION['user']->id;
    $qty = $_POST['qty'];
    $tanggal = $_POST['tanggal'];
    $detail = $_POST['detail'];

    $query = "INSERT INTO inv_tr_masuk (`id_barang`,
    `id_user`,
    `qty`,
    `tanggal`,
    `detail`) 
    VALUES (?,?,?,?,?)";

    $stmt = $db->prepare($query);
    $stmt->bind_param("iiiss",$id_barang,$id_user,$qty,$tanggal,$detail);
    
    if ($stmt->execute()) {
        echo json_encode(
            array(
                "success"=>true
            )
        );
    }
}
```

- DELETE

Jika akan menghapus data maka akan membutuhkan id dari setiap row
oleh karenanya kita akan menyertakan pada JS yang diambil dari 
READ yang telah kita buat. data tersebut akan dihapus dari table 
inv_tr_masuk.

#javascript
```markdown

 <button onclick="return setDelete(this)" >

function setDelete(elm) {
    $('#dataModal').modal('show');
    var tr = $(elm).parent().parent('tr');
    var data = datamasuk.row(tr).data();
    $('#deleteData').attr('onclick','return deleteData('+data.id+')');
}

function deleteData(id){
    $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'deletemasuk=true&id='+id,
        datatype: "json",
        complete:function(data, res) {

            console.log(data)

            if (res == 'success') {
                if (data.responseText == "null") {
                    show_notify('kesalahan!', 'Terjadi kesalahan ketika menghapus data');
                } else {
                    show_notify('Berhasil!', 'Data berhasil dihapus!');
                    setTimeout(function () {
                        datamasuk.ajax.reload(null, false)
                    }, 1000);
                }
            }else if (res == 'error') {
                show_notify('Error', 'Mohon periksa sambungan koneksi anda.')
            }

            $('#dataModal').modal('hide');
        }
    });
}
```

#Php&Sql
```markdown
else if(!empty($_POST['deletemasuk']))
{
	deleteMasuk($db);
}

function deleteMasuk($db)
{
    $id = $_POST['id'];
    $result = $db->query("DELETE FROM inv_tr_masuk WHERE id = '$id'");

    if ($result) {
        echo json_encode(
            array(
                "success"=>true
            )
        );
    }
}
```

- UPDATE

Kalau pada update maka menggunakan id dari setiap ROW serta data 
yang akan ditambahkan.

#javascript
```markdown
`<button onclick="return setUpdate(this)">

function setUpdate(elm){
        $('#updateBarangModal').modal('show');
        var tr = $(elm).parent().parent('tr');
        var data = datamasuk.row(tr).data();
        $('#updateData').attr('onclick','return editData('+data.id+')');
        var form = $('#formEditMasuk');
        form.find('input[name=id_barang]').val(data.id_barang);
        form.find('input[name=qty]').val(data.qty);
        form.find('input[name=tanggal]').val(data.tanggal);
        form.find('input[name=detail]').val(data.detail);
}

function editData(id) {
    var form = $('#formEditMasuk');
    var id_barang = form.find('input[name=id_barang]');
    var qty = form.find('input[name=qty]');
    var tanggal = form.find('input[name=tanggal]');
    var detail = form.find('input[name=detail]');
    var data = form.serialize();

    
    $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'updatebarangmasuk=true&id='+id+'&'+data,
        dataType: "json",
        complete:function(data, res) {
            
            console.log(data)

            if (res == 'success') {
                if (data.responseText == 'null') {
                    show_notify('Kesalahan!', 'Terjadi kesalahan ketika merubah data.');
                } else {
                    show_notify('Berhasil!', 'Data berhasil dirubah!');
                    setTimeout(function() {
                        datamasuk.ajax.reload(null, false)
                    }, 1000);
                }
            } else if(res == 'error') {
                show_notify('Error!', 'Mohon periksa sambungan koneksi anda.');
            }

            $('#updateBarangModal').modal('hide');
        }
    });
}
```

#Php&Sql
```markdown
else if(!empty($_POST['updatebarangmasuk']))
{
	updateMasuk($db);
}

function updateMasuk($db)
{
    $id = $_POST['id'];
    $id_barang = $_POST['id_barang'];
    $id_user = $_SESSION['user']->id;
    $qty = $_POST['qty'];
    $tanggal = $_POST['tanggal'];
    $detail = $_POST['detail'];

    $query = "UPDATE inv_tr_masuk 
    SET id_barang = ?, 
    id_user = ?,
    qty = ?,
    tanggal = ?,
    detail = ?
    WHERE id = ?";

    $stmt = $db->prepare($query);
    $stmt->bind_param("iiissi",$id_barang,$id_user,$qty,$tanggal,$detail,$id);
    
    if ($stmt->execute()) {
        echo json_encode(
            array(
                "success"=>true
            )
        );
    }
}
``` 

2. inv_tr_keluar.

Beberapa codingan memiliki kesamaan dengan codingan inv_tr_masuk 
diantaranya :

- READ
- DELETE 
- CREATE
- UPDATE

yang berbeda hanya pada penamaan dan logika bind_param() yaitu :

# CREATE
```markdown
$query = "INSERT INTO inv_tr_keluar (`id_barang`,
    `id_user`,
    `qty`,
    `tanggal`,
    `detail`)
    VALUES (?,?,?,?,?)";

    $stmt = $db->prepare($query);
    $stmt->bind_param("iiiss",$id_barang,$id_user,$qty,$tanggal,$detail);
```

# UPDATE
```markdown
$query = "UPDATE inv_tr_keluar 
    SET id_barang = ?, 
    id_user = ?,
    qty = ?,
    tanggal = ?,
    detail = ?
    WHERE id = ?";

    $stmt = $db->prepare($query);
    $stmt->bind_param("iiissi",$id_barang,$id_user,$qty,$tanggal,$detail,$id);
```

3.  inv_log 
Tidak ada CREATE ataupun UPDATE, karena table ini akan diisi dengan 
seluruh aktifitas transaksi dari inv_tr_masuk dan inv_tr_keluar.

Saya membuat dua fungsi DELETE :
1. Hanya menghapus 1 ROW berdasarkan ID ROW
2. Menghapus seluruh table inv_log dengan me-RESET table tersebut 
   menggunakan TRUNCATE.
   
- DELETE
#javascript
```markdown
<button onclick="return setDelete(this)">

function setDelete(elm) {
        $('#dataModal').modal('show');
        var tr = $(elm).parent().parent('tr');
        var data = datalog.row(tr).data();
        $('#deleteData').attr('onclick','return deleteData('+data.id+')');
}

function deleteData(id) {
        $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'deletelog=true&id='+id,
        datatype: "json",
        complete:function(data, res) {

            console.log(data)

            if (res == 'success') {
                if (data.responseText == "null") {
                    show_notify('kesalahan!', 'Terjadi kesalahan ketika menghapus data');
                } else {
                    show_notify('Berhasil!', 'Data berhasil dihapus!');
                    setTimeout(function () {
                        datalog.ajax.reload(null, false)
                    }, 1000);
                }
            }else if (res == 'error') {
                show_notify('Error', 'Mohon periksa sambungan koneksi anda.')
            }

            $('#dataModal').modal('hide');
        }
    });
}
```
#Php&Sql
```markdown
else if(!empty($_POST['deletelog']))
{
	deleteLog($db);
}

function deleteLog($db)
{
    $id = $_POST['id'];
    $result = $db->query("DELETE FROM inv_log WHERE id = '$id'");

    if ($result) {
        echo json_encode(
            array(
                "success"=>true
            )
        );
    }
}
```
- RESET
#javascript
```markdown
<button onclick="return resetlog(this)">

    function resetlog() {
        $.ajax({
        url: '<?=BASE_URL?>api.php',
        method: 'POST',
        data: 'resetlog',
        datatype: "json",
        complete:function(data, res) {

            console.log(data)

            if (res == 'success') {
                if (data.responseText == "null") {
                    show_notify('kesalahan!', 'Terjadi kesalahan ketika menghapus data');
                } else {
                    show_notify('Berhasil!', 'Data berhasil dihapus!');
                    setTimeout(function () {
                        datalog.ajax.reload(null, false)
                    }, 1000);
                }
            }else if (res == 'error') {
                show_notify('Error', 'Mohon periksa sambungan koneksi anda.')
            }

            $('#dataModal').modal('hide');
        }
    });
    }
```
#Php&Sql
```markdown
else if(!empty($_POST['resetlog']))
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

Catatan :
1. untuk pengisian id user diambil dari akun yang sedang masuk (login)
dengan menggabilkan SessionUsernya dari php.

```markdown
        $id_user = $_SESSION['user']->id;
```
-------------------------------------------------------------------------