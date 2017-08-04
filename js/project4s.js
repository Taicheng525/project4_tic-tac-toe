var awesomeGame = (function(){
    
//------------------------------------- Functions -----------------------------------------------
    
    //row check
    function rowCheck(){
        let countWin_row =0;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if($(board[i][j]).attr('class') == $(board[i][0]).attr('class')
                   && ($(board[i][0]).attr('class') == 'box box-filled-1'
                   || $(board[i][0]).attr('class') == 'box box-filled-2')){
                    countWin_row++;
                }//if end
            }// j loop end
            if(countWin_row==3){
                rowResult = true;
                console.log("row win");
                console.log(countWin_row);
                countWin_row=0;
                showWinner($(board[i][0]).attr('class'),'box box-filled-1','box box-filled-2');
                break;
            }else{
                countWin_row =0;
                rowResult = false;
            }
        }// i loop end
    }// rowCheck end
    
    //column check
    function colCheck(){
        let countWin_col =0;
        for(let j=0; j<3; j++){
            for(let i=0; i<3; i++){
                if($(board[i][j]).attr('class') == $(board[0][j]).attr('class')
                   && ($(board[0][j]).attr('class') == 'box box-filled-1'
                   || $(board[0][j]).attr('class') =='box box-filled-2')){
                    countWin_col++;
                }//if end
            }//i loop end
            if(countWin_col==3){
                colResult = true;
                console.log("col win");
                console.log(countWin_col);
                countWin_col=0;
                showWinner($(board[0][j]).attr('class'),'box box-filled-1','box box-filled-2');
                break;
            }else{
                countWin_col=0;
                colResult = false;
            }        
        }//j loop end
    }//colCheck end
    
    //right diagnoal check
    function right_diagnoal_Check(){
        if($(board[0][2]).attr('class')==$(board[1][1]).attr('class')
          && $(board[0][2]).attr('class')==$(board[2][0]).attr('class')
          && $(board[1][1]).attr('class')==$(board[2][0]).attr('class')   
          && ($(board[0][2]).attr('class') == 'box box-filled-1'
          || $(board[0][2]).attr('class')=='box box-filled-2')){
                right_diagnoal_result = true;
                console.log("right win");
                showWinner($(board[0][2]).attr('class'),'box box-filled-1','box box-filled-2');
           }else{
                right_diagnoal_result = false;   
           }
    }
    
    //left diagnoal check
    function left_diagnoal_Check(){
        if($(board[0][0]).attr('class')==$(board[1][1]).attr('class')
          && $(board[1][1]).attr('class')==$(board[2][2]).attr('class')
          && $(board[0][0]).attr('class')==$(board[2][2]).attr('class')
          && ($(board[0][0]).attr('class') == 'box box-filled-1'
          || $(board[0][0]).attr('class')=='box box-filled-2')){
                left_diagnoal_result = true;
                console.log("left win");
                showWinner($(board[0][0]).attr('class'),'box box-filled-1','box box-filled-2');
                
           }else{
                left_diagnoal_result = false;
           }
    }

    //switch player
    function switchPlayer(){
        if(player==1){
            player=2;
            
        }else if(player==2){
            player=1;
        }
    }
    
    //show winner finish-html
    function showWinner(obj,o,x){
        if(obj == o){
            $('#finish').addClass('screen-win-one');
            $('#board').hide()
            $('.message').text("The Winner!");
        }
        else if(obj == x){
            $('#finish').addClass('screen-win-two');
            $('#board').hide()
            $('.message').text("The Winner!");
        }
        $('#finish').show();     
    }

    //tie check
    function tieCheck(){
        const o = 'box box-filled-1';
        const x = 'box box-filled-2';
        if(rowResult == false && colResult == false && right_diagnoal_result == false && left_diagnoal_result == false 
        && ($('#cell-1').attr('class')==o || $('#cell-1').attr('class')==x)
        && ($('#cell-2').attr('class')==o || $('#cell-2').attr('class')==x)
        && ($('#cell-3').attr('class')==o || $('#cell-3').attr('class')==x)
        && ($('#cell-4').attr('class')==o || $('#cell-4').attr('class')==x)
        && ($('#cell-5').attr('class')==o || $('#cell-5').attr('class')==x)
        && ($('#cell-6').attr('class')==o || $('#cell-6').attr('class')==x)
        && ($('#cell-7').attr('class')==o || $('#cell-7').attr('class')==x)
        && ($('#cell-8').attr('class')==o || $('#cell-8').attr('class')==x)
        && ($('#cell-9').attr('class')==o || $('#cell-9').attr('class')==x)){
            $('#finish').addClass('screen-win-tie');
            $('.message').text("Tie!");
            $('#finish').show();
            $('#board').hide()
            console.log(rowResult);
            console.log(colResult);
            console.log(right_diagnoal_result);
            console.log(left_diagnoal_result);
        }
    }

 //------------------------------------- Game Process -----------------------------------------------
    
    let player = 1;
    let board =[];
    let rowResult;
    let colResulte;
    let right_diagnoal_result;
    let left_diagnoal_result;
    const dimesion = 3;
    let boardObjects = $('.box');

    while(boardObjects.length){
      board.push(boardObjects.splice(0,3))
    }
    console.log(board);

    //start button
    $('#finish').hide();
    $('#board').hide();
    $('.button').on('click', function(){
        $('#start').hide();
        $('#board').show();
    });
    
    //showing each player's turn
    $('.box').mousemove(function(){
        if(player==1){
            $('#player2').removeClass('active');
            $('#player1').addClass('active');
        }else if(player==2){
            $('#player1').removeClass('active');
            $('#player2').addClass('active');
        }
    });
    
    //showing player's background-image 
    $('.box').mouseover(function(){
        if(player==1 && $(this).attr('class')=='box'){
            $(this).attr({
                'style': 'background-image: url(img/o.svg)'
            });
        }else if(player==2 && $(this).attr('class')=='box'){
            $(this).attr({
                'style': 'background-image: url(img/x.svg)'
            });
        }
    });

    $('.box').mouseout(function(){
        if(player){
            $(this).removeAttr('style');
        }//if end
    });

    //board click events
    $(".box").on('click',function(){
        if(player==1 && $(this).attr('class')=='box'){
            $(this).addClass('box-filled-1').attr({
                'data-mark' : "o"
            });     
            switchPlayer();
        }else if(player==2 && $(this).attr('class')=='box'){
            $(this).addClass('box-filled-2').attr({
                'data-mark' : "x"
            });  
            switchPlayer();
        }
        
        //checking result
        rowCheck();
        colCheck();
        right_diagnoal_Check();
        left_diagnoal_Check();
        tieCheck(); 

    });//box click event end
    
    //restart setting
    $('#restart').on('click', function(){
        $('#finish').hide();
        $('.box').attr('class', 'box');
        $('#finish').attr('class', 'screen screen-win');
        $('#board').show();
        player =1;
    });

})();//module pattern end
