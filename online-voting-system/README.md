# Online Voting System (Frontend Simulation)

## Project Description
A realistic, interactive web-based voting simulation platform that demonstrates how online digital voting works. Built purely with frontend technologies, it simulates secure voter validation, candidate selection, vote restriction logic (one vote per user using LocalStorage), and live dynamic result calculation.

## Features
- **Secure Voter Validation:** Comprehensive form validation checking for required fields, minimum age limit, valid mobile numbers, and mandatory checkboxes.
- **One Vote Per User Policy:** Implements HTML5 LocalStorage to securely prevent duplicate voting attempts with the same Voter ID.
- **Dynamic Dashboard:** Candidate lists are loaded dynamically from a JS configuration file.
- **Live Result Simulation:** Automatically calculates percentages and highlights the winner with smooth CSS animations.
- **Modern Glassmorphism UI:** Built with an attractive, premium government-portal-inspired design without relying on any external CSS frameworks.

## Technologies Used
- HTML5 (Semantic Structure)
- CSS3 (Custom Variables, Flexbox/Grid, Animations, Glassmorphism)
- Vanilla JavaScript (DOM Manipulation, LocalStorage, Event Listeners, Data Simulation)

## Folder Structure
```text
online-voting-system/
│
├── index.html       # Main HTML structure with 4 logical screens
├── style.css        # Premium glassmorphism design and animations
├── script.js        # Core logic, validation, and session management
├── candidates.js    # JSON-like data structure holding candidate details
└── README.md        # Project documentation
```

## How to Run Locally
1. Clone or download this repository to your local machine.
2. Ensure you have all the required files (`index.html`, `style.css`, `script.js`, `candidates.js`) in the same directory.
3. Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge).
4. Alternatively, use **VS Code Live Server** extension for an optimal testing experience.

## Deployment (GitHub Pages)
1. Initialize a Git repository in your project folder.
2. Commit all files and push to a new public GitHub repository.
3. Navigate to the repository **Settings** on GitHub.
4. Click on **Pages** in the left sidebar.
5. Under "Build and deployment" > "Source", select `Deploy from a branch`.
6. Select the `main` branch and `/root` folder, then click **Save**.
7. Wait a couple of minutes, and your live URL will be available!

---

## Author
Developed for College Mini Project.
