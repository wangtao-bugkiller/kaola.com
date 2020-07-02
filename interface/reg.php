<?php
    include('./conn.php');
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $sql = "select * from user where user_name='$username'";

    // 执行sql语句
    $result = $mysqli->query($sql);
    if($result->num_rows>0){ 
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="../src/html/reg.html";</script>';
        $mysqli->close();
        die;
    }

    // 将用户传递过来的数据 写入数据库
    $insertUser = "insert into user(user_name,user_password)values('$username','$password')";
    // echo $insertUser;

    $res = $mysqli->query($insertUser);

    $mysqli->close();
    
    if($res){
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="../src/html/login.html";</script>';
    }
    
?>