let currentPage = 1;
let itemsPerPage = 10;
let submissions = [];
let filteredSubmissions = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load dummy data initially
    loadDummyData();
    
    // Setup event listeners
    setupEventListeners();
});

function loadDummyData() {
    // Generate dummy data
    submissions = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        firstName: `John${i}`,
        lastName: `Doe${i}`,
        email: `john${i}@example.com`,
        website: `https://website${i}.com`,
        service: ['Theme Development', 'Store Setup', 'App Development'][Math.floor(Math.random() * 3)],
        budget: ['$1,000 - $5,000', '$5,000 - $10,000', 'Not sure yet'][Math.floor(Math.random() * 3)],
        timeline: ['ASAP', 'Within 1 month', '2-3 months'][Math.floor(Math.random() * 3)],
        message: `This is a dummy message for submission ${i + 1}`
    }));
    
    filteredSubmissions = [...submissions];
    updateTable();
}

function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('searchFilter').addEventListener('change', handleSearch);
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
    
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('submissionModal')) {
            closeModal();
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchFilter = document.getElementById('searchFilter').value;
    
    filteredSubmissions = submissions.filter(submission => {
        if (searchFilter === 'all') {
            return Object.values(submission).some(value => 
                String(value).toLowerCase().includes(searchTerm)
            );
        }
        
        switch(searchFilter) {
            case 'name':
                return `${submission.firstName} ${submission.lastName}`
                    .toLowerCase().includes(searchTerm);
            case 'email':
                return submission.email.toLowerCase().includes(searchTerm);
            case 'service':
                return submission.service.toLowerCase().includes(searchTerm);
            default:
                return true;
        }
    });
    
    currentPage = 1;
    updateTable();
}

function updateTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredSubmissions.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('submissionsBody');
    tbody.innerHTML = '';
    
    pageData.forEach(submission => {
        const row = createSubmissionRow(submission);
        tbody.appendChild(row);
    });
    
    updatePagination();
}

function createSubmissionRow(submission) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${formatDate(submission.created_at)}</td>
        <td>${submission.firstName} ${submission.lastName}</td>
        <td>${submission.email}</td>
        <td>${submission.service}</td>
        <td>${submission.budget}</td>
        <td>${submission.timeline}</td>
        <td>
            <button onclick="viewSubmission(${submission.id})" class="view-btn">
                <i class="fas fa-eye"></i> View
            </button>
        </td>
    `;
    return row;
}

function updatePagination() {
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(delta) {
    currentPage += delta;
    updateTable();
}

function viewSubmission(id) {
    const submission = submissions.find(s => s.id === id);
    if (submission) {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <div class="submission-details">
                <p><strong>Date:</strong> ${formatDate(submission.created_at)}</p>
                <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
                <p><strong>Email:</strong> ${submission.email}</p>
                <p><strong>Website:</strong> ${submission.website || 'N/A'}</p>
                <p><strong>Service:</strong> ${submission.service}</p>
                <p><strong>Budget:</strong> ${submission.budget}</p>
                <p><strong>Timeline:</strong> ${submission.timeline}</p>
                <p><strong>Message:</strong></p>
                <div class="message-content">${submission.message}</div>
            </div>
        `;
        
        document.getElementById('submissionModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('submissionModal').style.display = 'none';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
} 