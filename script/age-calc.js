const phases = [
    {
        length: 12,
        rate: 15
    },
    {
        length: 12,
        rate: 9
    },
    {
        length: 12 * 8,
        rate: 4,
    },
    {
        length: Infinity,
        rate: 3,
    }
];

export function calcAge(years = 0, months = 0) {
    let humanAge = (years * 12) + months;

    return phases.reduce((catsAge, { length, rate }) => {
        const phaseCatsAge = Math.min(humanAge > 0 ? humanAge : 0, length) * rate;
        
        humanAge -= length;

        return catsAge + phaseCatsAge;
    }, 0);
}

export function monthToYears(months) {
    return [
        Math.floor(months / 12),
        months % 12,
    ];
}