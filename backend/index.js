import express  from "express";
import mysql from "mysql2"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "root",
    database: "test",
})

db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL database!");
});


app.use(express.json())//return json data using the api server postman

app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello World from the backend!!!")
})

//postman -> get method  http://localhost:8800/books
app.get("/books", (req,res)=>{
    const query = "SELECT * FROM books"
    db.query(query, (err,data)=>{
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
  })


  //postman ---> post method
  //json body bellow
  //----------------------------- http://localhost:8800/books
  //{
// "title": "title from client",
// "description": "description from client",
// "cover": "cover from client"
// }

  app.post("/books", (req,res)=>{
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover
    ]

    db.query(query, [values], (err,data)=>{
        if (err) return res.status(500).json(err)
        return res.json("Book has been created successfully!!!")
    })
  })

  app.delete("/books/:id", (req,res)=>{
      const bookID = req.params.id
      const query = "DELETE FROM books WHERE id = ?"

      db.query(query, [bookID], (err, data)=>{
          if (err) return res.status(500).json(err)
        return res.json("Book has been deleted successfully!!!")
      } )
  })

  app.put("/books/:id", (req,res)=>{
    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data)=>{
        if (err) return res.status(500).json(err)
        return res.json("Book has been updated successfully!!!")
    } )
})

const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", ()=>{
    console.log("Server is running on 8800, Connect to the backend!!!!")
})

//npm start