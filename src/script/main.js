import { getRandomFact } from './fact.js';

const $randomFactContainers = document.getElementsByClassName('fact');

[...$randomFactContainers].forEach($el => {
    $el.innerText = getRandomFact();
});
