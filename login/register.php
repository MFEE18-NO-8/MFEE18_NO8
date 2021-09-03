<?php
    $account = $_REQUEST['account'];
    $passwd = $_REQUEST['passwd'];
    echo "{$account}:{$passwd}";
    echo '<hr />';
    foreach($_REQUEST as $k => $v){

        if (gettype($v) == 'array'){
            echo $k . '<br>';
            foreach($v as $kk => $vv){
                echo "{$kk} : {$vv}<br />";
            }
        }else{
            echo "{$k} : {$v}<br />";
        }
    }