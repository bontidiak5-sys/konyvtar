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

