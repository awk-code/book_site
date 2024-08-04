// Placeholder for AWS SDK and Cognito setup


document.addEventListener('DOMContentLoaded', () => {
    const signInSection = document.getElementById('sign-in');
    const dashboardSection = document.getElementById('dashboard');
    const addEditBookSection = document.getElementById('add-edit-book');
    const signInForm = document.getElementById('sign-in-form');
    const bookForm = document.getElementById('book-form');
    const addBookBtn = document.getElementById('add-book-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const signOutBtn = document.getElementById('sign-out');
    const modal = document.getElementById('add-edit-book-modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Simulated authentication state, will replace with actual Cognito authentication later
    let isAuthenticated = false;

    function updateUI() {
        if (isAuthenticated) {
            signInSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            document.getElementById('username').textContent = 'Admin'; // Replace with actual username
            fetchBooks();
        } else {
            signInSection.classList.remove('hidden');
            dashboardSection.classList.add('hidden');
            addEditBookSection.classList.add('hidden');
        }
    }

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Will implement actual Cognito authentication here
        isAuthenticated = true;
        updateUI();
    });

    signOutBtn.addEventListener('click', () => {
        // Will implement actual Cognito sign out here
        isAuthenticated = false;
        updateUI();
    });

    addBookBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        bookForm.reset();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Will implement book addition/editing logic here
        addEditBookSection.classList.add('hidden');
    });

    // Function to fetch and display books from DynamoDB, for now fetch from json for demo
    function fetchBooks() {
        fetch('books.json')
            .then(response => response.json())
            .then(books => {
                const booksList = document.getElementById('books-list');
                booksList.innerHTML = '';
                books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.Title}</td>
                        <td>${book.Authors}</td>
                        <td>${book.Publisher}</td>
                        <td>${book.Year}</td>
                        <td>
                            <button class="btn btn-edit">Edit</button>
                            <button class="btn btn-delete">Delete</button>
                        </td>
                    `;
                    booksList.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    // Initial UI update
    updateUI();
});