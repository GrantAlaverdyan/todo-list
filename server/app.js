const express = require("express");
const app = express();
const cors = require("cors");
const pg = require("pg");
const bodyParser = require('body-parser')
app.use(
    cors({
      origin: "*",
    })
);
const configDB = {
    user: "postgres",
    database: "todo_list",
    password: "Gr345tem",
    port: 5432,
};
const pool = new pg.Pool(configDB);
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get("/", (req, res)=>{
  res.send("Hello world")
})

app.get("/show-todo", (req, res)=>{
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(
            `SELECT * FROM public.todo_list`, function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).json({ response: result.rows });
            }
        )
    })
})

app.get("/save-input", (req, res) => {
  console.log(req.query);
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }

        client.query(
            `INSERT INTO todo_list(task, status) VALUES('${req.query.todo}', '${req.query.status}'); `,
            function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).json({ response: 1});
            }
        );
    });
});

app.post('/edit-todo', function (req, res) {
    console.log(req.body)
    const task = req.body.changeTodo
    const status = req.body.status
    const id = req.body.id
    let query;
    if (!req.status) {
        query = `UPDATE todo_list SET task='${task}' WHERE id=${id};`
    } else {
        query = `UPDATE todo_list SET task='${task}', status='${status}' WHERE id=${id};`
    }

        pool.connect(function (err, client, done) {

            if (err) {
                console.log("Can not connect to the DB" + err);
            }
            client.query(query,
                function (err, result) {
                    done();
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    res.status(200).json({ response: 'success' });
                })
        })
})



app.post('/delete-todo', function (req, res) {
    console.log(req.body)
    pool.connect(function (err, client, done) {

        if (err) {
            console.log("Can not connect to the DB" + err);
        }


        client.query(`DELETE from todo_list where id='${req.body.id}';`, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).json({ response: 'success' });
        })
    })

})

app.listen(5000, console.log("Server is online"))