# pediatric-dose-calculator
# Pediatric Drug Calculator

**Evidence-based dosing for pediatric patients**

A practical web-based dosing calculator for healthcare providers working with pediatric patients in Tanzania and beyond. This tool provides quick, accurate dose calculations based on Tanzania Standard Treatment Guidelines and international protocols (WHO, PIDS, IDSA, AAP).

---

## 🎯 Purpose

This calculator is designed to help:
- **Medical doctors** - Quick dosing decisions at bedside
- **Nurses** - Accurate medication administration
- **Pharmacists** - Dose verification and counseling
- **Medical students** - Learning evidence-based dosing

---

## ✨ Features

- 📱 **Mobile-first design** - Optimized for smartphones and tablets
- 🔍 **Easy drug search** - Quick autocomplete search
- 📊 **Step-by-step guidance** - Clear workflow from drug selection to final dose
- 💊 **Multiple formulations** - Calculates for syrups, suspensions, and tablets
- 📚 **Source attribution** - Every dose linked to authoritative guidelines
- ✅ **Verification status** - Clear indicators for reviewed drugs
- 🖨️ **Print function** - Generate prescription-ready outputs

---

## 🏥 Clinical Approach

### Evidence-Based Dosing
All dosing recommendations are based on:
- Tanzania Standard Treatment Guidelines (STG)
- World Health Organization (WHO) guidelines
- Pediatric Infectious Diseases Society (PIDS) recommendations
- American Academy of Pediatrics (AAP) protocols and others

### Verification System
- 🟢 **VERIFIED** - Fully reviewed and cross-referenced with multiple sources
- 🟡 **DRAFT** - Available for use but requires further verification

---

## 🚀 How to Use

1. **Search** for the drug you need
2. **Select indication** - Choose the condition you're treating
3. **Enter patient weight** - Optionally select age group
4. **Choose formulation** - Suspension, syrup, or tablets
5. **Select concentration** - Pick available strength or enter custom
6. **Calculate** - Get immediate dosing recommendation

### Navigation
- Use **← Back** and **Next →** buttons to move between steps
- **🔄 New Calculation** to start over
- **🖨️ Print** to generate prescription

---

## 📋 Available Drugs

### Currently Available:
- [ ] Paracetamol (Acetaminophen)
- [ ] Azithromycin
- [ ] Amoxicillin-Clavulanate
- [ ] More drugs being added...

---

## 💻 Technical Details

### Technology Stack
- **HTML5** - Structure
- **CSS3** - Responsive design
- **Vanilla JavaScript** - No frameworks, pure JS for simplicity
- **JSON** - Drug data storage

### Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (iOS/Android)

### File Structure
```
pediatric-drug-calculator/
├── index.html              # Main application
├── styles.css              # Styling and responsive design
├── app.js                  # Application logic
├── data/
│   ├── drugs-list.json     # List of all available drugs
│   ├── paracetamol.json    # Drug data files
│   ├── azithromycin.json
│   └── template.json       # Template for new drugs
└── README.md
```

---

## 🔧 Installation

### For Healthcare Providers (Users)
Simply open the application in any modern web browser. No installation required.

**Online:** [Link will be added when deployed]

**Offline Use:**
1. Download all files from GitHub
2. Open `index.html` in your browser
3. Works without internet connection

### For Developers (Contributors)
```bash
git clone https://github.com/[username]/pediatric-drug-calculator.git
cd pediatric-drug-calculator
# Open index.html in browser - no build process needed
```

---

## 🤝 Contributing

This is an active project. We welcome contributions from:
- **Clinicians** - Dose verification and clinical feedback
- **Developers** - Code improvements and new features
- **Medical students** - Testing and documentation

### How to Contribute
1. Test the calculator with real clinical scenarios
2. Report any dosing discrepancies
3. Suggest new drugs to add
4. Improve documentation

---

## ⚠️ Important Disclaimer

**This calculator is a clinical decision support tool, NOT a replacement for clinical judgment.**

- Always verify doses with current guidelines
- Consider patient-specific factors (renal function, allergies, drug interactions)
- Consult with senior clinicians for complex cases
- Use at your own professional discretion

The developers assume no liability for clinical decisions made using this tool.

---

## 📞 Contact & Feedback

**Development in Progress** - This calculator is actively being developed and improved.

**Questions, suggestions, or feedback:**
- 📱 WhatsApp: +255756977282
- 📧 [Contact through GitHub issues]

We appreciate all feedback from healthcare providers using this tool in clinical practice.

---

## 👥 Development Team

**Developed by Dr. Mariia Rukavishnikova**
- Pediatrician
- Clinical experience in Tanzania

---

## 📄 License

© 2026 Drug Dosage Calculator

This project is intended for educational and clinical support purposes. All dosing information is derived from publicly available clinical guidelines.

---

## 📚 References

Primary sources used in this calculator:
- Tanzania Standard Treatment Guidelines and Essential Medicines List for Children and Adolescents (2017)
- National Guideline for Neonatal Care and Establishment of Neonatal Care Unit, Tanzania (2019)
- WHO Pocket Book of Hospital Care for Children (2013)
- WHO Essential Medicines List
- PIDS/IDSA Clinical Practice Guidelines
- AAP (American Academy of Pediatrics) Recommendations

---

## 🔄 Version History

### Version 1.0 (In Development)
- Initial release
- Core calculator functionality
- First set of essential drugs
- Mobile-responsive design

---

**Last Updated:** December 2025

**Status:** 🚧 Active Development
