$(document).ready(function(){

    var numOne;
    var numTwo;
    var op;
    var numOneSet = false;
    var opSet = false;
    var $currentDisplay = $('#calcDisplay');

    function resetCalc(){
        numOne = null;
        numTwo = null;
        op = null;
        numOneSet = false;
        $currentDisplay.val('0');
    }

    resetCalc();

    $( '.number' ).click( function(){
        var num = this.id;
        console.log('Number ' + num + ' clicked');
    });

    $( '.operator' ).click( function(){
        console.log('operator clicked');
    });

    $( '.decimal' ).click( function(){
        console.log('Dec clicked');
    });

    $( '.equals' ).click( function(){
        console.log('Equals clicked');
    });

});

