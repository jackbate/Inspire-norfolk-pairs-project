function emptyFields ($requiredFields) {
  /**
   * Checks input fields contain text
   *
   * @param {collection} $requiredFields - jQuery collection of DOM elements (input fields)
   * @returns {bool} - if any fields are empty returns true, else returns false
   */

  let isEmpty = false;                         // Default assume fields have text on them

  $requiredFields.each(function(i, element) {
    if (!$(this).val()) {                      // If any of fields are empty,
      isEmpty = true;                          // set isEmpty to true
    }
  });

  return isEmpty;
}


function invalidEmailAddress ($emailField) {
  /**
   * Validates text on the email fields is an address
   *
   * @param {element} $emailField - the jQuery DOM element that is an input field of type email
   * @returns {bool} - if valid email returns false, else if invalid returns true
   */

   const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

   emailAddress = reEmail.test($emailField.val().toUpperCase());

   if (emailAddress) {
     return false;
   } else {
     return true;
   }
}


function noRadioSelected ($requiredRadios) {
  /**
   * Checks one of the radio buttons is selected
   *
   * @param {collection} $requiredRadios - a jQuery collection of DOM elements (input fields with type='radio')
   * @returns {bool} - if any radio button is selected returns false, else returns true
   */

  let noneChecked = true;                      // Default assume radio checked
  $requiredRadios.each(function() {
    if ($(this).is(':checked')) {              // If a radio is checked
      noneChecked = false;                     // set isChecked to true
    }
  });

  return noneChecked;
}


function notCheckedGDPR ($checkbox) {
  /**
   * Checks user has accepted the GDPR statement
   *
   * @param {element} $checkbox - a jQuery checkbox DOM element, to test if checked
   * @returns {bool} - if checked returns true, else returns false
   */

   if ($checkbox.is(':checked')) {             // If GDPR is checked
     return false;                             // returns false
   } else {                                    // If GDPR is not checked
     return true;                              // returns true
   }
}


//=============================================
// PERFORM VALIDATION ON SUBMIT BUTTON CLICKED
//=============================================

// Get button for submit
const $button = $('#form-submit-button');

// Add a blank error message after the button
const $errorMessage = $('#form-submit-error > span');

// On button click, check if any required fields/selections are empty.
$button.click(function() {

  //====================
  // CHECK INPUT FIELDS
  //====================

  // Check fields are populated
  let $requiredFields = $('.required-input[type="text"], .required-input[type="email"]');

  //========================
  // VALIDATE EMAIL ADDRESS
  //========================

  // Validate email address
  let $emailInput = $('#form-email-input');

  //==================================
  // CHECK A RADIO BUTTON IS SELECTED
  //==================================

  // Check a radio button is selected
  let $radios = $(':radio');

  //=================================
  // CHECK GDPR CHECKBOX IS SELECTED
  //=================================

  // Check the checkbox is checked
  let $checkbox = $('#form-gdpr-checkbox')

  //=========================
  // PERFORM FORM VALIDATION
  //=========================

  let errorString = '';
  $errorMessage.css('color', '#FF0000');

  if (emptyFields($requiredFields)) {
    errorString += 'Oops! Looks like one or more required fields (marked by *) are empty.';
  } else if (invalidEmailAddress($emailInput)) {
    errorString += 'Oops! Please check the email address you\'ve entered is correct.';
  } else if (noRadioSelected($radios)) {
    errorString += 'Please pick a reason for your enquiry (if you\'re unsure, choose "Something Else").';
  } else if (notCheckedGDPR($checkbox)) {
    errorString += 'To get in contact, please accept our GDPR statement.';
  } else {

    // Clear fields
    $requiredFields.each(function() {
      $(this).val('');
    });

    $('#form-phone-input').val('');

    $radios.each(function() {
      $(this).prop('checked', false);
    })

    $checkbox.prop('checked', false);

    // Set success message
    $errorMessage.css('color', '#008800');
    errorString += 'Your message was sent successfully! We\'ll be in touch.';
  }

  // Display the error/success message
  $errorMessage.text(errorString);
});
