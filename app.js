// ===========================
// PEDIATRIC DRUG CALCULATOR
// Application Logic
// ===========================

// Global State
let currentStep = 1;
let drugsList = [];
let selectedDrug = null;
let selectedDrugData = null;
let calculationState = {
    drugName: '',
    indication: null,
    customDose: null,
    weight: null,
    ageGroup: '',
    formulation: '',
    concentration: null,
    customConcentration: null
};

// DOM Elements
const steps = {
    search: document.getElementById('step-search'),
    indication: document.getElementById('step-indication'),
    weight: document.getElementById('step-weight'),
    formulation: document.getElementById('step-formulation'),
    concentration: document.getElementById('step-concentration'),
    results: document.getElementById('step-results')
};

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
    await loadDrugsList();
    initializeEventListeners();
    showStep(1);
});

// Load drugs list from JSON
async function loadDrugsList() {
    try {
        const response = await fetch('data/drugs-list.json');
        drugsList = await response.json();
        populateDrugDropdown();
    } catch (error) {
        console.error('Error loading drugs list:', error);
        alert('Error loading drug database. Please refresh the page.');
    }
}

// Populate drug dropdown
function populateDrugDropdown() {
    const select = document.getElementById('drug-select');
    drugsList.forEach(drug => {
        const option = document.createElement('option');
        option.value = drug.id;
        option.textContent = `${drug.name} ${drug.verified ? '🟢' : '🟡'}`;
        select.appendChild(option);
    });
}

// ===========================
// EVENT LISTENERS
// ===========================

function initializeEventListeners() {
    // Step 1: Drug Search
    document.getElementById('drug-search').addEventListener('input', handleSearchInput);
    document.getElementById('drug-select').addEventListener('change', handleDrugSelection);
    document.getElementById('btn-next-1').addEventListener('click', () => goToStep(2));

    // Step 2: Indication
    document.getElementById('custom-dose-radio').addEventListener('change', toggleCustomDose);
    document.getElementById('custom-dose-input').addEventListener('input', validateStep2);
    document.getElementById('btn-back-2').addEventListener('click', () => goToStep(1));
    document.getElementById('btn-next-2').addEventListener('click', () => goToStep(3));

    // Step 3: Weight
    document.getElementById('patient-weight').addEventListener('input', validateStep3);
    document.getElementById('btn-back-3').addEventListener('click', () => goToStep(2));
    document.getElementById('btn-next-3').addEventListener('click', () => goToStep(4));

    // Step 4: Formulation
    document.getElementById('btn-back-4').addEventListener('click', () => goToStep(3));
    document.getElementById('btn-next-4').addEventListener('click', () => goToStep(5));

    // Step 5: Concentration
    document.getElementById('btn-back-5').addEventListener('click', () => goToStep(4));
    document.getElementById('btn-calculate').addEventListener('click', calculateDose);

    // Step 6: Results
    document.getElementById('btn-back-6').addEventListener('click', () => goToStep(5));
    document.getElementById('btn-new-calc').addEventListener('click', resetCalculator);
    document.getElementById('btn-print').addEventListener('click', printResults);
}

// ===========================
// STEP 1: DRUG SEARCH
// ===========================

function handleSearchInput(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const resultsDiv = document.getElementById('autocomplete-results');
    
    if (searchTerm.length < 2) {
        resultsDiv.classList.add('hidden');
        return;
    }

    const matches = drugsList.filter(drug => 
        drug.name.toLowerCase().includes(searchTerm)
    );

    if (matches.length === 0) {
        resultsDiv.classList.add('hidden');
        return;
    }

    resultsDiv.innerHTML = matches.map(drug => `
        <div class="autocomplete-item" data-drug-id="${drug.id}">
            ${drug.name} ${drug.verified ? '🟢' : '🟡'}
        </div>
    `).join('');

    resultsDiv.classList.remove('hidden');

    // Add click handlers to autocomplete items
    resultsDiv.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            selectDrugFromAutocomplete(item.dataset.drugId);
        });
    });
}

function selectDrugFromAutocomplete(drugId) {
    document.getElementById('drug-select').value = drugId;
    document.getElementById('autocomplete-results').classList.add('hidden');
    document.getElementById('drug-search').value = '';
    handleDrugSelection({ target: { value: drugId } });
}

async function handleDrugSelection(e) {
    const drugId = e.target.value;
    
    if (!drugId) {
        document.getElementById('btn-next-1').disabled = true;
        return;
    }

    selectedDrug = drugsList.find(d => d.id === drugId);
    
    // Load drug data
    try {
        const response = await fetch(`data/${drugId}.json`);
        selectedDrugData = await response.json();
        calculationState.drugName = selectedDrugData.drugName;
        document.getElementById('btn-next-1').disabled = false;
    } catch (error) {
        console.error('Error loading drug data:', error);
        alert('Error loading drug information. Please try again.');
    }
}

// ===========================
// STEP 2: INDICATION
// ===========================

function populateIndications() {
    const container = document.getElementById('indications-list');
    const drugNameDisplay = document.getElementById('drug-name-display');
    
    drugNameDisplay.textContent = selectedDrugData.drugName;
    
    container.innerHTML = selectedDrugData.indications.map((ind, index) => `
        <label>
            <input type="radio" name="indication" value="${index}" onchange="handleIndicationSelection(${index})">
            <span class="indication-dose">${ind.condition}: ${ind.dosing}</span>
            <span class="indication-source">[${ind.source}]</span>
        </label>
    `).join('');
}

function handleIndicationSelection(index) {
    calculationState.indication = selectedDrugData.indications[index];
    calculationState.customDose = null;
    document.getElementById('custom-dose-input').value = '';
    document.getElementById('custom-dose-input').disabled = true;
    validateStep2();
}

function toggleCustomDose(e) {
    const input = document.getElementById('custom-dose-input');
    if (e.target.checked) {
        input.disabled = false;
        input.focus();
        calculationState.indication = null;
    } else {
        input.disabled = true;
        input.value = '';
        calculationState.customDose = null;
    }
    validateStep2();
}

function validateStep2() {
    const selectedIndication = document.querySelector('input[name="indication"]:checked');
    const customDoseValue = parseFloat(document.getElementById('custom-dose-input').value);
    const customDoseChecked = document.getElementById('custom-dose-radio').checked;
    
    let isValid = false;
    
    if (selectedIndication && selectedIndication.value !== 'custom') {
        isValid = true;
    } else if (customDoseChecked && customDoseValue > 0) {
        calculationState.customDose = customDoseValue;
        isValid = true;
    }
    
    document.getElementById('btn-next-2').disabled = !isValid;
}

// ===========================
// STEP 3: WEIGHT
// ===========================

function validateStep3() {
    const weight = parseFloat(document.getElementById('patient-weight').value);
    const isValid = weight >= 0.5 && weight <= 150;
    
    if (isValid) {
        calculationState.weight = weight;
        
        // Get age group if selected
        const ageGroupRadio = document.querySelector('input[name="age-group"]:checked');
        calculationState.ageGroup = ageGroupRadio ? ageGroupRadio.value : '';
    }
    
    document.getElementById('btn-next-3').disabled = !isValid;
}

// ===========================
// STEP 4: FORMULATION
// ===========================

function populateFormulations() {
    const container = document.getElementById('formulation-options');
    const formulations = selectedDrugData.formulations;
    
    let html = '';
    
    if (formulations.suspension && formulations.suspension.length > 0) {
        html += `
            <label>
                <input type="radio" name="formulation" value="suspension" onchange="handleFormulationSelection('suspension')">
                Oral Suspension / Syrup
            </label>
        `;
    }
    
    if (formulations.tablet && formulations.tablet.length > 0) {
        html += `
            <label>
                <input type="radio" name="formulation" value="tablet" onchange="handleFormulationSelection('tablet')">
                Tablets
            </label>
        `;
    }
    
    container.innerHTML = html;
}

function handleFormulationSelection(type) {
    calculationState.formulation = type;
    document.getElementById('btn-next-4').disabled = false;
}

// ===========================
// STEP 5: CONCENTRATION
// ===========================

function populateConcentrations() {
    const container = document.getElementById('concentration-options');
    const formulations = selectedDrugData.formulations[calculationState.formulation];
    
    let html = formulations.map((conc, index) => {
        let label = '';
        if (calculationState.formulation === 'suspension') {
            label = `${conc.concentration} ${conc.common ? '(standard)' : ''}`;
        } else {
            label = `${conc.strength} ${conc.divisible ? '(divisible)' : '(do not split)'}`;
        }
        
        return `
            <label>
                <input type="radio" name="concentration" value="${index}" onchange="handleConcentrationSelection(${index})">
                ${label}
            </label>
        `;
    }).join('');
    
    // Add custom option
    html += `
        <label>
            <input type="radio" name="concentration" value="custom" onchange="handleConcentrationSelection('custom')">
            Custom concentration
        </label>
    `;
    
    container.innerHTML = html;
}

function handleConcentrationSelection(index) {
    const customSection = document.getElementById('custom-concentration-section');
    const customMgInput = document.getElementById('custom-conc-mg');
    const customMlInput = document.getElementById('custom-conc-ml');
    
    if (index === 'custom') {
        customSection.classList.remove('hidden');
        customMgInput.disabled = false;
        customMlInput.disabled = false;
        calculationState.concentration = null;
        
        // Add input listeners
        customMgInput.addEventListener('input', validateCustomConcentration);
        customMlInput.addEventListener('input', validateCustomConcentration);
        
        document.getElementById('btn-calculate').disabled = true;
    } else {
        customSection.classList.add('hidden');
        customMgInput.disabled = true;
        customMlInput.disabled = true;
        customMgInput.value = '';
        customMlInput.value = '';
        
        calculationState.concentration = selectedDrugData.formulations[calculationState.formulation][index];
        calculationState.customConcentration = null;
        document.getElementById('btn-calculate').disabled = false;
    }
}

function validateCustomConcentration() {
    const mg = parseFloat(document.getElementById('custom-conc-mg').value);
    const ml = parseFloat(document.getElementById('custom-conc-ml').value);
    
    if (mg > 0 && ml > 0) {
        calculationState.customConcentration = {
            mg: mg,
            ml: ml,
            concentration: `${mg}mg/${ml}ml`
        };
        document.getElementById('btn-calculate').disabled = false;
    } else {
        document.getElementById('btn-calculate').disabled = true;
    }
}

// ===========================
// DOSE CALCULATION
// ===========================

function calculateDose() {
    // Determine mg/kg dose
    let mgPerKg;
    let duration = '';
    let frequency = '';
    let indication = '';
    let source = '';
    
    if (calculationState.customDose) {
        mgPerKg = calculationState.customDose;
        indication = 'Custom dose';
        source = 'User-specified';
    } else {
        const ind = calculationState.indication;
        // Extract mg/kg from dosing string (simplified - may need more sophisticated parsing)
        const match = ind.dosing.match(/(\d+\.?\d*)\s*mg\/kg/);
        mgPerKg = match ? parseFloat(match[1]) : 10; // Default fallback
        
        indication = ind.condition;
        source = ind.source;
        duration = ind.duration || '';
        frequency = ind.frequency || 'OD';
    }
    
    // Calculate single dose
    const singleDoseMg = mgPerKg * calculationState.weight;
    
    // Calculate volume/tablets
    let administrationText = '';
    
    if (calculationState.formulation === 'suspension') {
        const conc = calculationState.concentration || calculationState.customConcentration;
        
        // Parse concentration (e.g., "200mg/5ml" or custom)
        let mgPerMl;
        if (conc.concentration) {
            const parts = conc.concentration.match(/(\d+\.?\d*)mg\/(\d+\.?\d*)ml/);
            mgPerMl = parseFloat(parts[1]) / parseFloat(parts[2]);
        } else {
            mgPerMl = conc.mg / conc.ml;
        }
        
        const volumeMl = singleDoseMg / mgPerMl;
        const concDisplay = calculationState.concentration ? 
            calculationState.concentration.concentration : 
            calculationState.customConcentration.concentration;
        
        administrationText = `${volumeMl.toFixed(1)} ml (suspension ${concDisplay}) ${frequency}, ${duration}`;
    } else {
        // Tablets
        const tablet = calculationState.concentration;
        const strength = parseFloat(tablet.strength.match(/(\d+)/)[1]);
        const tabletsNeeded = singleDoseMg / strength;
        
        administrationText = `${tabletsNeeded.toFixed(2)} tablet(s) of ${tablet.strength} ${frequency}, ${duration}`;
        
        if (!tablet.divisible && tabletsNeeded % 1 !== 0) {
            administrationText += ' ⚠️ Note: This tablet should not be split - consider alternative formulation';
        }
    }
    
    // Display results
    displayResults({
        patientInfo: `Weight: ${calculationState.weight} kg${calculationState.ageGroup ? ', ' + formatAgeGroup(calculationState.ageGroup) : ''}`,
        drugName: calculationState.drugName,
        indication: indication,
        dose: `${mgPerKg} mg/kg ${duration ? '× ' + duration : ''}`,
        singleDose: `${singleDoseMg.toFixed(1)} mg`,
        administration: administrationText,
        source: source,
        verified: selectedDrug.verified,
        importantNotes: selectedDrugData.importantNotes || []
    });
    
    goToStep(6);
}

function formatAgeGroup(group) {
    const labels = {
        'neonate': 'Neonate (0-28 days)',
        'infant': 'Infant (1-12 months)',
        'child': 'Child (1-12 years)',
        'adolescent': 'Adolescent (13-18 years)'
    };
    return labels[group] || group;
}

function displayResults(data) {
    document.getElementById('result-patient-info').textContent = data.patientInfo;
    
    document.getElementById('result-dose-info').innerHTML = `
        <strong>Drug:</strong> ${data.drugName}<br>
        <strong>Indication:</strong> ${data.indication}<br>
        <strong>Dose:</strong> ${data.dose}<br>
        <strong>Single Dose:</strong> ${data.singleDose}
    `;
    
    document.getElementById('result-administration').textContent = data.administration;
    
    // Important notes
    const notesSection = document.getElementById('important-notes-section');
    const notesList = document.getElementById('important-notes-list');
    
    if (data.importantNotes && data.importantNotes.length > 0) {
        notesSection.classList.remove('hidden');
        notesList.innerHTML = data.importantNotes.map(note => `<li>${note}</li>`).join('');
    } else {
        notesSection.classList.add('hidden');
    }
    
    // Source
    const badge = data.verified ? 
        '<span class="verification-badge verified">🟢 VERIFIED</span>' :
        '<span class="verification-badge draft">🟡 DRAFT</span>';
    
    document.getElementById('result-source').innerHTML = `${badge}[${data.source}]`;
}

// ===========================
// NAVIGATION
// ===========================

function showStep(stepNumber) {
    // Hide all steps
    Object.values(steps).forEach(step => step.classList.remove('active'));
    
    // Show current step
    currentStep = stepNumber;
    
    switch(stepNumber) {
        case 1:
            steps.search.classList.add('active');
            break;
        case 2:
            populateIndications();
            steps.indication.classList.add('active');
            break;
        case 3:
            steps.weight.classList.add('active');
            break;
        case 4:
            populateFormulations();
            steps.formulation.classList.add('active');
            break;
        case 5:
            populateConcentrations();
            steps.concentration.classList.add('active');
            break;
        case 6:
            steps.results.classList.add('active');
            break;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function goToStep(stepNumber) {
    showStep(stepNumber);
}

// ===========================
// UTILITIES
// ===========================

function resetCalculator() {
    // Reset state
    calculationState = {
        drugName: '',
        indication: null,
        customDose: null,
        weight: null,
        ageGroup: '',
        formulation: '',
        concentration: null,
        customConcentration: null
    };
    
    // Reset form inputs
    document.getElementById('drug-search').value = '';
    document.getElementById('drug-select').value = '';
    document.getElementById('patient-weight').value = '';
    
    // Uncheck all radios
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    
    // Go to step 1
    goToStep(1);
}

function printResults() {
    window.print();
}

// Make functions globally available
window.handleIndicationSelection = handleIndicationSelection;
window.handleFormulationSelection = handleFormulationSelection;
window.handleConcentrationSelection = handleConcentrationSelection;
