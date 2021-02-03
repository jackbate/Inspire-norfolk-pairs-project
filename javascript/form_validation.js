function checkEmptyFields (requiredFields) {
  /**
   * Checks input fields contain text
   *
   * @param {collection} requiredFields - a collection of DOM elements (input fields)
   * @returns {bool} if any fields are empty returns true, else returns false
   */

  for (let i = 0; i <= requiredFields.length - 1; i++) {            // For required field
    let inputField = requiredFields[i];
    let inputType = inputField.getAttribute('type');

    if (inputType === 'text' || inputType === 'email') {
      if (!inputField.value) {                                      // If a field is empty,
        return true;                                                // Returns true (automatically exiting loop and function)
      }
    }
  }
  return false;                                                      // If no fields found to be empty, returns false
}



function checkGDPR (checkbox) {
  /**
   * Checks user has accepted the GDPR statement
   *
   * @param {element} checkbox - a checkbox DOM element, to test if checked
   * @returns {bool} if checked returns true, else returns false
   */
}



// Get button for submit
const button = document.getElementById('form-submit-button');

// Get required fields
const required = document.getElementsByClassName('required-input');

// On button click, check if any fields are empty
button.addEventListener('click', () => {
  const emptyFields = checkEmptyFields(required);

  if (emptyFields) {
    console.log('One or more fields are empty');
  } else {
    console.log('No fields are empty');
  }
});
