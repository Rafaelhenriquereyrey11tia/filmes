const API = "https://filmes-two-flax.vercel.app"


const parametros =
    new URLSearchParams(
        window.location.search
    )


const id = parametros.get("id")


const formulario =
    document.querySelector("#form-edicao")


const inputTitle =
    document.querySelector("#title")


const inputGenre =
    document.querySelector("#genre")


const inputDuration =
    document.querySelector("#duration")


const inputRating =
    document.querySelector("#rating")


const mensagem =
    document.querySelector("#mensagem")


async function carregarFilme() {


    if (!id) {

        mensagem.textContent =
            "Filme não encontrado."

        formulario.style.display =
            "none"

        return

    }


    try {


        const resposta =
            await fetch(API)


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar filmes."
            )

        }


        const filmes =
            await resposta.json()


        const filme =
            filmes.find(
                filme => filme.id == id
            )


        if (!filme) {

            mensagem.textContent =
                "Filme não encontrado."

            formulario.style.display =
                "none"

            return

        }


        inputTitle.value =
            filme.title


        inputGenre.value =
            filme.genre


        inputDuration.value =
            filme.duration


        inputRating.value =
            filme.rating


    } catch (error) {


        console.error(error)


        mensagem.textContent =
            "Não foi possível carregar o filme."


    }

}


formulario.addEventListener(
    "submit",
    async (event) => {


        event.preventDefault()


        const filmeAtualizado = {

            title:
                inputTitle.value,

            genre:
                inputGenre.value,

            duration:
                Number(
                    inputDuration.value
                ),

            rating:
                Number(
                    inputRating.value
                )

        }


        try {


            const resposta =
                await fetch(
                    `${API}/update-movie/${id}`,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                filmeAtualizado
                            )

                    }
                )


            if (!resposta.ok) {

                throw new Error(
                    "Erro ao atualizar filme."
                )

            }


            mensagem.textContent =
                "Filme atualizado com sucesso."


            setTimeout(() => {

                window.location.href =
                    "../index.html"

            }, 800)


        } catch (error) {


            console.error(error)


            mensagem.textContent =
                "Não foi possível atualizar o filme."


        }

    }
)


carregarFilme()