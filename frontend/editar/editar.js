const URL_API = "https://filmes-two-flax.vercel.app"


const parametros = new URLSearchParams(window.location.search)

const id = parametros.get("id")


const formulario = document.querySelector("#formulario-edicao")

const inputTitle = document.querySelector("#title")
const inputGender = document.querySelector("#gender")
const inputAgeLimit = document.querySelector("#ageLimit")
const inputDuration = document.querySelector("#duration")


if (!id) {

    alert("ID do filme não informado.")

    window.location.href = "../index.html"
}


// ========================================
// BUSCAR FILME
// ========================================

async function buscarFilme() {

    try {

        const resposta = await fetch(URL_API)

        const filmes = await resposta.json()


        const filme = filmes.find(
            filme => filme.id == id
        )


        if (!filme) {

            alert("Filme não encontrado.")

            window.location.href = "../index.html"

            return
        }


        inputTitle.value = filme.title

        inputGender.value = filme.genre

        inputAgeLimit.value = filme.rating

        inputDuration.value = filme.duration


    } catch (error) {

        console.error(error)

        alert("Não foi possível carregar o filme.")
    }

}


// ========================================
// ATUALIZAR FILME
// ========================================

formulario.addEventListener("submit", async (event) => {

    event.preventDefault()


    if (
        inputTitle.value.trim() === "" ||
        inputGender.value.trim() === "" ||
        inputAgeLimit.value === "" ||
        inputDuration.value === ""
    ) {

        alert("Preencha todas as informações.")

        return
    }


    const filmeAtualizado = {

        title: inputTitle.value.trim(),

        genre: inputGender.value.trim(),

        rating: inputAgeLimit.valueAsNumber,

        duration: inputDuration.valueAsNumber

    }


    try {

        const resposta = await fetch(
            `${URL_API}/update-movie/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(filmeAtualizado)
            }
        )


        const mensagem = await resposta.json()


        if (!resposta.ok) {

            alert(mensagem.message)

            return
        }


        alert(mensagem.message)

        window.location.href = "../index.html"


    } catch (error) {

        console.error(error)

        alert("Não foi possível atualizar o filme.")
    }

})


buscarFilme()