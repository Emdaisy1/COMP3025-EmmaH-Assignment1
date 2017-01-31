$(document).ready(function() {

    //Set up variables
    var numOne;
    var numTwo;
    var op;
    var numOneSet = false;
    var postCalc = false;
    var $currentDisplay = $('#calcDisplay');

    //Set up reset function for Clear button
    function resetCalc() {
        numOne = '';
        numTwo = '';
        op = '';
        numOneSet = false;
        postCalc = false;
        $currentDisplay.val('0');
    }

    //Set up calulation function
    function calculate() {
        
        //Parse num vars to floats
        numOne = parseFloat(numOne);
        numTwo = parseFloat(numTwo);
        console.log("Calc " + op + " for 1: " + numOne + " 2: " + numTwo);

        if( op == 'add' ){
            numOne = numOne + numTwo;
        }
        else if( op == 'subtract' ){
            numOne = numOne - numTwo;
        }
        else if( op == 'multiply' ){
            numOne = numOne * numTwo;
        }
        else {
            numOne = numOne / numTwo;
        }

        if(numOne.length > 18){
            numOne = parseFloat(numOne).toFixed(15);
        }
        $currentDisplay.val(numOne);
        postCalc = true;
    }

    //"Reset" calculator on start
    resetCalc();

    //Behaviour for handling number & decimal buttons
    $( '.number' ).click( function() {
        if(postCalc){
            numTwo = '';
            postCalc = false;
        }
        var addToNum = this.id;
        console.log(op + ' ' + numOne + ' ' + numTwo);
        //If an operator has been clicked but number 1 has not been set, then set it as number two
        if( op !== '' && numOne === '' ) {
            numOne = '0';
            numTwo = numTwo + addToNum;
            console.log( 'op with no num 1 - 1: ' + numOne + ' 2: ' + numTwo);
            $currentDisplay.val(numTwo);
        }
        //If an operator has been clicked, and number 1 is not null/has been set, then set it as number two
        else if( op !== '' && numOne !== '' ) {
            numTwo = numTwo + this.id;
            console.log( 'op with num 1 - 1: ' + numOne + ' 2: ' + numTwo);
            $currentDisplay.val(numTwo);
        }
        //If neither of the above, set the number to number one
        else {
            numOne = numOne + this.id;
            console.log( 'no op no num 1 - 1: ' + numOne + ' 2: ' + numTwo);
            $currentDisplay.val(numOne);
        }
    });

    //Behaviour for handling operator buttons
    $( '.operator' ).click( function() {
        //If no past operator (e.g. after reset) set this as operator
        if( op === '' ) {
            op = this.id;
        }
        //Else if there's an operator but a calculation was just done, set to new operator and set numTwo to numOne to do operation on itself
        else if( op !== '' && postCalc){
            op = this.id;
            numTwo = numOne;
        }
        //Else, calculate the previous equation then set this as the operator for next time
        else{
            calculate();
            op = this.id;
        }
    });

    //Behaviour for handling equals button
    $( '.equals' ).click( function() {
        
        //So long as all 3 values exist, run the calculation
        if(numOne !== '' && numTwo !== '' && op !== ''){
            calculate();
        }

    });

    //Behaviour for handling clear button
    $( '.clear' ).click( function() {

        //Reset the calulator
        resetCalc();
        
    });

});

