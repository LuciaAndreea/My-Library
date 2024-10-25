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
    books.forEach((book,index) =>{
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
             <h3>${book.title}</h3>
             <p>Author: ${book.author}</p>
             <p>Number of pages: ${book.pages}</p>
             <p>Year of publication: ${book.year}</p>
             <p>Status: ${book.read ? "Congrats! Another one to the collection;)" : "Not read. Yet ;)"}</p>
             <button class="read-status-button" data-index="${index}">Change read status</button>
             <button class="remove-button" data-index="${index}">Remove book</button>
        `;
        //add the book-card elements in bookContainer
        bookContainer.appendChild(bookCard);
    });

    //add eventListeners to each remove button so that everytime is clicked it calls the removeBook() function
    const remoevButtons = document.querySelectorAll(".remove-button");
    remoevButtons.forEach(button =>{
        button.addEventListener("click" , function(){
            const bookIndex = this.getAttribute("data-index");
            removeBook(bookIndex);
        })
    })

    //add eventListeners to each "Change read status" button  so that everytime is clicked it changes it's status
    const readStatusButtons = document.querySelectorAll(".read-status-button");
    readStatusButtons.forEach(button =>{
       button.addEventListener("click", function(){
        const bookIndex = this.getAttribute("data-index");
        toggleReadStatus(bookIndex);
       })
    })
}

//function to remove a book by index usng splice()
function removeBook(index){
    books.splice(index,1); 
    saveBooksToStorage(books) //update the localStorage
    showBooks();
}

//function to change the status from true to false and updates the localStorage 
function toggleReadStatus(index){
    books[index].read = !books[index].read; 
    saveBooksToStorage(books);
    showBooks();
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

    //UPDATE: ADD A READ FIELD IN EACH OBJECT
    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read";
    readLabel.textContent = "Read";

    const readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.id = "read";

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
    form.appendChild(readLabel);
    form.appendChild(readInput);
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
            year:yearInput.value,
            read:readInput.checked
        };

        //add the new book to the existing library
        books.push(newBook);
        saveBooksToStorage(books);
        //show the updated list of books
        showBooks();
        form.reset();
    });
}

//function to check if the form is currently hidden
function toggleFormVisibility(){
    const formContainer = document.getElementById("formContainer");
    if(formContainer.classList.contains("hidden")){
        createForm(); //CREATE THE FORM ONLY IF IT IS NOT VISIBLE
        formContainer.classList.remove("hidden");
    }else{
        formContainer.classList.add("hidden");
    }
}

const newBookButton = document.getElementById("new-book");
//UPDATE the new book button allows the form to be shown or hidden each time is it clicked
newBookButton.addEventListener("click" , toggleFormVisibility);

showBooks();
