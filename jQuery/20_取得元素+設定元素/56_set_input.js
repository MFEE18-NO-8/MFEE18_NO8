$(function () {

    // 10. 練習設定初始值
    btnSet.onclick = function () {
        // 20. 將地址預設為台中

        // // 方法A:
        // $('#address').prop('value', 'Taichung');

        // 方法B.
        // $('select option[value="Taichung"]').prop('selected', true);


        // // 30. 將職業預設為其他
        // $('input[value="other"][name="job"]').prop('checked', true);

        // // 40. 將交通工具預設為機車
        // $('input[value="motorcycle"][name="vehicle"]').prop('checked', true);

        // ----------- js版 ------------------
        var js = document.getElementsByName('job');
        for (var i = 0; i < js.length; i++) {
            // 如果 值 是其他，就要被選取
            if (js[i].value == "other") {
                js[i].checked = true;
            }
        }
    }
})

