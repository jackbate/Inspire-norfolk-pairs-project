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


function validateEmailAddress (emailField) {
  /**
   * Validates text on the email fields is an address
   *
   * @param {string} emailField - the value on the input field (type 'email') DOM element
   * @returns {bool} - if valid email returns true, else if invalid returns false
   */

   const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

   emailAddress = reEmail.test(emailField.value.toUpperCase());

   if (emailAddress) {
     return true;
   } else {
     return false;
   }
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

   if (checkbox.checked) {                                // If GDPR is checked
     return true;                                         // returns true
   } else {                                               // If GDPR is not checked
     return false;                                        // returns false
   }
}


//=============================================
// PERFORM VALIDATION ON SUBMIT BUTTON CLICKED
//=============================================

// Get button for submit
const button = document.getElementById('form-submit-button');

// Add a blank error message after the button
const errorContainer = document.getElementById('form-submit-error');
const errorMessage = document.createElement('span');

errorMessage.display = 'inline';
errorMessage.style.verticalAlign = 'middle';

errorContainer.appendChild(errorMessage);


// On button click, check if any required fields/selections are empty.
button.addEventListener('click', () => {
  //====================
  // CHECK INPUT FIELDS
  //====================

  // Get required fields
  let fields = document.getElementsByClassName('required-input');

  // Check fields are populated
  const emptyFields = checkEmptyFields(fields);

  //========================
  // VALIDATE EMAIL ADDRESS
  //========================

  // Get text on email address field
  const emailField = document.getElementById('form-email-input');

  // Check email address is valid
  const validEmail = validateEmailAddress(emailField);

  //==================================
  // CHECK A RADIO BUTTON IS SELECTED
  //==================================

  // Get radio button input options
  let radios = document.getElementsByClassName('form-radio-option');

  // Check a radio button is selected
  const selectedEnquiryType = checkRadios(radios);

  //=================================
  // CHECK GDPR CHECKBOX IS SELECTED
  //=================================

  // Get GDPR checkbox
  let checkbox = document.getElementById('form-gdpr-checkbox');

  // Check the checkbox is checked
  const acceptedGDPR = checkGDPR(checkbox);

  //=========================
  // PERFORM FORM VALIDATION
  //=========================

  let errorString = '';
  errorMessage.style.color = '#FF0000';  // Red for error

  if (emptyFields) {
    errorString += 'Oops! Looks like one or more required fields (marked by *) are empty.';
  } else if (!validEmail) {
    errorString += 'Oops! Please check the email address you\'ve entered is correct.';
  } else if (!selectedEnquiryType) {
    errorString += 'Please pick a reason for your enquiry (if you\'re unsure, choose "Something Else").';
  } else if (!acceptedGDPR) {
    errorString += 'To get in contact, please accept our GDPR statement.';
  } else {

    // Clear fields
    for (let i = 0; i <= fields.length - 1; i++) {  // For required field
      fields[i].value = '';
    }

    document.getElementById('form-phone-input').value = '';

    for (let i = 0; i <= radios.length - 1; i++) {  // For required field
      radios[i].checked = false;
    }
    checkbox.checked = false;

    // Set success message
    errorMessage.style.color = '#008800';  // Red for error
    errorString += 'Your message was sent successfully! We\'ll be in touch.';
  }

  // Display the error/success message
  errorMessage.textContent = errorString;
});
