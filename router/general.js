const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
/*public_users.get('/',function (req, res) {
	
	return res.status(200).send(books);
});*/

public_users.get('/', async (req, res) => {
  try {
    return res.status(200).send(books);
  } catch (error) {
    return res.status(404).send("there was an error", error);
  }
});


// Get book details based on ISBN
/*public_users.get('/isbn/:isbn',function (req, res) {

	const isbnno = req.params.isbn;
	const output = books[isbnno];
	
	return res.status(200).json({ bookdetails: output});
 });*/

public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const isbnno = req.params.isbn;
    const output = books[isbnno];

    return res.status(200).json({ bookdetails: output});
  } catch (error) {
    return res.status(404).send("there was an error", error);
  }

});

  
// Get book details based on author
/*public_users.get('/author/:author',function (req, res) {
	const collection = [];
	const author = req.params.author;
	for (const key in books) {
		if (books[key].author === author) {
			collection.push(books[key]);
		};
	};

	if (Object.keys(collection).length === 0) {
		return res.status(404).send("Author not found");
	} else { return res.status(200).send(collection);
	};
});*/

public_users.get('/author/:author', async (req, res) => {
  try {
    const collection = [];
    const author = req.params.author;
    for (const key in books) {
      if (books[key].author === author) {
        collection.push(books[key]);
      }
    }

    if (Object.keys(collection).length === 0) {
      return res.status(404).send("Author not found");
    } else {
      return res.status(200).send(collection);
    }
  } catch (error) {
    return res.status(404).send("there was an error", error);
  }
});


// Get all books based on title
/*public_users.get('/title/:title',function (req, res) {
	
	const book = [];
	const title = req.params.title;

	for (const key in books) {
		if (books[key].title === title) {
			book.push(key);
			book.push(books[key]);
		};
	};

	if (Object.keys(book).length === 0) {
		return res.status(404).send("Title not found");
	} else { return res.status(200).json(book);
	};
});
*/

public_users.get('/title/:title', async (req, res) => {
  try {
    const book = [];
    const title = req.params.title;

    for (const key in books) {
      if (books[key].title === title) {
        book.push(key);
        book.push(books[key]);
      }
    }

    if (Object.keys(book).length === 0) {
      return res.status(404).send("Title not found");
    } else {
      return res.status(200).json(book);
    }
  } catch (error) {
    return res.status(404).send("there was an error", error);
  }
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
	
	const isbnn = req.params.isbn;
	const bookno = books[isbnn]
		

	if (isbnn === null) {
		return res.status(404).send("No review found");
	} else { return res.status(200).send(bookno.review);
	};
});


module.exports.general = public_users;
