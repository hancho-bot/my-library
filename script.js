
// 1. LIBRARY DATA AND BOOK CONSTRUCTOR

// Stores all books in the library
const library = [];

// Creates a Book object
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}


// 2. LIBRARY FUNCTIONS

// Adds a new book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);

  library.push(book);
}

// Removes a book from the library using its id
function removeBookFromLibrary(id) {
  const index = library.findIndex((book) => {
    return book.id === id;
  });

  if (index !== -1) {
    library.splice(index, 1);
  }
}


// 3. RENDER BOOKS ON THE PAGE

function renderBookHTML() {

  // Sets initial value to an empty string
  let bookHTML = "";

  // Creates the book elements
  library.forEach((book) => {

    // Creates each book's HTML to the initially empty HTML string
    bookHTML += `
      <article class="book">
        <div class="book-description">
          <p class="read-state ${book.isRead ? 'read' : 'want-to'}">
            ${book.isRead ? 'Read' : 'Want to Read'}
          </p>

          <h3 class="title">${book.title}</h3>

          <p class="author">${book.author}</p>
        </div>

        <div class="pages-info">
          <p>${book.pages} pages</p>

          <button data-id="${book.id}" class="delete-book-btn">
            Delete
          </button>
        </div>
      </article>
    `;
  });

  // Renders the books on the page
  bookGridElement.innerHTML = bookHTML;
}


// 4. DOM ELEMENTS

const addBookBtn = document.querySelector(".add-book-btn");
const dialogElement = document.querySelector(".book-dialog");
const closeDialogBtn = document.querySelector(".close-dialog");
const submitBtn = document.querySelector(".submit-book-btn");

const formField = document.querySelector(".book-form");
const bookGridElement = document.querySelector(".book-grid");

const bookAuthor = document.querySelector("#book-author");
const bookTitle = document.querySelector("#book-title");
const bookPages = document.querySelector("#book-pages");
const bookStatus = document.querySelector("#book-status");

const noBookScreen = document.querySelector('.no-books-screen');

// 5. DIALOG EVENT LISTENERS

// Opens the dialog
addBookBtn.addEventListener("click", () => {
  dialogElement.showModal();
});

// Closes the dialog
closeDialogBtn.addEventListener("click", () => {
  dialogElement.close();
});


// 6. FORM SUBMISSION

formField.addEventListener("submit", (event) => {

  // Prevents the page from refreshing
  event.preventDefault();

  // Gets the values from the form
  const titleText = bookTitle.value;
  const authorText = bookAuthor.value;
  const pagesText = bookPages.value;
  const readStatusText = bookStatus.checked;

  // Adds the new book to the library
  addBookToLibrary(titleText, authorText, pagesText, readStatusText);

  // Updates the displayed books and removes the no-book screen
    noBookScreen.classList.remove('is-empty')
    renderBookHTML();

  // Clears the form and closes the dialog
  formField.reset();
  dialogElement.close();
});


// 7. DELETE BOOK MECHANISM

bookGridElement.addEventListener("click", (event) => {

  // Finds the Delete button that was clicked
  const deleteButton = event.target.closest(".delete-book-btn");

  // Stops if the click wasn't on a Delete button
  if (!deleteButton) return;

  // Gets the book from the button's data-id attribute
  const { id } = deleteButton.dataset;

  // Removes the selected book
  removeBookFromLibrary(id);

  // Updates the displayed books
  renderBookHTML();

  if (library.length === 0) {
    noBookScreen.classList.add('is-empty');
  }
});

// Adds no-book screen initially when the library is empty
noBookScreen.classList.add('is-empty');
