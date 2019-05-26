import { getRandomFact } from './fact.js';
import { calcAge } from './age-calc.js';

const $randomFactContainers = document.getElementsByClassName('fact');

[...$randomFactContainers].forEach($el => {
    $el.innerText = getRandomFact();
});