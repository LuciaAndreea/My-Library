//function to get books from localStorage
function getBooksFromStorage(){
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) :[]; //saves the updated books to localStorage or returns an empty array
}

//function to save books to localStorage in format JSON.strigify()
function saveBooksToStorage(books){
    localStorage.setItem("books", JSON.stringify(books));
}
 //UPDATE: the books are now stored in the books array initialized by reading from localStorage
let books = getBooksFromStorage();

//create a function that dispplays the books
function showBooks(){
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = "";

    //make a for loop to iterate and display all the existing books
    books.forEach(book =>{
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
             <h3>${book.title}</h3>
             <p>Author: ${book.author}</p>
             <p>Number of pages: ${book.pages}</p>
             <p>Year of publication: ${book.year}</p>
        `;
        //add the book-card elements in bookContainer
        bookContainer.appendChild(bookCard);
    });
}


//function to create a form which lets the user to enter a new book with all of it's attributes
//the funtion will be called when the button "NEW BOOK" is clicked

function createForm(){
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = ""; //clear the form container

    //create the form labels and inputs
    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Name of the book";


    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author of the book";

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.name = "author";

    const pagesLabel = document.createElement("label");
    pagesLabel.textContent = "Number of pages";

    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.name = "pages";

    const yearLabel = document.createElement("label");
    yearLabel.textContent = "Year of publication";

    const yearInput = document.createElement("input");
    yearInput.type = "number";
    yearInput.name = "year";

    //create a button called "Add new book" which will add the book to the array
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "Add new book";

    //add the inputs, labels and the button to the form
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(pagesLabel);
    form.appendChild(pagesInput);
    form.appendChild(yearLabel);
    form.appendChild(yearInput);
    form.appendChild(btn);

    //add the form to the form container
    formContainer.append(form);
    formContainer.classList.remove("hidden");//make the form visible

    //create the event which happens on the formm
    form.addEventListener("submit", function(event){
        event.preventDefault(); //prevent the submition because there is no server to submit this at
        const newBook = {
            title:titleInput.value,
            author:authorInput.value,
            pages:pagesInput.value,
            year:yearInput.value
        };

        //add the new book to the existing library
        books.push(newBook);
        saveBooksToStorage(books);
        //show the updated list of books
        showBooks();
        form.reset();
    });
}

const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click" , createForm);

showBooks();
