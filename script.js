document.addEventListener('DOMContentLoaded', function() {
    
    // DATA STRUCTURE FOR COUNTRY LAWS (Expanded and Verified)
    // Limits are in Per Mille (‰). Last verified October 2023.
    const countryLaws = {
        'ar': { name: 'Argentina', limit: 0.5, notes: 'Limit is 0.2‰ for motorcycles and 0.0‰ for new or professional drivers. Several provinces have a zero-tolerance law.' },
        'au': { name: 'Australia', limit: 0.5, notes: 'Zero tolerance (0.00‰) for learner, probationary, and professional drivers.' },
        'at': { name: 'Austria', limit: 0.5, notes: 'Limit is 0.1‰ for new drivers (first 2 years) and professional drivers.' },
        'be': { name: 'Belgium', limit: 0.5, notes: 'Limit is 0.2‰ for professional drivers.' },
        'br': { name: 'Brazil', limit: 0.0, notes: 'Strict zero-tolerance policy, known as "Lei Seca" (Dry Law).' },
        'bg': { name: 'Bulgaria', limit: 0.5, notes: 'Standard limit is 0.5‰.' },
        'ca': { name: 'Canada', limit: 0.8, notes: 'Criminal offense at 0.8‰. Most provinces issue warnings and license suspensions between 0.5‰ and 0.8‰.' },
        'cl': { name: 'Chile', limit: 0.3, notes: 'Chile has a "Zero Tolerance" law, with any BAC over 0.0‰ resulting in fines. Driving over 0.8‰ is a criminal offense.' },
        'cn': { name: 'China', limit: 0.2, notes: 'Driving with a BAC over 0.8‰ is a criminal offense.' },
        'hr': { name: 'Croatia', limit: 0.5, notes: 'Zero tolerance (0.00‰) for drivers under 24 and professional drivers.' },
        'cz': { name: 'Czech Republic', limit: 0.0, notes: 'Strict zero-tolerance policy for all drivers.' },
        'dk': { name: 'Denmark', limit: 0.5, notes: 'Standard limit with severe penalties for higher levels.' },
        'fi': { name: 'Finland', limit: 0.5, notes: 'The threshold for "aggravated drunk driving" is 1.2‰.' },
        'fr': { name: 'France', limit: 0.5, notes: 'Limit is lowered to 0.2‰ for new drivers (first 3 years).' },
        'de': { name: 'Germany', limit: 0.5, notes: 'Zero tolerance (0.00‰) for new drivers (first 2 years) and drivers under 21.' },
        'gr': { name: 'Greece', limit: 0.5, notes: 'Limit is lowered to 0.2‰ for new drivers and motorcyclists.' },
        'hu': { name: 'Hungary', limit: 0.0, notes: 'Strict zero-tolerance policy for all drivers.' },
        'in': { name: 'India', limit: 0.3, notes: 'Standard limit is 30mg of alcohol per 100ml of blood, which is 0.3‰.' },
        'ie': { name: 'Ireland', limit: 0.5, notes: 'Limit is lowered to 0.2‰ for new and professional drivers.' },
        'il': { name: 'Israel', limit: 0.5, notes: 'Limit is lowered to 0.1‰ for young, new, and professional drivers.' },
        'it': { name: 'Italy', limit: 0.5, notes: 'Limit is lowered to 0.0‰ for new drivers (first 3 years) and professional drivers.' },
        'jp': { name: 'Japan', limit: 0.3, notes: 'Japan has very strict enforcement and severe penalties for the driver, provider of the vehicle, and even passengers.' },
        'lt': { name: 'Lithuania', limit: 0.4, notes: 'Zero tolerance (0.00‰) for new and professional drivers.' },
        'lu': { name: 'Luxembourg', limit: 0.5, notes: 'Limit is 0.2‰ for new and professional drivers.' },
        'mx': { name: 'Mexico', limit: 0.8, notes: 'This is the federal limit. Many states, including Mexico City, have stricter limits, often 0.4‰. Always check local law.' },
        'nl': { name: 'Netherlands', limit: 0.5, notes: 'Limit is 0.2‰ for new drivers (first 5 years).' },
        'nz': { name: 'New Zealand', limit: 0.5, notes: 'Zero tolerance (0.00‰) for drivers under 20.' },
        'no': { name: 'Norway', limit: 0.2, notes: 'Norway has very strict drink-driving laws.' },
        'pl': { name: 'Poland', limit: 0.2, notes: 'Exceeding 0.5‰ is a criminal offense.' },
        'pt': { name: 'Portugal', limit: 0.5, notes: 'Limit is 0.2‰ for new and professional drivers.' },
        'ro': { name: 'Romania', limit: 0.0, notes: 'Strict zero-tolerance policy for all drivers.' },
        'ru': { name: 'Russia', limit: 0.3, notes: 'Technically the limit is 0.16 mg/L of alcohol in exhaled air, which roughly corresponds to 0.3‰ BAC.' },
        'sk': { name: 'Slovakia', limit: 0.0, notes: 'Strict zero-tolerance policy for all drivers.' },
        'za': { name: 'South Africa', limit: 0.5, notes: 'Proposed legislation aims to reduce the limit to 0.0‰. Always check current law.' },
        'kr': { name: 'South Korea', limit: 0.3, notes: 'Penalties are severe and a second offense can lead to license revocation.' },
        'es': { name: 'Spain', limit: 0.5, notes: 'Limit is lowered to 0.3‰ for new and professional drivers.' },
        'se': { name: 'Sweden', limit: 0.2, notes: 'Sweden has very strict drink-driving laws.' },
        'ch': { name: 'Switzerland', limit: 0.5, notes: 'Limit is lowered to 0.1‰ for new and professional drivers.' },
        'th': { name: 'Thailand', limit: 0.5, notes: 'Limit is 0.2‰ for drivers with a license for less than 5 years.' },
        'tr': { name: 'Turkey', limit: 0.5, notes: 'Zero tolerance (0.00‰) for commercial drivers. Private drivers are prohibited from driving with any alcohol if with passengers.' },
        'gb-eng': { name: 'UK (England, Wales, NI)', limit: 0.8, notes: 'One of the highest limits in Europe.' },
        'gb-sct': { name: 'UK (Scotland)', limit: 0.5, notes: 'Scotland has a lower limit than the rest of the UK.' },
        'us': { name: 'United States', limit: 0.8, notes: 'Zero tolerance (0.00-0.02‰) for drivers under 21. Commercial drivers limit is typically 0.4‰.' },
    };

    // DYNAMICALLY POPULATE THE COUNTRY DROPDOWN
    const countrySelect = document.getElementById('country');
    // Get sorted country names
    const sortedCountries = Object.keys(countryLaws).sort((a, b) => countryLaws[a].name.localeCompare(countryLaws[b].name));
    
    sortedCountries.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = countryLaws[key].name;
        countrySelect.appendChild(option);
    });
    // Let's set the default to a major country, e.g., US
    countrySelect.value = 'us';

    // GET REFERENCES TO OTHER HTML ELEMENTS
    const form = document.getElementById('bac-form');
    const errorMessage = document.getElementById('error-message');
    const resultsDiv = document.getElementById('results');
    const alcoholGramsSpan = document.getElementById('alcohol-grams');
    const peakBacSpan = document.getElementById('peak-bac');
    const statusMessageDiv = document.getElementById('status-message');
    const lawNotesP = document.getElementById('law-notes');

    // FORM SUBMISSION EVENT LISTENER
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // --- ROBUST INPUT VALIDATION ---
        const weightKg = parseFloat(document.getElementById('weight').value);
        const volumeMl = parseFloat(document.getElementById('volume').value);
        const abv = parseFloat(document.getElementById('abv').value);
        const hours = parseFloat(document.getElementById('hours').value);

        if (isNaN(weightKg) || weightKg <= 0) {
            errorMessage.textContent = 'Please enter a valid, positive number for weight.';
            resultsDiv.style.display = 'none'; // Hide old results
            return;
        }
        if (isNaN(volumeMl) || volumeMl <= 0) {
            errorMessage.textContent = 'Please enter a valid, positive number for drink volume.';
            resultsDiv.style.display = 'none';
            return;
        }
        if (isNaN(abv) || abv < 0 || abv > 100) {
            errorMessage.textContent = 'Please enter a valid ABV percentage (0-100).';
            resultsDiv.style.display = 'none';
            return;
        }
        if (isNaN(hours) || hours < 0) {
            errorMessage.textContent = 'Please enter a valid, non-negative number for hours.';
            resultsDiv.style.display = 'none';
            return;
        }
        // If all checks pass, clear any previous error message
        errorMessage.textContent = '';


        // --- GET REMAINING INPUTS ---
        const selectedCountryKey = countrySelect.value;
        const sex = document.getElementById('sex').value;
        
        // --- DEFINE CONSTANTS & LOOK UP LAW ---
        const ethanolDensity = 0.789;
        const widmarkFactor = (sex === 'female') ? 0.55 : 0.68;
        const eliminationRate = 0.15;
        const law = countryLaws[selectedCountryKey];

        // --- PERFORM CALCULATIONS ---
        const alcoholMassGrams = (volumeMl * (abv / 100)) * ethanolDensity;
        const peakBac = alcoholMassGrams / (weightKg * widmarkFactor);
        const currentBac = Math.max(0, peakBac - (eliminationRate * hours));

        // --- DISPLAY RESULTS ---
        alcoholGramsSpan.textContent = alcoholMassGrams.toFixed(2);
        peakBacSpan.textContent = peakBac.toFixed(2);
        
        let statusText = '';
        statusMessageDiv.className = 'status';

        if (currentBac > law.limit) {
            statusText = `<strong>${currentBac.toFixed(2)}‰</strong> - OVER the legal limit in ${law.name} of ${law.limit}‰. Do not drive.`;
            statusMessageDiv.classList.add('danger');
        } else if (currentBac > 0.005) { // Check if BAC is not effectively zero
            statusText = `<strong>${currentBac.toFixed(2)}‰</strong> - Under the ${law.name} legal limit (${law.limit}‰), but impairment still exists. Driving is not recommended.`;
            statusMessageDiv.classList.add('warning');
        } else {
            statusText = `<strong>0.00‰</strong> - Alcohol has likely been fully metabolized.`;
            statusMessageDiv.classList.add('safe');
        }
        
        statusMessageDiv.innerHTML = statusText;
        lawNotesP.textContent = `Note: ${law.notes}`;
        resultsDiv.style.display = 'block';
    });
});