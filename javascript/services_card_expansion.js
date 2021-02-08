
// COLLAPSED:

function collapseCard (container, description, fade, button) {
  container.style.margin = '35px auto';
  container.style.padding = '0 15px';
  container.style.minWidth = '0';

  description.style.maxHeight = '120px';  // 5 * line height
  fade.style.visibility = 'visible';

  button.textContent = 'Read More';

  button.classList.remove('expanded');
  button.classList.add('collapsed');

}

// EXPANDED:

function expandCard (container, description, fade, button) {
  container.style.margin = '35px 0';
  container.style.padding = '0';
  container.style.minWidth = '100%';

  description.style.maxHeight = 'max-content';
  fade.style.visibility = 'hidden';

  button.textContent = 'Read Less';

  button.classList.remove('collapsed');
  button.classList.add('expanded');
}


const buttons = document.getElementsByClassName('service-card-button');
const fades = document.getElementsByClassName('fade');

for (let i = 0; i <= buttons.length - 1; i++) {
  let cardButton = buttons[i];
  let cardTextFade = fades[i];
  cardButton.addEventListener('click', () => {

    let cardBody = cardButton.parentNode;
    let cardContainer = cardBody.parentNode;
    let cardDescription = cardButton.previousElementSibling;

    if (cardButton.classList.contains('collapsed')) {
      expandCard(
        cardContainer,
        cardDescription,
        cardTextFade,
        cardButton);
    } else {
      collapseCard(
        cardContainer,
        cardDescription,
        cardTextFade,
        cardButton);
    }
  });
}








/*
const buttons = document.getElementsByClassName('service-card-button');
const fades = document.getElementsByClassName('fade');

for (let i = 0; i <= buttons.length - 1; i++) {
  let cardButton = buttons[i];
  let cardTextFade = fades[i];
  cardButton.addEventListener('click', () => {

    let cardBody = cardButton.parentNode;
    let cardContainer = cardBody.parentNode;
    let cardDescription = cardButton.previousElementSibling;

    if (cardButton.classList.contains('untoggled')) {
      // Set expanded card styles
      cardContainer.style.minWidth = '100%';
      cardContainer.style.margin = '35px 0';
      cardContainer.style.padding = '0';
      cardDescription.style.maxHeight = 'max-content';
      cardTextFade.style.visibility = 'hidden';
      cardButton.textContent = 'Read Less';

      // Set the button class to button toggled
      cardButton.classList.remove('untoggled');
      cardButton.classList.add('toggled');

    } else {
      // Reset card styles
      cardContainer.style.minWidth = '';
      cardContainer.style.margin = '35px auto';
      cardContainer.style.padding = '0 15px';
      cardDescription.style.maxHeight = '120px';
      cardTextFade.style.visibility = 'visible';
      cardButton.textContent = 'Read More';

      // Set the button class to button untoggled
      cardButton.classList.remove('toggled');
      cardButton.classList.add('untoggled');
    }
  });
}
*/
