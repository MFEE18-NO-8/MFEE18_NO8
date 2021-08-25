// // 10. 如果是這樣寫的話，有錯誤訊息，為什麼？
// btnGet.onclick = function(){
//     console.log("OK");
// }












































































// 11. 畫面準備好以後才開始執行
$(function () {
    btnGet.onclick = function () {

        // // 20. 取得 姓名欄位 (使用 JavaScript 的方式)
        // var js = document.getElementById('userName').value;
        // console.log(js);

        // // 21. 取得 姓名欄位 (使用 jQuery 的方式)
        // var jq = $('#userName').prop('value');
        // console.log(jq);


        // // 30. 取得 地址欄位 (使用 JavaScript 的方式)
        // // 31. 取得 地址欄位 (使用 jQuery 的方式)
        // var js = document.getElementById('address').value;
        // console.log(js);

        // var jq = $('#address').prop('value');
        // console.log(jq);

        // var jq2 = $('#address').val();
        // console.log(jq2);

        // 40. 取得 年紀欄位 (使用 JavaScript 的方式)
        // 41. 取得 年紀欄位 (使用 jQuery 的方式)

        // 方法A:
        var js = document.getElementsByName('age');
        for (var i = 0; i < 4; i++) {
            // 有被點選的元素
            if (js[i].checked) {
                console.log(js[i].value);
            }
        }

        // 方法B
        var js2 = document.querySelector('input[name="age"]:checked').value;
        console.log(js2); 

        var jq = $('input[name="age"]:checked').val();
        console.log(jq);
    }
})



