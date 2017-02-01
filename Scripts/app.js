$(document).ready(function() {

    //Set up variables
    var numOne;
    var numTwo;
    var op;
    var numOneSet;
    var postCalc;
    var opClicked;
    var eqClicked;
    var $currentDisplay = $('#calcDisplay');

    //Set up reset function for Clear button
    function resetCalc() {
        numOne = '';
        numTwo = '';
        op = '';
        numOneSet = false;
        postCalc = false;
        opClicked = false;
        eqClicked = false;
        $currentDisplay.val('0');
        $( '.ui-btn' ).prop('disabled', false);
    }

    //Set up calulation function
    function calculate() {
        
        //Parse num vars to floats
        numOne = parseFloat(numOne);
        numTwo = parseFloat(numTwo);

        //Determine calculation to run via ID of operator
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
            if(numTwo == 0){
                $( '.ui-btn' ).prop('disabled', true);
                $( '.clear' ).prop('disabled', false);
                $currentDisplay.val('Cannot divide by 0. Please clear calculator.');
            }
            else{
                numOne = numOne / numTwo;
            }
        }

        if(numOne.length > 18){
            numOne = parseFloat(numOne).toFixed(15);
        }
        $currentDisplay.val(numOne);
        postCalc = true;
        opClicked = false;

    }

    //"Reset" calculator on start
    resetCalc();

    //Behaviour for handling number & decimal buttons
    $( '.number' ).click( function() {
        
        if( !opClicked && eqClicked ) {
            numOne = '';
            numTwo = '';
            op = '';
            eqClicked = false;
        }
        
        if( opClicked && postCalc ) {
            numTwo = '';
        }

        postCalc = false;
        //If an operator has been clicked but number 1 has not been set, then set it as number two
        if( op !== '' && numOne === '' ) {
            numOne = '0';
            //If they tried to add a decimal and one already exists, do nothing
            if( this.id == '.' && numTwo.indexOf('.') > -1 ) {
                //Do nothing
            }
            //Else, append the number
            else{
                numTwo = numTwo + this.id;
                $currentDisplay.val(numTwo);
            }
        }
        //If an operator has been clicked, and number 1 is not null/has been set, then set it as number two
        else if( op !== '' && numOne !== '' ) {
            if( this.id == '.' && numTwo.indexOf('.') > -1 ) {
                
            }
            else{
                numTwo = numTwo + this.id;
                $currentDisplay.val(numTwo);
            }
        }
        //If neither of the above, set the number to number one
        else {
            if( this.id == '.' && numOne.indexOf('.') > -1 ) {
                
            }
            else{
                numOne = numOne + this.id;
                $currentDisplay.val(numOne);
            }
        }
    });

    //Behaviour for handling operator buttons
    $( '.operator' ).click( function() {
        opClicked = true;
        //If no past operator (e.g. after reset) set this as operator
        if( op === '' ) {
            op = this.id;
        }
        //Else if there's an operator but a calculation was just done, set to new operator and set numTwo to numOne to do operation on itself
        else if( op !== '' && eqClicked){
            op = this.id;
            numTwo = numOne;
            eqClicked = false;
        }
        //Else, calculate the previous equation then set this as the operator for next time
        else{
            calculate();
            op = this.id;
            numTwo = '';
            eqClicked = false;
        }

    });

    //Behaviour for handling equals button
    $( '.equals' ).click( function() {
        
        //So long as all 3 values exist, run the calculation
        if(numOne !== '' && numTwo !== '' && op !== ''){
            calculate();
            eqClicked = true;
        }

    });

    //Behaviour for handling clear button
    $( '.clear' ).click( function() {

        //Reset the calulator
        resetCalc();
        
    });

});

