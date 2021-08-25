demo.onclick = function () {

    // // 如果沒有就加入有的話就移除
    // 方法A:
    // var temp = $('p').prop('class');
    // if (temp == '') {
    //     $('p').addClass('bgColor');
    // } else {
    //     $('p').removeClass('bgColor');
    // }

    // 方法B: 
    $('p').toggleClass('bgColor');

    // // div 的 class 
    // var temp = $('div').prop('class').split(' ');
    // console.log(temp);
    // $('div').removeClass('bgColor');
    // $('div').addClass('bgColor');
}
// 試試看 addClass、removeClass，以及各種選擇器

// 10. div,p
btn1.onclick = function () {
    $('div,p').addClass('bgColor');
}
// 20. div>p
btn2.onclick = function () {
    $('div,p').removeClass('bgColor');
    $('div>p').addClass('bgColor');
}
// 30. div+p
btn3.onclick = function () {
    $('div,p').removeClass('bgColor');
    $('div+p').addClass('bgColor');
}
// 40. div~p
btn4.onclick = function () {
    $('div,p').removeClass('bgColor');
    $('div~p').addClass('bgColor');
}
// 50. div p
btn3.onclick = function () {
    $('div,p').removeClass('bgColor');
    $('div p').addClass('bgColor');
}