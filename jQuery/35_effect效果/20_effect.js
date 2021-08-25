

$(document).ready(function () {
    // 10. jQuery 的動畫和特效練習
    //     $().hide() / $().show()
    //     $().fadeOut() / $().fadeIn()
    //     $().slideUp() / $().slideDown()
    toggle.onclick = function () { $('#mainBag').toggle(); }

    hideAll.onclick = function () { $('img').hide(4000, "swing"); }
    showAll.onclick = function () { $('img').show(); }

    fadeOutAll.onclick = function () { $('img').fadeOut(3000); }
    fadeInAll.onclick = function () { $('img').fadeIn(); }

    slideUp.onclick = function () { $('#bagTop').slideUp(); }
    slideDown.onclick = function () { $('#bagTop').slideDown(); }

    // 20. 點選上排的圖片，被點選到的圖片不見 
    //  (試著透過 this 關鍵字 + hide() 實作)
    $('#bagTop>img').on('click', function () {
        $(this).hide(); // => display:none
    })


    // 30. 點選下排的圖片，被點選到的圖片不見
    //  (試著透過 this 關鍵字 + css() 實作)
    $('#bagButtom>img').on('click', function () {
        $(this).css('visibility', 'hidden');
    })

});

