class Form {

  constructor (formFields) {
    this.formFields = {
      $form: $(formFields['$form']),
      $inputName: $(formFields['$inputName']),
      $inputEmail: $(formFields['$inputEmail']),
      $inputPhone: $(formFields['$inputPhone']),
      $inputRadios: $(formFields['$inputRadios']),
      $inputMessage: $(formFields['$inputMessage']),
      $inputGDPR: $(formFields['$inputGDPR']),
      $inputSubmitButton: $(formFields['$inputSubmitButton']),
      $required: $(formFields['$required']),
      $output: $(formFields['$output'])
    }

    this.errorMessages = {
      emptyFields: 'Oops! Looks like one or more required fields (marked by *) are empty.',
      invalidEmail: 'Oops! Please check the email address you\'ve entered is correct.',
      noRadioSelected: 'Please pick a reason for your enquiry (if you\'re unsure, choose "Something Else").',
      notCheckedGDPR: 'To get in contact, please accept our GDPR statement.'
    }
  }


  validate() {
    let formErrors = [];                           // Empty array of errors
    let outputErrorMessage = '';


    //===== VALIDATE GDPR CHECKBOX CHECKED =====
    if (!this.formFields.$inputGDPR.is(':checked')) {
      outputErrorMessage = this.errorMessages['notCheckedGDPR'];
      formErrors.push('GDPR Checkbox not checked');
    }


    //===== VALIDATE RADIO BUTTON CHECKED =====
    let checked = false;

    this.formFields.$inputRadios.each(
      function() {
        if ($(this).is(':checked')) {              // If a radio is checked
          checked = true;                          // set checked to true
        }
      }
    );

    if (!checked) {
      outputErrorMessage = this.errorMessages['noRadioSelected'];
      formErrors.push('No radio button selected');
    }


    //===== VALIDATE EMAIL ADDRESS =====
    const reEmail = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}');

    if (!reEmail.test(this.formFields.$inputEmail.val().toUpperCase())) {
      outputErrorMessage = this.errorMessages['invalidEmail'];
      formErrors.push('Invalid email');
    }


    //===== VALIDATE REQUIRED FIELDS =====
    let numRequiredFields = this.formFields.$required.length;
    let numberOfEmpty = 0;

    if (numRequiredFields >= 1) {
      this.formFields.$required.each(
        function(i, element) {
          if (!$(this).val()) {                    // If any of fields are empty,
            numberOfEmpty++;                       // + 1 to number of empty fields
          }
        }
      );
    }

    if (numberOfEmpty >= 1) {
      outputErrorMessage = this.errorMessages['emptyFields'];
      formErrors.push(`${numberOfEmpty}/${numRequiredFields} fields empty`);
    }


    //===== DISPLAY ANY ERROR MESSAGES =====
    this.formFields.$output.css('color', '#FF0000');

    if (formErrors.length >= 1) {
      this.formFields.$output.text(outputErrorMessage);       // Set error message to the first error caught
    } else {
      this.formFields.$output.text('');                       // Clear any error message that was displayed
    }
    return formErrors;
  }


  formSubmit () {
    let submitted = false;

    this.formFields.$form.submit(
      function(event) {

        // Stop the form submission from taking place when it usually would
        event.preventDefault();

        //===== PERFORM reCAPTCHA =====
        grecaptcha.ready(function() {
          grecaptcha.execute(
            '6LdLz0YaAAAAANKr8Jaa68zNJtqSHdF3x3FBAQl5',
            {action: 'submit'}
          ).then(function(token) {
            // Logic to submit to backend server
            console.log('Placeholder for backend form submit');

            // Set success message
            submitted = true;
            this.formFields.$output.css('color', '#008800');
            this.formFields.$output.text('Your message was sent successfully! We\'ll be in touch');
          });
        });
      }
    );

    // Placeholder to mimic succesfull submit
    submitted = true;
    this.formFields.$output.css('color', '#008800');
    this.formFields.$output.text('Your message was sent successfully! We\'ll be in touch');
    //

    return submitted;
  }


  clearFields() {
    this.formFields.$inputName.val('');
    this.formFields.$inputEmail.val('');
    this.formFields.$inputPhone.val('');
    this.formFields.$inputMessage.val('');

    this.formFields.$inputRadios.each(function() {
      $(this).prop('checked', false);
    });
    this.formFields.$inputGDPR.prop('checked', false);
  }

}  // End of Form() {}


const $button = $('#form-submit-button');

$button.click(
  function() {
    const formData = new Form(
      {
        $form: '#form',
        $inputName: '#form-name-input',
        $inputEmail: '#form-email-input',
        $inputPhone: '#form-phone-input',
        $inputRadios: ':radio',
        $inputMessage: '#form-text-input',
        $inputGDPR: '#form-gdpr-checkbox',
        $inputSubmitButton: '#form-submit-button',
        $required: '.required-input[type="text"], .required-input[type="email"]',
        $output: '#form-submit-error > span'
      }
    );

    const validity = formData.validate();

    if (validity.length === 0) {
      const submitted = formData.formSubmit();

      if (submitted) {
        formData.clearFields();
      }  // NTD - If not succesfully submitted display an error
    }
  }
);
