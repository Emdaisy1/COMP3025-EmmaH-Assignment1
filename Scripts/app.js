/**
    File: app.js
    Author: Emma Hilborn (200282755)
    Date: Jan 31, 2017
    App description: A basic calculator web app done with JQuery Mobile & JavaScript
*/

$(document).ready(function() {

    //Set up variables
    var numOne;
    var numTwo;
    var op;
    var numOneSet;
    var postCalc;
    var opClicked;
    var eqClicked;
    var error;
    var $currentDisplay = $('#calcDisplay');

    /**
     * Clears the calculator
     * @param none
     * @return none
     */
    function resetCalc() {
        numOne = '';
        numTwo = '';
        op = '';
        numOneSet = false;
        postCalc = false;
        opClicked = false;
        eqClicked = false;
        error = false;
        $currentDisplay.val('0');
        $( '.ui-btn' ).prop('disabled', false);
    }

    /**
     * Calculates the current answer
     * @param none
     * @return none
     */
    function calculate() {
        
        //Parse number variables to floats
        numOne = parseFloat(numOne);
        numTwo = parseFloat(numTwo);

        //Determine calculation to run via ID of operator
        if( op == 'add' ) {
            numOne = numOne + numTwo;
        }
        else if( op == 'subtract' ) {
            numOne = numOne - numTwo;
        }
        else if( op == 'multiply' ) {
            numOne = numOne * numTwo;
        }
        else {
            //Throw error and ask to be reset if attempt to divide by 0
            if( numTwo == 0 ) {
                error = true;
            }
            //If not diving by 0, run calculation
            else{
                numOne = numOne / numTwo;
            }
        }

        //If there was a divide by 0 error inform user and prompt to reset
        if( error == true ) {
            $currentDisplay.val('Cannot divide by 0. Please clear calculator.');
            $( '.ui-btn' ).prop('disabled', true);
            $( '.clear' ).prop('disabled', false);
        }
        //Else move on to update display
        else {
            //If the display for the number is too long, set the display to be cut off at 15 decimal points
            if( numOne.length > 18 ) {
                numOneDisplay = parseFloat(numOne).toFixed(15);
            }
            //Else, display normally
            else{
                numOneDisplay = numOne;
            }
            //Update the display
            $currentDisplay.val(numOneDisplay);
            //Set calculator so that it knows a calculation just occured and no operator has been chosen yet
            postCalc = true;
            opClicked = false;
        }

    }

    //"Reset" calculator on start
    resetCalc();

    /**
     * Handles behaviour for number and decimal buttons
     * @param .number class button clicked
     * @return none
     */
    $( '.number' ).click( function() {

        //If no operator has been chosen and = was just clicked, assume user is starting new calculation        
        if( !opClicked && eqClicked ) {
            numOne = '';
            numTwo = '';
            op = '';
            eqClicked = false;
        }
        //If an operator has been chosen, and a calculation was run, reset num 2 to work with
        if( opClicked && postCalc ) {
            numTwo = '';
        }

        //Revert postCalc to false as a calculation was no longer the last thing run
        postCalc = false;
        //If an operator has been clicked but number 1 has not been set, then set it as number two
        if( op !== '' && numOne === '' ) {
            numOne = '0';
            //If they tried to add a decimal and one already exists, do nothing
            if( this.id == '.' && numTwo.indexOf('.') > -1 ) {
                //Do nothing
            }
            //Else, append the number/decimal point
            else{
                numTwo = numTwo + this.id;
                $currentDisplay.val(numTwo);
            }
        }
        //If an operator has been clicked, and number 1 has been set, then set it as number two
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

    /**
     * Handles behaviour for operator buttons
     * @param .operator class button clicked
     * @return none
     */
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

    /**
     * Handles behaviour for equals button
     * @param .equals class button clicked
     * @return none
     */
    $( '.equals' ).click( function() {
        
        //So long as all 3 values exist, run the calculation
        if( numOne !== '' && numTwo !== '' && op !== '' ) {
            calculate();
            eqClicked = true;
        }
        //If num 1 (previous answer) & op exist, but no num 2, assign num 2 to 1 and run calculation on itself
        else if( op !== '' && numTwo == '' ) {
            numTwo = numOne;
            calculate();
            eqClicked = true;
        }

    });

    /**
     * Handles behaviour for clear button
     * @param .clear class button clicked
     * @return none
     */
    $( '.clear' ).click( function() {

        //Reset the calulator
        resetCalc();
        
    });

});

