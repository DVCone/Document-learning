Pertemuan 3 dan 4

### Layouting Dashboard dan validasi JQuery login

1. Pecah halaman Dashboard menjadi beberapa bagian:
a. View > layout
  - header.php
  - navbar.php
  - leftbar.php
  - rightbar.php
  - footer.php

b. View > modules
  - home > home.php
  - 404 > 404.php -> ngambil dari thameplate yang diambil bagian "content-wrapper" saja.

2. pada file config.php tambahin construct untuk manggil file apapun serta buat file 
   helper.php (yang akan berisi fungsi {function} semua) di folder inc.

```markdown
    define('APP_PATH',dirname(__FILE__)."/..");

    tambahkan di View > index.php 

    require_once(dirname(__FILE__)."/inc/helper.php");
```

3. agar memanggil setiap file layout yang berada di folder layout maka tambahkan code berikut di helper.php.
```markdown
    if (!function_exists('layout')) {
        function layout($layout)
        {
         include_once APP_PATH.'/view/layout/'.$layout.'.php';
        }
    }
```
4. setelah mendapat bantuan memanggil file layout dari helper kita bisa memanggil file yang dipecah2 
   tadi menjadi 1 disatu file dengan urutan code pemanggilan sebagai berikut :
```markdown
 <?php layout('header') ?>
 <?php layout('navbar') ?>
 <?php layout('leftbar') ?>
 <?php layout('rightbar') ?>
 <?php modules($modules) ?>
 <?php layout('footer') ?>
```
ini mempermudah dalam codingan

5.  perbedaan dalam server localhost dengan 127.0.0.1 .
adalah localhost adalah DNS sedangkan 127.0.0.1 adalah IP Address secara server sama akan tetapi beda alamat servernya.

6. Membuat 404 page.
setelah halaman 404.php sudah dibuat di modules > 404 > 404.php maka tambahkan code berikut untuk memanggil file
yang berada di folder modules di helper.php :
```markdown
if (!function_exists('modules')) {
 function modules($modules)
 {
  if (file_exists(APP_PATH.'/view/modules/'.$modules.'/'.$modules.'.php')) {
   include_once APP_PATH.'/view/modules/'.$modules.'/'.$modules.'.php';
  }else{
   $modules = '404';
   include_once APP_PATH.'/view/modules/'.$modules.'/'.$modules.'.php';
  }
 }
}
```
pada code tersebut apabila content pada modules tidak ada maka akan menampilkan halaman 404.

7. kita akan mencobanya dihalaman login, ganti code login user menjadi code berikut di auth.php :
```markdown
if (empty($_SESSION['user'])) {
 $user_status = 'login';
}else{
 if (!empty($_GET['p'])) {
  $modules = $_GET['p'];
 }else{
  $modules = 'home';
 }
 $user_status = 'index';

}
```
dan pada halaman inventaris > index.php update codenya menjadi seperti berikut :
```markdown
if ($user_status=='login') {
 include(dirname(__FILE__).'/view/pages/login/login.php');
}else{
 include(dirname(__FILE__).'/view/index.php');
}
```
  - session user = true "menyatakan kita udah login".
  - $_GET['p'] "mengambil parameter pada URL" contoh : google.com?p= "1&content=abc".

untuk menampilkan halaman 404nya kita cukup memanggil paramater yang tidak ada pada folder module
contoh : 
- linkapp/inventaris/?p=dashboard.
karena dashboard tidak ada pada module maka akan muncul halaman 404, sedangkan jika kita ganti menjadi

- linkapp/inventaris/?p=home.
maka akan menuju halaman view > index.php.

7. Menyederhanakan halaman login dengan memcahkannya menjadi beberapa bagian :
- view > login 
a. login.php
b. login_css.php
c. login._js.php

8. untuk menggabungkannya kembali kita butuh file helper dengan isian sebagai berikut :
```markdown
if (!function_exists('page')) {
 function page($page)
 {
  include_once APP_PATH.'/view/'.$page.'/'.$page.'.php';
 }
}

if (!function_exists('page_js')) {
 function page_js($page)
 {
  include_once APP_PATH.'/view/'.$page.'/'.$page.'_js.php';
 }
}

if (!function_exists('page_css')) {
 function page_css($page)
 {
  include_once APP_PATH.'/view/'.$page.'/'.$page.'_css.php';
 }
}
```
disini kita bisa memecah antara file content, css, maupun js-nya dan memanggil sesuai nama $pagenya saja.

lalu $_SESSION['user'] pada auth.php dibuat 'unset' saja {unset($_SESSION['user']);} karena agar bisa langsung masuk.

9. membuat api.php login untuk database, pertama koneksikan api.php dengan database dengan query yang sama di index.php,
tak lupa untuk di require_once terlebih dahulu seluruh file yang ada di folder inc.
```markdown
 $db = db_qodr();
    if ($result = $db->query("SELECT * FROM inv_user LIMIT 10")) {

        $result->close();
    }
```

10. pada folder api yang telah dibuat di iventaris tambahkan file get.php dan post.php dan di require ke api.php
dengan code berikut :
```markdown
if ($_POST) 
{
 include_once(dirname(__FILE__)."/api/post.php");
}

if ($_GET) 
{
 include_once(dirname(__FILE__)."/api/get.php");
}
```
11. cek jika terhubung dengan database melalui code yang aan ditambahkan pada get.php :
```markdown
if (!empty($_GET['login'])) 
{
 auth($db);
}

function auth($db)
{
 if ($result = $db->query("SELECT * FROM inv_user WHERE username = 'admin' AND password = 'admin' ")) 
 {
     print_r($result->fetch_row());
     $result->close();
 }
}
```
 - $db bedasal dari variabel di api.php

12. untuk post.phpnya ise dengan code berikut :
```markdown
if (!empty($_POST['login'])) 
{
 auth($db);
}


function auth($db)
{
    $user = $_POST['username'];
    $pass = $_POST['password'];
    
    if ($result = $db->query("SELECT * FROM inv_user WHERE username = '$user' AND password = '$pass' "))
    {
        $_SESSION['user'] = $result->fetch_object();
        echo json_encode($_SESSION['user']);
        $result->close();
    }
}
```
 - fetch_object() : biar datanya jadi object.
bedanya array dan object adalah "sebenarnya sama saja antara array dan object, 
tp nanti akan terlihat saat sudah pakai framework/ konsep OOP, object oriented programming".

13. hubungkan halaman login.php dengan method api yang telah kita buat dengan merubah beberapa bagian :
```markdown
<form id="formLogin" action="<?=BASE_URL?>api.php" method="POST">

<input type="text" name="username" class="form-control" placeholder="Username">
<input type="password" name="password" class="form-control" placeholder="Password">
<button type="button" class="btn btn-primary btn-block btn-flat" onclick="return login()">Sign In</button>
```
14. pada file login_js.php tambahkan script ajax type POST sebagai berikut :
```markdown
replace 
function login(){
  var form = $('#formLogin');
  var data = form.serialize();
  $.ajax({
    url: form.prop('action'),
    method: form.prop('method'),
    data: 'login=true&'+data,
    dataType: "json",
    complete:function(res,data){
      console.log(res,data);
    }
  });
}
```

15. membuat notifikasi login dengan Pnotify



SUMBER :
a. <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">


















