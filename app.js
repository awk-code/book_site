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
    const apiUrl = 'https://zt1zcdcn95.execute-api.us-east-1.amazonaws.com/prod/books';

    // Simulated authentication state, will replace with actual Cognito authentication later
    let isAuthenticated = false;

    function updateUI() {
        const signInSection = document.getElementById('sign-in');
        const dashboardSection = document.getElementById('dashboard');
        const addEditBookSection = document.getElementById('add-edit-book-modal');
        const usernameElement = document.getElementById('username');
    
        if (!signInSection || !dashboardSection) {
            console.error('One or more required DOM elements not found');
            return;
        }
    
        if (isAuthenticated) {
            signInSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            if (usernameElement) {
                usernameElement.textContent = 'Admin'; // Replace with actual username
            }
            fetchBooks();
        } else {
            signInSection.classList.remove('hidden');
            dashboardSection.classList.add('hidden');
            if (addEditBookSection) {
                addEditBookSection.classList.add('hidden');
            }
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
        const formTitle = document.getElementById('form-title');
        formTitle.textContent = 'Add New Book';
        bookForm.dataset.mode = 'add';
        bookForm.reset();
        modal.style.display = 'block';
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
        const bookData = {
            Title: document.getElementById('book-title').value,
            Authors: document.getElementById('book-author').value,
            Publisher: document.getElementById('book-publisher').value,
            Year: parseInt(document.getElementById('book-year').value),
            ImageUrl: document.getElementById('book-image-url').value
        };

        if (bookForm.dataset.mode === 'edit') {
            editBook(bookData);
        } else {
            addBook(bookData);
        }
    });

    function fetchBooks() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data);
                let books;
                if (data.body) {
                    books = JSON.parse(data.body);
                } else if (Array.isArray(data)) {
                    books = data;
                } else {
                    console.error('Unexpected data format:', data);
                    throw new Error('Unexpected data format');
                }
                
                if (!Array.isArray(books)) {
                    console.error('Books data is not an array:', books);
                    throw new Error('Invalid books data');
                }
    
                const booksList = document.getElementById('books-list');
                if (!booksList) {
                    console.error('books-list element not found');
                    return;
                }
                booksList.innerHTML = '';
                books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${book.ImageUrl || 'placeholder-image-url.jpg'}" alt="${book.Title}" class="book-thumbnail"></td>
                        <td>${book.Title || 'N/A'}</td>
                        <td>${book.Authors || 'N/A'}</td>
                        <td>${book.Publisher || 'N/A'}</td>
                        <td>${book.Year || 'N/A'}</td>
                        <td>
                            <button class="btn btn-edit">Edit</button>
                            <button class="btn btn-delete">Delete</button>
                        </td>
                    `;
                    const editBtn = row.querySelector('.btn-edit');
                    editBtn.addEventListener('click', () => openEditModal(book));
                    const deleteBtn = row.querySelector('.btn-delete');
                    deleteBtn.addEventListener('click', () => deleteBook(book.Title));
                    booksList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                const booksList = document.getElementById('books-list');
                if (booksList) {
                    booksList.innerHTML = '<tr><td colspan="5">Error loading books. Please try again later.</td></tr>';
                }
            });
    }

    function addBook(bookData) {
        //
    }
    
    function editBook(bookData) {
        //
    }

    function openEditModal(book) {
        const formTitle = document.getElementById('form-title');
        formTitle.textContent = 'Edit Book';
        bookForm.dataset.mode = 'edit';

        document.getElementById('book-title').value = book.Title || '';
        document.getElementById('book-author').value = book.Authors || '';
        document.getElementById('book-publisher').value = book.Publisher || '';
        document.getElementById('book-year').value = book.Year || '';
        document.getElementById('book-image-url').value = book.ImageUrl || '';

        modal.style.display = 'block';
    }

    function deleteBook(title) {
        //
    }

    // Initial UI update
    updateUI();
});