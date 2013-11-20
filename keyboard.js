$(document).ready(function () {
/*     $("*").addClass('leap-interactive'); */

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


    var lastFrame = null;
    var lastJ = null;
    var lastZ = null;
    // Setup Leap loop with frame callback function
    var controllerOptions = {
        enableGestures: true
    };

/* 	printKeyPosition(); */
		var keys = $('#keyboard li');
      Leap.loop(controllerOptions, function (frame) {
        
        if (frame.pointables.length > 0) {
                            for (var i = 0; i < frame.pointables.length; i++) {
                                      var pointable = frame.pointables[i];

                                      if (pointable.tool) {
                                        
                                      }
                                      else {
                                        if(i==0){
                                        
										  
										  var left, right, top, bottom, rowStartIndex, rowEndIndex;
										  var leapPosition = leapToScene(frame,pointable.tipPosition);
										  $leapPosition = leapToScene(frame,pointable.tipPosition);
										  $('#pos').html('x '+Math.round(leapPosition[0])+' y '+Math.round(leapPosition[1]));
										  $('#cursor').css({left:$leapPosition[0],top:$leapPosition[1], position:'absolute'});
										 
/* 										  console.log(leapPosition); */
										  if(leapPosition[1] >=102 && leapPosition[1] <=190){
											  rowStartIndex = 0;
											  rowEndIndex = 13;
										  }else if(leapPosition[1] >=191 && leapPosition[1] <=279){
											  rowStartIndex = 14;
											  rowEndIndex = 27;
										  }else if(leapPosition[1] >=280 && leapPosition[1] <=368){
											  rowStartIndex = 28;
											  rowEndIndex = 40;
										  }else if(leapPosition[1] >=369 && leapPosition[1] <=457){
											  rowStartIndex = 41;
											  rowEndIndex = 52;
										  }else{
											  rowStartIndex = 53;
											  rowEndIndex = 53;
										  }
										  for(var j=rowStartIndex ;j<=rowEndIndex ;j++){
										  	  left = keys.eq(j).position().left;
										  	  if(j!=rowEndIndex){
												  	right = keys.eq(j+1).position().left-1;
										  	  }else{
											  	  //the last key of this row
											  	  right = 1286;
										  	  }
										  	  top = keys.eq(j).position().top;
										  	  bottom = keys.eq(j).position().top + 89 -1;
										  	  
										  	 
										  	  
											  if(leapPosition[0] >= left && leapPosition[0] <= right && leapPosition[1] <= bottom && leapPosition[1] >= top){
											  /*
console.log(keys.eq(j).html());
											  console.log(keys.eq(j).position());
*/
/* 												  keys.eq(j-1).mouseleave(); */
												  var z;
												  for (var p = 0; p < frame.pointables.length; p++) {
												  	z = frame.pointables[p].touchDistance;
												  	if(lastZ != null && (z-lastZ)<(-0.2)){
													  	
												  	}else{
													  	if(j!=null && lastJ != j){
													  keys.eq(j).mouseenter();
												  }
												  	}
													  
													  }
												  
												  lastJ = j;
												  lastZ = z;
											  }
/* 											  console.log('j '+j+' left '+left+' right '+right+' top '+top+' bottom '+bottom+' x '+leapPosition[0]+' y '+leapPosition[1]); */
										  }
										  on = false;
										  
/*                                           console.log(leapToScene(frame,pointable.tipPosition)+"\n"); */
                                          }
                                      }
                                     
                                      
                            }
                        }

                        for( var i =  0; i < frame.gestures.length; i++){

                          var gesture  = frame.gestures[0];
                          //Per gesture code goes here
                          var type = gesture.type;
                          console.log("gesture: "+type+"\n");
          
                          switch( type ){

                            case "circle":
                              //onCircle( gesture );

                              break;
                              
                            case "swipe":
                              //onSwipe( gesture );
                              
                              break;

                            case "screenTap":
                              //onScreenTap( gesture );
                              
                              break;

                            case "keyTap":
                              //onKeyTap( gesture );
                              writeWord();
                              break;

                          }
                        }
        
        
        //screenTap distance
        	if (lastFrame !== null) {
/*             console.log(frame.pointables[0].touchDistance); */
            	for (var p = 0; p < frame.pointables.length; p++) {
                	if (frame.pointables[p].touchDistance <= 0 && lastFrame.pointables[p].touchDistance > 0) {
                    	writeWord();
						}else if(frame.pointables[p].touchDistance > 0){
							$('#enlargeLetter').css({"color": "blue"});
						}
					}
				}
        lastFrame = frame;
            });

			

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

function leapToScene( frame , leapPos ){

    var iBox = frame.interactionBox;

    var left = iBox.center[0] - iBox.size[0]/2;
    var top = iBox.center[1] + iBox.size[1]/2;

    var x = leapPos[0] - left;
    var y = leapPos[1] - top;

    //console.log(iBox.size[0]+" "+iBox.size[1]);
    x /= iBox.size[0];
    y /= iBox.size[1];

    if(x < 0)
      x = 0;
    else if(x > 1)
      x = 1;

    if(y < -1)
      y = -1;
    else if(y > 0)
      y = 0;

    // canvs area
    x *= 1286; //width
    y *= 445; //height
    y -= 102;

    return [ x , -y ];

}

function printKeyPosition(){
	for(i=0 ;i<$('#keyboard li').length ;i++){
		console.log('i '+i);
		console.log($('#keyboard li').eq(i).position());
		console.log($('#keyboard li').eq(i).html());
	}
}