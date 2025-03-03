document.addEventListener('DOMContentLoaded', function() {
    // Get the membership form
    const membershipForm = document.getElementById('membership-form');
    
    if (membershipForm) {
        // Form validation and submission
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = membershipForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightField(field, true);
                } else {
                    highlightField(field, false);
                }
            });
            
            // If form is valid, proceed with submission
            if (isValid) {
                // In a real application, you would send this data to your server
                // For demo purposes, we'll simulate a successful submission
                
                // Get form data
                const formData = new FormData(membershipForm);
                const formValues = Object.fromEntries(formData.entries());
                
                // Log form data (for demonstration only)
                console.log('Form submitted with values:', formValues);
                
                // Show success message
                showSuccessMessage();
            } else {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields.';
                errorMsg.style.color = 'var(--danger-color)';
                errorMsg.style.marginTop = 'var(--spacing-sm)';
                errorMsg.style.textAlign = 'center';
                
                // Insert at the top of the form
                membershipForm.insertBefore(errorMsg, membershipForm.firstChild);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMsg.remove();
                }, 3000);
            }
        });
        
        // Field validation helper function
        function highlightField(field, isInvalid) {
            if (isInvalid) {
                field.style.borderColor = 'var(--danger-color)';
                field.style.boxShadow = '0 0 0 3px rgba(231, 111, 81, 0.2)';
            } else {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }
        }
        
        // Success message function
        function showSuccessMessage() {
            // Create success container
            const successContainer = document.createElement('div');
            successContainer.className = 'success-container';
            successContainer.style.padding = 'var(--spacing-md)';
            successContainer.style.backgroundColor = 'var(--success-color)';
            successContainer.style.color = 'white';
            successContainer.style.borderRadius = 'var(--border-radius-md)';
            successContainer.style.textAlign = 'center';
            successContainer.style.marginBottom = 'var(--spacing-md)';
            
            // Add success message
            const heading = document.createElement('h3');
            heading.textContent = 'Application Submitted Successfully!';
            heading.style.color = 'white';
            
            const message = document.createElement('p');
            message.textContent = 'Thank you for your application to join Riverside Rugby Club. A member of our team will contact you within 48 hours to complete your registration.';
            
            const returnBtn = document.createElement('a');
            returnBtn.href = 'index.html';
            returnBtn.className = 'btn';
            returnBtn.style.backgroundColor = 'white';
            returnBtn.style.color = 'var(--success-color)';
            returnBtn.style.marginTop = 'var(--spacing-sm)';
            returnBtn.style.display = 'inline-block';
            returnBtn.textContent = 'Return to Homepage';
            
            // Add elements to success container
            successContainer.appendChild(heading);
            successContainer.appendChild(message);
            successContainer.appendChild(returnBtn);
            
            // Replace form with success message
            membershipForm.parentNode.replaceChild(successContainer, membershipForm);
        }
        
        // Add live validation on input fields
        const inputFields = membershipForm.querySelectorAll('input, select, textarea');
        
        inputFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    highlightField(field, true);
                } else {
                    highlightField(field, false);
                }
            });
        });
        
        // Membership type dropdown functionality
        const membershipTypeSelect = document.getElementById('membership-type');
        
        if (membershipTypeSelect) {
            membershipTypeSelect.addEventListener('change', function() {
                // This could be used to show different form fields based on membership type
                const selectedType = this.value;
                
                // Example: Show guardian fields for youth memberships
                const guardianFields = document.querySelector('.guardian-fields');
                
                if (guardianFields) {
                    if (selectedType.includes('youth') || selectedType.includes('mini')) {
                        guardianFields.style.display = 'block';
                    } else {
                        guardianFields.style.display = 'none';
                    }
                }
            });
        }
    }
});
