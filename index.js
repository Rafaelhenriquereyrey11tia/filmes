import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
const app = express()

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes_03MA"
})
app.use(cors())
app.use(express.json())

// Mostrar todos os filmes
app.get("/all-movies", (request, response) => {

    const selectCommand = "SELECT * FROM filmes_Reyrey"

    database.query(selectCommand, (error, data) => {

        if (error) {
            console.log(error)
            return response.status(500).json(error)
        }

        response.json(data)

    })

})

// Cadastrar filme
app.post("/create-movie", (request, response) => {

    const { title, genre, duration, rating } = request.body

    const insertCommand =
        "INSERT INTO filmes_Reyrey(title, genre, duration, rating) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [title, genre, duration, rating], (error) => {

        if (error) {

            console.log("ERRO:", error)

            return response.status(500).json(error)

        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })

    })

})

// Atualizar filme
app.put("/update-movie/:id", (request, response) => {

    const { id } = request.params
    const { title, genre, duration, rating } = request.body

    const updateCommand =
        "UPDATE filmes_Reyrey SET title = ?, genre = ?, duration = ?, rating = ? WHERE id = ?"

    database.query(updateCommand, [title, genre, duration, rating, id], (error) => {

        if (error) {

            console.log("ERRO:", error)

            return response.status(500).json(error)

        }

        response.json({
            message: "Filme atualizado com sucesso!"
        })

    })

})

// Excluir filme
app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_Reyrey WHERE id = ?"

    database.query(deleteCommand, [id], (error) => {

        if (error) {

            console.log("ERRO:", error)

            return response.status(500).json(error)

        }

        response.json({
            message: "Filme apagado com sucesso!"
        })

    })

})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})