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


// Add buttons to cards for collapsing/expanding
const cards = document.getElementsByClassName("service-card");

for (let i = 0; i <= cards.length - 1; i++) {

  // Add fade to text description; <div class="fade"></div>
  let newFade = document.createElement('div');
  newFade.className = 'fade';
  cards[i].lastElementChild.appendChild(newFade);

  // Add button; <a class="service-card-button expanded">Read more</a>
  let newButton = document.createElement('a');
  newButton.className = 'service-card-button expanded';
  cards[i].appendChild(newButton);

  // Set card to collapsed state
  collapseCard(
    cards[i].parentNode,                                            // Container
    cards[i].firstElementChild.nextElementSibling,                  // Description
    cards[i].firstElementChild.nextElementSibling.lastElementChild, // Fade
    cards[i].lastElementChild                                       // Button
  );
}

// Toggle collapsed/expanded styles of cards
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
