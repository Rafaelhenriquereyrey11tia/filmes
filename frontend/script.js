const URL_API = "https://filmes-two-flax.vercel.app"


async function buscarFilmes() {

    const sectionFilmes = document.querySelector(".filmes")
    const quantidadeFilmes = document.querySelector("#quantidade-filmes")

    try {

        const resposta = await fetch(URL_API)

        if (!resposta.ok) {
            throw new Error("Erro ao buscar filmes.")
        }

        const filmes = await resposta.json()

        quantidadeFilmes.textContent =
            `${filmes.length} filme${filmes.length !== 1 ? "s" : ""}`


        if (filmes.length === 0) {

            sectionFilmes.innerHTML = `
                <div class="mensagem">
                    <strong>Nenhum filme cadastrado</strong>
                    <span>Cadastre o primeiro filme para começar o catálogo.</span>
                </div>
            `

            return
        }


        sectionFilmes.innerHTML = ""


        filmes.forEach((filme, index) => {

            const card = document.createElement("article")

            card.classList.add("filme")


            card.innerHTML = `

                <span class="filme-numero">
                    FILME ${String(index + 1).padStart(2, "0")}
                </span>

                <h3>${filme.title}</h3>

                <div class="filme-informacoes">

                    <div class="info">
                        <span>Gênero</span>
                        <strong>${filme.genre}</strong>
                    </div>

                    <div class="info">
                        <span>Classificação</span>
                        <strong>${filme.rating} anos</strong>
                    </div>

                    <div class="info">
                        <span>Duração</span>
                        <strong>${filme.duration} min</strong>
                    </div>

                    <div class="info">
                        <span>ID</span>
                        <strong>${filme.id}</strong>
                    </div>

                </div>

                <div class="filme-acoes">

                    <button
                        class="botao-editar"
                        onclick="editarFilme(${filme.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="botao-apagar"
                        onclick="apagarFilme(${filme.id}, '${filme.title.replace(/'/g, "\\'")}')"
                    >
                        Apagar
                    </button>

                </div>
            `

            sectionFilmes.appendChild(card)

        })

    } catch (error) {

        console.error(error)

        quantidadeFilmes.textContent = ""

        sectionFilmes.innerHTML = `
            <div class="mensagem">
                <strong>Não foi possível carregar os filmes</strong>
                <span>Verifique se o backend está funcionando.</span>
            </div>
        `
    }
}


// ========================================
// ABRIR EDIÇÃO
// ========================================

function editarFilme(id) {

    window.location.href = `./editar/editar.html?id=${id}`

}


// ========================================
// APAGAR FILME
// ========================================

async function apagarFilme(id, titulo) {

    const confirmar = confirm(
        `Deseja realmente apagar o filme "${titulo}"?`
    )


    if (!confirmar) {
        return
    }


    try {

        const resposta = await fetch(
            `${URL_API}/delete-movie/${id}`,
            {
                method: "DELETE"
            }
        )


        const mensagem = await resposta.json()


        if (!resposta.ok) {

            alert(mensagem.message)

            return
        }


        alert(mensagem.message)

        buscarFilmes()


    } catch (error) {

        console.error(error)

        alert("Não foi possível apagar o filme.")
    }

}


buscarFilmes()