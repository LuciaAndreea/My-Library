
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