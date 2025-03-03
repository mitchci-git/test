document.addEventListener('DOMContentLoaded', function() {
    // Get the filter elements
    const teamFilter = document.getElementById('team-filter');
    const monthFilter = document.getElementById('month-filter');
    const typeFilter = document.getElementById('type-filter');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Get all fixture cards
    const fixtureCards = document.querySelectorAll('.fixture-card');
    
    // Filter functions
    function filterFixtures() {
        const teamValue = teamFilter.value;
        const monthValue = monthFilter.value;
        const typeValue = typeFilter.value;
        const activeToggle = document.querySelector('.toggle-btn.active').dataset.filter;
        
        fixtureCards.forEach(card => {
            // Check if card matches all filter criteria
            const teamMatch = teamValue === 'all' || card.dataset.team === teamValue;
            const monthMatch = monthValue === 'all' || card.dataset.month === monthValue;
            const typeMatch = typeValue === 'all' || card.dataset.type === typeValue;
            const toggleMatch = card.classList.contains(activeToggle);
            
            // Show or hide card based on filter matches
            if (teamMatch && monthMatch && typeMatch && toggleMatch) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if any fixtures are visible after filtering
        checkNoResults();
    }
    
    // Check if no fixtures are visible and display a message
    function checkNoResults() {
        let visibleCount = 0;
        fixtureCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        });
        
        // Get or create the no-results message element
        let noResultsMsg = document.getElementById('no-fixtures-message');
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-fixtures-message';
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.textContent = 'No fixtures match your current filters.';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '3rem 0';
                noResultsMsg.style.width = '100%';
                noResultsMsg.style.color = 'var(--grey-color)';
                
                // Insert after the first fixtures-grid
                const fixturesGrid = document.querySelector('.fixtures-grid');
                fixturesGrid.parentNode.insertBefore(noResultsMsg, fixturesGrid.nextSibling);
            } else {
                noResultsMsg.style.display = 'block';
            }
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }

        // Hide month headings if no fixtures are visible under them
        document.querySelectorAll('.month-heading').forEach(heading => {
            const nextGrid = heading.nextElementSibling;
            if (nextGrid && nextGrid.classList.contains('fixtures-grid')) {
                // Check if there are any visible fixtures in this grid
                const visibleFixtures = nextGrid.querySelectorAll('.fixture-card[style="display: grid;"]');
                heading.style.display = visibleFixtures.length > 0 ? 'block' : 'none';
            }
        });
    }
    
    // Attach event listeners to filters
    if (teamFilter) teamFilter.addEventListener('change', filterFixtures);
    if (monthFilter) monthFilter.addEventListener('change', filterFixtures);
    if (typeFilter) typeFilter.addEventListener('change', filterFixtures);
    
    // Toggle upcoming/results
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all toggle buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter fixtures
            filterFixtures();
        });
    });

    // Calendar button functionality
    const calendarBtns = document.querySelectorAll('.calendar-btn');
    
    calendarBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.dataset.calendarEvent;
            
            // In a production site, this would trigger a download of an .ics file or similar
            // For demo purposes, we'll just show an alert
            alert(`Event ${eventId} would be added to your calendar!`);
        });
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Toggle dropdown on button click
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                content.style.display = 'none';
            }
        });
    });
});
