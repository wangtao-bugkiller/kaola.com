<?php
    include('./conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // sql语句 查询
    $sql = "select * from user where user_name='$username' and user_password='$password'";

    // 执行sql语句
    $res = $mysqli->query($sql);

    if($res->num_rows>0){
        echo '<script>alert("登录成功");</script>';
        echo '<script>location.href="../src/html/index.html";</script>';
    }else{
        echo '<script>alert("用户名或密码不正确.");</script>';
        echo '<script>location.href="../src/html/login.html";</script>';
    }

    $mysqli->close();
?>