
//create an array ob books which contains the books objects
const books = [
    {
        title:"Circe",
        author: "Madeline Miller",
        pages: 418,
        year:2017
    },
    {
        title: "Romeo and Juliet",
        author:"William Shakespeare",
        pages:70,
        year:1597
    }
];

//create a function that dispplays the books
function showBooks(){
    const bookContainer = document.getElementById("bookContainer");

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
    })
}
showBooks();

//function to create a form which lets the user to enter a new book with all of it's attributes
//the funtion will be called when the button "NEW BOOK" is clicked

function createForm(){
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = ""; //clear the form container

    //create the form labels and inputs
    const form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Name of the book";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";

    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author of th book";

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
        //show the updated list of books
        showBooks();
    });
}

const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click" , createForm);