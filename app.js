function availableBooks(books) {
    return books.filter(function(book) {
        return !book.kolcsonozve;
    });
}
function borrowedBooks(books) {
    return books.filter(function(book) {
        return book.kolcsonozve;
    });
}
function filterByAuthor(books, author) {
    return books.filter(function(book) {
        return book.szerzo.toLowerCase().includes(author.toLowerCase());
    });
}
function totalBooks(books) {
    return books.length;
}
function borrowedBooksCount(books) {
    return books.reduce(function(count, book) {
        return book.kolcsonozve ? count + 1 : count;
    }, 0);
}
const availableBooksList = document.getElementById('availableBooks');
const borrowedBooksList = document.getElementById('borrowedBooksList');
const totalBooksSpan = document.getElementById('totalBooks');
const borrowedBooksSpan = document.getElementById('borrowedBooks');
const filterAuthorInput = document.getElementById('filterAuthor');
const filterAuthorBtn = document.getElementById('filterAuthorBtn');

function render() {
    availableBooksList.innerHTML = '';
    availableBooks(books).forEach(function(book) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + book.cim + '</strong> (' + book.szerzo + ', ' + book.kiadasEve + ')' +
            '<span class="actions">' +
            '<button onclick="borrow(' + book.azonosito + ')">Kölcsönzés</button>' +
            '<button class="delete" onclick="remove(' + book.azonosito + ')">Törlés</button>' +
            '</span>';
        availableBooksList.appendChild(li);
    });
    borrowedBooksList.innerHTML = '';
    borrowedBooks(books).forEach(function(book) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + book.cim + '</strong> (' + book.szerzo + ', ' + book.kiadasEve + ')' +
            '<span class="actions">' +
            '<button class="return" onclick="giveBack(' + book.azonosito + ')">Visszavétel</button>' +
            '<button class="delete" onclick="remove(' + book.azonosito + ')">Törlés</button>' +
            '</span>';
        borrowedBooksList.appendChild(li);
    });
    totalBooksSpan.textContent = 'Összes könyv: ' + totalBooks(books);
    borrowedBooksSpan.textContent = 'Kölcsönzött könyvek: ' + borrowedBooksCount(books);
}
window.borrow = function(id) {
    books = borrowBook(books, id);
    render();
}
window.giveBack = function(id) {
    books = returnBook(books, id);
    render();
}
window.remove = function(id) {
    books = deleteBook(books, id);
    render();
}
filterAuthorBtn.onclick = function() {
    var author = filterAuthorInput.value;
    if (author.trim() === '') {
        render();
        return;
    }
    availableBooksList.innerHTML = '';
    filterByAuthor(availableBooks(books), author).forEach(function(book) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + book.cim + '</strong> (' + book.szerzo + ', ' + book.kiadasEve + ')' +
            '<span class="actions">' +
            '<button onclick="borrow(' + book.azonosito + ')">Kölcsönzés</button>' +
            '<button class="delete" onclick="remove(' + book.azonosito + ')">Törlés</button>' +
            '</span>';
        availableBooksList.appendChild(li);
    });
}
render();

let books = [];
let nextId = 1;


function addBook(books, cim, szerzo, kiadasEve) {
   
    return [...books, {
        azonosito: nextId++,
        cim: cim,
        szerzo: szerzo,
        kiadasEve: parseInt(kiadasEve),
        kolcsonozve: false
    }];
}


const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
addBookForm.onsubmit = function(e) {
    e.preventDefault();
    books = addBook(books, titleInput.value, authorInput.value, yearInput.value);
    addBookForm.reset();
    render();
}
  
function borrowBook(books, id) {
    
    return books.map(function(book) {
        if (book.azonosito === id) {
            return { ...book, kolcsonozve: true };
        }
        return book;
    });
}
function returnBook(books, id) {
    return books.map(function(book) {
        if (book.azonosito === id) {
            return { ...book, kolcsonozve: false };
        }
        return book;
    });
}
function deleteBook(books, id) {
    return books.filter(function(book) {
        return book.azonosito !== id;
    });
}

