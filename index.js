import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()


// ========================================
// CONFIGURAÇÕES
// ========================================

app.use(cors())

app.use(express.json())


// ========================================
// CONEXÃO COM O BANCO DE DADOS
// ========================================

const database = mysql2.createPool({

    host: "benserverplex.ddns.net",

    user: "alunos",

    password: "senhaAlunos",

    database: "alunos_filmes_03MA",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

})


// ========================================
// ROTA PRINCIPAL
// ========================================

app.get("/", (request, response) => {

    response.json({
        message: "Servidor de filmes funcionando!"
    })

})


// ========================================
// LISTAR TODOS OS FILMES
// ========================================

app.get("/all-movies", (request, response) => {

    const command = `
        SELECT
            id,
            title,
            genre,
            duration,
            rating
        FROM filmes_Reyrey
        ORDER BY id DESC
    `


    database.query(command, (error, results) => {

        if (error) {

            console.log("ERRO AO BUSCAR FILMES:")
            console.log(error)

            return response.status(500).json({

                message: "Erro ao buscar os filmes.",

                error: error.message

            })

        }


        response.status(200).json(results)

    })

})


// ========================================
// CADASTRAR FILME
// ========================================

app.post("/create-movie", (request, response) => {

    console.log("================================")
    console.log("NOVO FILME RECEBIDO")
    console.log(request.body)
    console.log("================================")


    const {
        title,
        genre,
        duration,
        rating
    } = request.body


    // Verificar os dados recebidos

    if (
        !title ||
        !genre ||
        duration === undefined ||
        rating === undefined
    ) {

        return response.status(400).json({

            message: "Preencha todos os campos."

        })

    }


    const command = `
        INSERT INTO filmes_Reyrey
        (
            title,
            genre,
            duration,
            rating
        )
        VALUES (?, ?, ?, ?)
    `


    database.query(

        command,

        [
            title,
            genre,
            duration,
            rating
        ],

        (error, result) => {

            if (error) {

                console.log("================================")
                console.log("ERRO AO CADASTRAR")
                console.log(error)
                console.log("================================")


                return response.status(500).json({

                    message: "Erro ao cadastrar o filme.",

                    error: error.message

                })

            }


            response.status(201).json({

                message: "Filme cadastrado com sucesso!",

                id: result.insertId

            })

        }

    )

})


// ========================================
// ATUALIZAR FILME
// ========================================

app.put("/update-movie/:id", (request, response) => {

    const { id } = request.params


    const {
        title,
        genre,
        duration,
        rating
    } = request.body


    if (
        !title ||
        !genre ||
        duration === undefined ||
        rating === undefined
    ) {

        return response.status(400).json({

            message: "Preencha todos os campos."

        })

    }


    const command = `
        UPDATE filmes_Reyrey

        SET
            title = ?,
            genre = ?,
            duration = ?,
            rating = ?

        WHERE id = ?
    `


    database.query(

        command,

        [
            title,
            genre,
            duration,
            rating,
            id
        ],

        (error, result) => {

            if (error) {

                console.log("ERRO AO ATUALIZAR:")
                console.log(error)


                return response.status(500).json({

                    message: "Erro ao atualizar o filme.",

                    error: error.message

                })

            }


            if (result.affectedRows === 0) {

                return response.status(404).json({

                    message: "Filme não encontrado."

                })

            }


            response.status(200).json({

                message: "Filme atualizado com sucesso!"

            })

        }

    )

})


// ========================================
// APAGAR FILME
// ========================================

app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params


    const command = `
        DELETE FROM filmes_Reyrey
        WHERE id = ?
    `


    database.query(

        command,

        [id],

        (error, result) => {

            if (error) {

                console.log("ERRO AO APAGAR:")
                console.log(error)


                return response.status(500).json({

                    message: "Erro ao apagar o filme.",

                    error: error.message

                })

            }


            if (result.affectedRows === 0) {

                return response.status(404).json({

                    message: "Filme não encontrado."

                })

            }


            response.status(200).json({

                message: "Filme apagado com sucesso!"

            })

        }

    )

})


// ========================================
// SERVIDOR LOCAL + VERCEL
// ========================================

if (process.env.NODE_ENV !== "production") {

    app.listen(8080, () => {

        console.log(
            "Servidor rodando em http://localhost:8080"
        )

    })

}


// ========================================
// EXPORTAR PARA A VERCEL
// ========================================

export default app