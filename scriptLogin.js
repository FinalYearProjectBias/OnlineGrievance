// Navigation and section display
function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'my-grievance') {
        fetchMyGrievances();
    }
}

// Custom alert component
function showCustomAlert(message, type = 'error') {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('custom-alert', type);
    alertContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        color: white;
        background-color: ${type === 'error' ? '#ff4444' : '#44bb44'};
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    alertContainer.textContent = message;
    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(alertContainer);
        }, 290);
    }, 3000);
}

// Modal handling
const modal = document.getElementById('grievance-modal');
const modalOverlay = document.getElementById('modal-overlay');

function showModal(grievanceData) {
    document.getElementById('modal-grievant-id').textContent = grievanceData.grievant_id || 'N/A';
    document.getElementById('modal-grievant-name').textContent = grievanceData.grievant_name || 'N/A';
    document.getElementById('modal-title').textContent = grievanceData.title || 'N/A';
    document.getElementById('modal-description').textContent = grievanceData.description || 'N/A';
    document.getElementById('modal-date').textContent = new Date(grievanceData.created_at).toLocaleDateString() || 'N/A';
    document.getElementById('modal-status').textContent = grievanceData.status || 'Pending';
    document.getElementById('modal-reply-date').textContent = grievanceData.reply_date || 'N/A';
    document.getElementById('modal-reply').textContent = grievanceData.reply || 'No reply yet';

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('new-password').value;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password)
    };

    // Update requirement indicators
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`${req}-requirement`);
        if (element) {
            element.className = requirements[req] ? 'valid' : 'invalid';
        }
    });

    // Update strength bars
    const strength = Object.values(requirements).filter(Boolean).length;
    const bars = document.querySelectorAll('.strength-bar');
    bars.forEach((bar, index) => {
        bar.className = `strength-bar ${index < strength ? 'active' : ''}`;
    });
}

// Form submission handlers
async function handleFormSubmit(event) {
    event.preventDefault();
    const formId = event.target.id;
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Add user reference
        data.user_ref = localStorage.getItem('user_id');
        console.log(data);
        const endpoint = formId === 'edit-profile-form' 
            ? '/api/v1/user/update_profile/'
            : '/api/v1/user/add_grievance/';
            // 
        const response = await fetch(`https://backend-server-ohpm.onrender.com
${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Request failed');

        showCustomAlert(`${formId === 'edit-profile-form' ? 'Profile updated' : 'Grievance submitted'} successfully!`, 'success');
        event.target.reset();

    } catch (error) {
        console.error('Form submission error:', error);
        showCustomAlert('An error occurred. Please try again.');
    } finally {
        submitButton.disabled = false;
    }
}

// Password change handler
async function handlePasswordChange(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        showCustomAlert('New passwords do not match');
        return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const response = await fetch('https://backend-server-ohpm.onrender.com/api/v1/user/change_password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id'),
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        if (!response.ok) throw new Error('Password change failed');

        showCustomAlert('Password changed successfully!', 'success');
        event.target.reset();

    } catch (error) {
        console.error('Password change error:', error);
        showCustomAlert('Failed to change password. Please try again.');
    } finally {
        submitButton.disabled = false;
    }
}

// Fetch and display grievances
async function fetchMyGrievances() {
    const userRef = localStorage.getItem('user_id');
    const tableBody = document.querySelector('#my-grievance-table tbody');
    
    try {
        const response = await fetch(`https://backend-server-ohpm.onrender.com/api/v1/user/get_grievances/${userRef}`);
        if (!response.ok) throw new Error('Failed to fetch grievances');

        const { data: grievances } = await response.json();
        
        tableBody.innerHTML = grievances.map((grievance, index) => `
            <tr onclick="showModal(${JSON.stringify(grievance).replace(/"/g, '&quot;')})">
                <td>${index + 1}</td>
                <td>${grievance.grievant_id}</td>
                <td>${grievance.title}</td>
                <td>${grievance.description}</td>
                <td>${grievance.reply?'Replied':'Pending'}</td>
                <td>${grievance.reply || 'Awaiting response'}</td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error fetching grievances:', error);
        showCustomAlert('Failed to load grievances');
    }
}

// Sign out functionality
function signOut() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Event listeners setup
document.addEventListener('DOMContentLoaded', () => {
    // Close modal button
    document.getElementById('close-modal')?.addEventListener('click', () => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    // Click outside modal to close
    modalOverlay?.addEventListener('click', () => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    // Form submissions
    document.getElementById('edit-profile-form')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('change-password-form')?.addEventListener('submit', handlePasswordChange);
    document.getElementById('post-grievance-form')?.addEventListener('submit', handleFormSubmit);

    // Password toggles
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const inputId = toggle.getAttribute('data-input');
            const input = document.getElementById(inputId);
            if (input) {
                input.type = input.type === 'password' ? 'text' : 'password';
                toggle.classList.toggle('fa-eye');
                toggle.classList.toggle('fa-eye-slash');
            }
        });
    });

    // Show initial section if specified in URL
    const hashSection = window.location.hash.slice(1);
    if (hashSection && document.getElementById(hashSection)) {
        showSection(hashSection);
    }
});

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .custom-alert {
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
    }
`;
document.head.appendChild(styleSheet);