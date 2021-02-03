function checkEmptyFields (requiredFields) {
  /**
   * Checks input fields contain text
   *
   * @param {collection} requiredFields - a collection of DOM elements (input fields)
   * @returns {bool} - if any fields are empty returns true, else returns false
   */

  for (let i = 0; i <= requiredFields.length - 1; i++) {  // For required field
    let inputField = requiredFields[i];
    let inputType = inputField.getAttribute('type');

    if (inputType === 'text' || inputType === 'email') {
      if (!inputField.value) {                            // If a field is empty,
        return true;                                      // Returns true (automatically exiting loop and function)
      }
    }
  }
  return false;                                           // If no fields found to be empty, returns false
}


function checkRadios (requiredRadios) {
  /**
   * Checks one of the radio buttons is selected
   *
   * @param {collection} requiredRadios - a collection of DOM elements (input fields with type='radio')
   * @returns {bool} - if any radio button is selected returns true, else returns false
   */

  for (let i = 0; i <= requiredRadios.length - 1; i++) {  // For required field
    let inputRadio = requiredRadios[i];
    if (inputRadio.checked) {                             // If a radio is checked
      return true;                                        // returns true (exiting the loop and function)
    }
  }
  return false;                                           // If none selected, returns false
}


function checkGDPR (checkbox) {
  /**
   * Checks user has accepted the GDPR statement
   *
   * @param {element} checkbox - a checkbox DOM element, to test if checked
   * @returns {bool} - if checked returns true, else returns false
   */

   if (checkbox.checked) {
     return true;
   } else {
     return false;
   }
}


// Get button for submit
const button = document.getElementById('form-submit-button');

// Get radio button input options
const radios = document.getElementsByClassName('form-radio-option');

// Get GDPR checkbox
const checkbox = document.getElementById('form-gdpr-checkbox');

// Get required fields
const fields = document.getElementsByClassName('required-input');

// On button click, check if any required fields/selections are empty.
button.addEventListener('click', () => {
  // Need some sort of flow control -
  // next function only called if
  // first function returns false

  const emptyFields = checkEmptyFields(fields);

  if (emptyFields) {
    console.log('One or more fields are empty');
  } else {
    console.log('No fields are empty');
  }


  const selectedEnquiryType = checkRadios(radios);

  if (!selectedEnquiryType) {
    console.log('No radio buttons have been checked');
  } else {
    console.log('A radio button has been checked');
  }


  const acceptedGDPR = checkGDPR(checkbox);

  if (!acceptedGDPR) {
    console.log('GDPR checkbox has NOT been checked');
  } else {
    console.log('GDPR accepted');
  }
});
