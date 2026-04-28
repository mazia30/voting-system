document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const voterForm = document.getElementById('voter-form');
    const candidateContainer = document.getElementById('candidate-container');
    const submitVoteBtn = document.getElementById('submit-vote');
    const resultContainer = document.getElementById('result-container');
    const winnerDisplay = document.getElementById('winner-display');
    const summaryBtn = document.getElementById('summary-btn');

    let selectedCandidateId = null;

    // Helper to switch screens
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // SCREEN 1: Validation
    voterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('voter-name').value.trim();
        const id = document.getElementById('voter-id').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const age = document.getElementById('age').value.trim();
        const eligibility = document.getElementById('eligibility').checked;
        const errorMsg = document.getElementById('form-errors');

        let errors = [];

        if (id.length < 5) errors.push("Voter ID must be at least 5 characters long.");
        if (!/^\d{10}$/.test(mobile)) errors.push("Mobile number must be exactly 10 digits.");
        if (parseInt(age) < 18) errors.push("You must be 18 or above to vote.");
        if (!eligibility) errors.push("You must confirm your eligibility.");

        if (errors.length > 0) {
            errorMsg.innerHTML = errors.join('<br>');
            errorMsg.style.display = 'block';
            return;
        }

        // Check LocalStorage for duplication
        if (localStorage.getItem(`voted_${id}`)) {
            errorMsg.innerHTML = "Access Denied: This Voter ID has already cast a vote.";
            errorMsg.style.display = 'block';
            return;
        }

        // Proceed to dashboard
        errorMsg.style.display = 'none';
        sessionStorage.setItem('currentVoterId', id);
        document.getElementById('welcome-name').textContent = name;
        
        loadCandidates();
        showScreen('screen-2');
    });

    // SCREEN 2: Load Candidates
    function loadCandidates() {
        candidateContainer.innerHTML = '';
        
        candidatesData.forEach(candidate => {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.innerHTML = `
                <img src="${candidate.image}" alt="${candidate.name}">
                <h3>${candidate.name}</h3>
                <p>${candidate.party}</p>
                <div class="party-symbol">${candidate.symbol}</div>
                <button class="select-btn" data-id="${candidate.id}">Select</button>
            `;
            
            card.addEventListener('click', () => selectCandidate(candidate.id, card));
            candidateContainer.appendChild(card);
        });
    }

    function selectCandidate(id, cardElement) {
        // Remove selection from all
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('.select-btn').textContent = "Select";
        });

        // Add selection to clicked
        cardElement.classList.add('selected');
        cardElement.querySelector('.select-btn').textContent = "Selected";
        
        selectedCandidateId = id;
        submitVoteBtn.disabled = false;
    }

    // Submit Vote
    submitVoteBtn.addEventListener('click', () => {
        if (!selectedCandidateId) return;

        const voterId = sessionStorage.getItem('currentVoterId');
        
        // Final security check
        if (localStorage.getItem(`voted_${voterId}`)) {
            alert("Error: Vote already recorded for this ID!");
            location.reload();
            return;
        }

        // Record vote
        localStorage.setItem(`voted_${voterId}`, "true");
        
        const selectedCandidate = candidatesData.find(c => c.id === selectedCandidateId);
        
        // Show success screen
        document.getElementById('success-message').innerHTML = `
            Your vote for <strong>${selectedCandidate.name}</strong> (${selectedCandidate.party}) 
            has been securely recorded.
        `;
        showScreen('screen-3');

        // Simulate vote counting engine
        simulateResults(selectedCandidateId);
    });

    // SCREEN 3 -> 4: Result Calculation
    document.getElementById('view-results-btn').addEventListener('click', () => {
        displayResults();
        showScreen('screen-4');
    });

    function simulateResults(votedCandidateId) {
        // Add actual user vote
        const userChoice = candidatesData.find(c => c.id === votedCandidateId);
        if(userChoice) userChoice.voteCount += 1;

        // Generate random simulated votes (1000 to 5000) for realism
        candidatesData.forEach(c => {
            c.voteCount += Math.floor(Math.random() * 4000) + 1000;
        });
    }

    function displayResults() {
        resultContainer.innerHTML = '';
        
        // Sort candidates by votes
        const sortedData = [...candidatesData].sort((a, b) => b.voteCount - a.voteCount);
        const totalVotes = sortedData.reduce((sum, c) => sum + c.voteCount, 0);
        const winner = sortedData[0];

        // Display Winner
        winnerDisplay.innerHTML = `
            <h2>👑 Winner: ${winner.name} 👑</h2>
            <p>${winner.party} | ${winner.symbol}</p>
            <h3>Total Votes: ${winner.voteCount.toLocaleString()}</h3>
        `;

        // Render progress bars
        sortedData.forEach((cand, index) => {
            const percentage = ((cand.voteCount / totalVotes) * 100).toFixed(1);
            const isWinner = index === 0;
            
            const barHTML = `
                <div class="result-bar-wrapper ${isWinner ? 'winner-bar' : ''}">
                    <div class="result-info">
                        <span>${cand.name} ${cand.symbol}</span>
                        <span>${cand.voteCount.toLocaleString()} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%" data-width="${percentage}%"></div>
                    </div>
                </div>
            `;
            resultContainer.insertAdjacentHTML('beforeend', barHTML);
        });

        // Trigger animations
        setTimeout(() => {
            document.querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = fill.getAttribute('data-width');
            });
        }, 300);
    }

    // Summary Button
    summaryBtn.addEventListener('click', () => {
        alert("Election Summary Report Downloaded (Simulated)");
    });
});
