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


// Get button for submit
const $button = $('#form-submit-button');

// Add a blank error message after the button
const $errorMessage = $('#form-submit-error > span');

// Get the form
const $form = $('#form');


$button.click(function() {
  //=========================
  // PERFORM FORM VALIDATION
  //=========================
  let $requiredFields = $('.required-input[type="text"], .required-input[type="email"]');
  let $emailInput = $('#form-email-input');
  let $radios = $(':radio');
  let $checkbox = $('#form-gdpr-checkbox')

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

    $form.submit(function(event) {

      // Stop the form submission from taking place when it usually would
      event.preventDefault();

      //===================
      // PERFORM reCAPTCHA
      //===================
      grecaptcha.ready(function() {
        grecaptcha.execute(
          '6LdLz0YaAAAAANKr8Jaa68zNJtqSHdF3x3FBAQl5',
          {action: 'submit'}
        ).then(function(token) {
          // Logic to submit to backend server
          console.log('Placeholder for backend form submit');
        });
      });
    });

    //=====================
    // SET SUCCESS MESSAGE
    //=====================
    $errorMessage.css('color', '#008800');
    errorString += 'Your message was sent successfully! We\'ll be in touch.';

    //==============
    // CLEAR FIELDS
    //==============
    $requiredFields.each(function() {
      $(this).val('');
    });

    $('#form-phone-input').val('');

    $radios.each(function() {
      $(this).prop('checked', false);
    });

    $checkbox.prop('checked', false);
  }  // End of else statement

  //===============================
  // DISPLAY ERROR/SUCCESS MESSAGE
  //===============================
  $errorMessage.text(errorString);

});  // End of button click event
