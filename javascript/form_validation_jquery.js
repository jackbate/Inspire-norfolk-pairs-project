function checkEmptyFields ($requiredFields) {

  $requiredFields.each(() => {  // For required field

    console.log($(this).text());

    if (!$(this).val()) {
      console.log("EMPTY");
    } else {
      console.log("NOT EMPTY");
    }

    //if (true) {
    //  if ($(this).val() === '') {                            // If a field is empty,
    //    return true;                                      // Returns true (automatically exiting loop and function)
  //    }
  //  }
  });

  return false;                                           // If no fields found to be empty, returns false
}


function validateEmailAddress ($emailField) {
   const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

   emailAddress = reEmail.test($emailField.val().toUpperCase());

   if (emailAddress) {
     return true;
   } else {
     return false;
   }
}


function checkRadios ($requiredRadios) {
  $requiredRadios.each(() => {  // For required field
    if ($(this).is(':checked')) {                             // If a radio is checked
      return true;                                        // returns true (exiting the loop and function)
    }
  });

  return false;                                           // If none selected, returns false
}


function checkGDPR ($checkbox) {
   if ($checkbox.is(':checked')) {                                // If GDPR is checked
     return true;                                         // returns true
   } else {                                               // If GDPR is not checked
     return false;                                        // returns false
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
$button.click(() => {
  //====================
  // CHECK INPUT FIELDS
  //====================

  // Get required fields
  let $fields = $('.required-input[type="text"], .required-input[type="email"]');

  // Check fields are populated
  const emptyFields = checkEmptyFields($fields);

  //========================
  // VALIDATE EMAIL ADDRESS
  //========================

  // Get text on email address field
  const $emailField = $('#form-email-input');

  // Check email address is valid
  const validEmail = validateEmailAddress($emailField);

  //==================================
  // CHECK A RADIO BUTTON IS SELECTED
  //==================================

  // Get radio button input options
  let $radios = $(':radio');  // NTD - if works get rid of .form-radio-option class

  // Check a radio button is selected
  const selectedEnquiryType = checkRadios($radios);

  //=================================
  // CHECK GDPR CHECKBOX IS SELECTED
  //=================================

  // Get GDPR checkbox
  let $checkbox = $('#form-gdpr-checkbox');  // NTD Could use :checkbox

  // Check the checkbox is checked
  const acceptedGDPR = checkGDPR($checkbox);

  //=========================
  // PERFORM FORM VALIDATION
  //=========================

  let errorString = '';
  $errorMessage.css('color', '#FF0000');  // Red for error

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
    $fields.each(() => {
      $(this).val('');
    });

    $('#form-phone-input').val('');

    $radios.each(() => {
      $(this).prop('checked', false);
    })

    // Set success message
    $errorMessage.css('color', '#008800');
    errorString += 'Your message was sent successfully! We\'ll be in touch.';
  }

  // Display the error/success message
  $errorMessage.text(errorString);
});
