Pertemuan minggu 7-10-2018

###Configurasi dan dinamisasi URL

1. Configurasi database dengan halaman view-nya

= STEP :
    - tambahkan file config.php pada foldet inc, dan dimasukkan {session_start();}.
    - buat index.php global di global folder, 
       didalamnya di includekan file koneksi.php dan config.php dengan {requier_once()}.

       ```markdown
            require_once (dirname(__FILE__). '/inc/config.php' );
            require_once (dirname(__FILE__).'/inc/koneksi.php');
            require_once (dirname(__FILE__).'/inc/auth.php');
            
            //tambahkan {(dirname(__FILE__).'path yang akan diinclude')} jika file terdapat didalam directory lain.
       ```
    - pada file koneksi.php koneksi database menggunakan mysqli dibuat function.

        ```markdown
        function getMySql()
        {
            $mysqli_config = new stdClass();
            $mysqli_config->host  = 'localhost';
            $mysqli_config->user  = 'root';
            $mysqli_config->pass  = '';
            $mysqli_config->db   = 'inv_qodr';

            return $mysqli_config;
        }

        function db_qodr()
        {
            $var = getMySql();

            $mysqli = new mysqli($var->host, $var->user, $var->pass, $var->db);
            return $mysqli ;
        }
        ```
    - untuk mencoba koneksinya kita jalankan kode berikut pada index.php global :

        ```markdown
            $db = db_qodr();
                 if ($result = $db->query("SELECT * FROM inv_user LIMIT 10")) {

                 printf("Select returned %d rows.\n", $result->num_rows);
                 $result->close();
                }
        ```
        jika berhasil maka akan muncul tulisan { Select returned 1 rows.}

2. Autentifikasi halaman login.

= STEP :
    - tambahkan file auth.php pada folder inc dengan insian:

        ```markdown
            function user() {
                if (empty($_SESSION['user'])) {
                    $user_status = 'login';
                }else{
                    $user_status = 'dashboard';
                }
            return $user_status;
            }
        ```
    
    - di panggil halaman login.php di index.php global menggunakan include().

        ```markdown
            if (user() == 'login') {
                include(dirname(__FILE__).'/view/pages/login/login.php');
                die();
            }
        ```
        sebelum di include maka ia akan di autentifikasikan di file auth.php, user() = nama function di auth.php .

3.  dinamisasi URL.
file CSS dan JSnya akan dipakai langsung dari 'bower_components' theme, agar link tidak panjang maka dibuat construct
BASE_URLnya.

=STEP :
    - pada file config.php tambahkan construct {define(''.'');}.

        ```markdown
            define('BASE_URL','Base_url palikasinya/');
            define('THEME_URL',BASE_URL.'theme/themeplate/');
        ```

    - link CSS dan JS pada halaman login.php bisa dipersingkat.
        sebelumnya :
        ``` markdown
            <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
            dan
            <script src="../../bower_components/jquery/dist/jquery.min.js"></script>
        ```

        menjadi :
        ```markdown
            <link rel="stylesheet" href="<?=THEME_URL?>/bower_components/bootstrap/dist/css/bootstrap.min.css">
            dan
            <script src="<?=THEME_URL?>/bower_components/jquery/dist/jquery.min.js"></script>
        ```
    jadi <?=THEME_URL?> memanggil define() yang terdapat pada config.php, cara menghubungkan config.php dengan login.php
    adalah dengan index.php global yang telah di includekan seluruh filenya.

4. Perbedaan dalam include.

```markdown
    1. include() : akan menyertakan dan mengevaluasi seluruh program yang ada di file yang disertakan.
    2. require() : akan menyertakan dan mengevaluasi seluruh program yang ada di file yang disertakan 
       namun pada saat file yang disertakan tidak ditemukan, maka perintah-perintah selanjutnya tidak akan dijalankan.
    3. _once : baik pada include maupun require akan memastikan bahwa file yang disertakan hanya dieksekusi sekali saja.
```

```markdown
    1. fecth_row()  : $result[1].
    2. fect_array() : $result[user name].
```

1. fetch_array()    : akan menampilkan array yang sesuai dengan row, klo ada yang ga sesuai dia jdi NULL
2. fetch_row()      : akan mengambil data row lalu menjadikannya array dimulai dari (0) dan jika berlebih dia akan menjadi NULL.

5. sumber :
 a. http://php.net/manual/en/mysqli.query.php