import { getRandomFact } from './fact.js';
import { calcAge, monthToYears } from './age-calc.js';

const $randomFactContainers = document.getElementsByClassName('fact');

[...$randomFactContainers].forEach($el => {
    $el.innerText = getRandomFact();
});

const $modalClose = document.getElementsByClassName('modal-close');

[...$modalClose].forEach($el => {
    $el.addEventListener('click', closeModal);
});

const $modalOpen = document.getElementsByClassName('modal-open');

[...$modalOpen].forEach($el => {
    $el.addEventListener('click', openModal);
});

const $calcAgeInput = document.getElementsByClassName('calcAgeInput');
const $calcYears = document.getElementById('calcYears');
const $calcMonths = document.getElementById('calcMonths');
const $calcButton = document.getElementById('calculate');
const $calcResult = document.getElementById('calcResult');

[...$calcAgeInput].forEach($el => {
    $el.addEventListener('keypress', preventNonNumbers);
});

if ($calcButton) {
    $calcButton.addEventListener('click', updateAge);
}

const $modal = document.getElementById('modal');

function closeModal() {
    if ($modal) {
        $modal.classList.remove('modal--show');
    }
}

function openModal() {
    if ($modal) {
        $modal.classList.add('modal--show');
    }
}

function updateAge() {
    const years = Number($calcYears && $calcYears.value || 0);
    const months = Number($calcMonths && $calcMonths.value || 0);

    if (!$calcResult) {
        return;
    }

    if (!years && !months) {
        $calcResult.innerText = null;

        return;
    }

    const catsAge = calcAge(years, months);
    const [catYears, catMonths] = monthToYears(catsAge);

    $calcResult.innerText = `Вашему коту ${catYears} лет ${catMonths} месяцев`;
}

function preventNonNumbers(e) {
    const char = parseInt(e.key);
    if (!char && char !== 0) {
        e.preventDefault();

        return;
    }
}