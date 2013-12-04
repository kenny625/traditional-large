var socket = io.connect('http://140.112.30.32:8001');

$(document).ready(function () {
    $('#keyboard li').hover(function () {
        $('#enlargeLetter').remove();
        $class = $(this).attr('class');
        /*         console.log($class); */
        $enlargeLetter = '<li id="enlargeLetter" class="' + $class + ' leap-interactive tapper"' + ">" + $(this).html() + "</li>";
        $($enlargeLetter).insertAfter(this);
        $left = $(this).position().left - 10;
        $top = $(this).position().top - 10;
        $width = $(this).width() + 20;
        $height = $(this).height() + 20;
        //        console.log("left "+$left+" top "+$top);
        $('#enlargeLetter').css({
            top: $top,
            left: $left,
            width: $width,
            height: $height
        }).click(

        );
        document.getElementById('enlargeLetter').addEventListener("click", function (e) {
            writeWord();
        });

    }, function () {

        //        $(this).removeClass('hover');
    }).click();
    
    
    sendKeyPosition();

	socket.on('position', function (data) {
		$('#pos').html('x '+Math.round(data['left'])+' y '+Math.round(data['top']));
		$('#cursor').css({left:data['left'], top:data['top'], position:'absolute'});
	});
   

	
		var keys = $('#keyboard li');
		

			

    $('#q').mouseenter();

});   //end of document.ready

function writeWord() {
	var $writeBox = $('#write'),
        shift = false,
        capslock = false;
    var $this = $('#enlargeLetter'),
        charater = $this.html();
        
    $this.css({"color": "red"});

    // 一键两意
    if ($this.hasClass('symbol')) charater = $('span:visible', $this).html();
    console.log(charater);
    // Button detele 
    if ($this.hasClass('delete')) {
        var html = $writeBox.html();
        $writeBox.html(html.substring(0, html.length - 1));
        return false;
    };

    // Button tab
    if ($this.hasClass('tab')) charater = '\t';

    // Button capslock
    if ($this.hasClass('capslock')) {
        $('.letter').toggleClass('uppercase');
        capslock = true;
        return false;
    };

    // Button enter
    if ($this.hasClass('enter')) charater = '\n';

    // Button shift
    if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
        $('.letter').toggleClass('uppercase');
        $('.symbol span').toggle();

        shift = (shift === true) ? false : true;
        capslock = false;
        return false;
    };

    // Button space
    if ($this.hasClass('space')) charater = ' ';

    // 转换为大写
    if ($this.hasClass('uppercase')) charater = charater.toUpperCase();

    // 输出所按的键值
    $writeBox.html($writeBox.html() + charater);
    
/*     $this.css({"color": "blue"}); */
}



function sendKeyPosition(){
/* console.log($('#keyboard li')); */
	var keys = [];
	for(i=0 ;i<$('#keyboard li').length ;i++){
		/*
console.log('i '+i);
		console.log($('#keyboard li').eq(i).position());
		console.log($('#keyboard li').eq(i).html());
		console.log($('#keyboard li').eq(i).attr('id'));
*/
/* 		keys[$('#keyboard li').eq(i).attr('id')] = $('#keyboard li').eq(i).position(); */
var key=$('#keyboard li').eq(i).attr('id'),value=$('#keyboard li').eq(i).position();

var item = {key: value};
console.log(item);
		keys.push(item);
	}
	/*
JSON.stringify(keys);
	console.log(keys);
	var test= {key: "value"};
*/
/* 	JSON.stringify(test); */
	socket.emit('keyboardElement', keys);
}