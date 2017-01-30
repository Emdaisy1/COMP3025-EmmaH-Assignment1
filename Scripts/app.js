$(document).ready(function(){

    //Set up variables
    var numOne;
    var numTwo;
    var op;
    var numOneSet = false;
    var opSet = false;
    var $currentDisplay = $('#calcDisplay');

    //Set up reset function for Clear button
    function resetCalc(){
        numOne = '';
        numTwo = '';
        op = '';
        numOneSet = false;
        $currentDisplay.val('0');
    }

    //"Reset" calculator on start
    resetCalc();

    //Behaviour for handling number & decimal buttons
    $( '.number' ).click( function(){
        var addToNum = this.id;
        console.log(op + ' ' + numOne + ' ' + numTwo);
        //If an operator has been clicked but number 1 has not been set, then set it as number two
        if( op !== '' && numOne === '' ){
            numOne = '0';
            numTwo = numTwo + addToNum;
            console.log( '1: ' + numOne + ' 2: ' + numTwo);
        }
        //If an operator has been clicked, and number 1 is not null/has been set, then set it as number two
        else if( op !== '' && numOne !== '' ){
            numTwo = numTwo + this.id;
            console.log( '1: ' + numOne + ' 2: ' + numTwo);
        }
        //If neither of the above, set the number to number one
        else{
            numOne = numOne + this.id;
            console.log( '1: ' + numOne + ' 2: ' + numTwo);
        }
    });

    //Behaviour for handling operator buttons
    $( '.operator' ).click( function(){
        console.log('operator clicked');
        op = this.id;
    });

    //Behaviour for handling equals button
    $( '.equals' ).click( function(){
        console.log('Equals clicked');
    });

    //Behaviour for handling clear button
    $( '.clear' ).click( function(){
        console.log('Clear clicked');
        resetCalc();
    });

});

