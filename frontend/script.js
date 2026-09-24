const URL_API = "https://filmes-two-flax.vercel.app"


async function buscarFilmes() {

    const sectionFilmes = document.querySelector(".filmes")
    const quantidadeFilmes = document.querySelector("#quantidade-filmes")

    try {

        const resposta = await fetch(`${URL_API}/all-movies`)

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`)
        }

        const filmes = await resposta.json()

        console.log("Filmes recebidos:", filmes)

        if (!Array.isArray(filmes)) {
            throw new Error("O servidor não retornou uma lista de filmes.")
        }

        quantidadeFilmes.textContent =
            `${filmes.length} filme${filmes.length !== 1 ? "s" : ""}`

        sectionFilmes.innerHTML = ""

        if (filmes.length === 0) {

            sectionFilmes.innerHTML = `
                <div class="mensagem">
                    <strong>Nenhum filme cadastrado</strong>
                    <span>Cadastre um filme para começar.</span>
                </div>
            `

            return
        }


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
                        onclick="editarFilme(${filme.id})">
                        Editar
                    </button>

                    <button
                        class="botao-apagar"
                        onclick="apagarFilme(${filme.id})">
                        Apagar
                    </button>

                </div>
            `

            sectionFilmes.appendChild(card)

        })

    } catch (error) {

        console.error("Erro ao buscar filmes:", error)

        sectionFilmes.innerHTML = `
            <div class="mensagem">
                <strong>Erro ao carregar os filmes</strong>
                <span>Não foi possível carregar os dados.</span>
            </div>
        `
    }
}


// ========================================
// EDITAR
// ========================================

function editarFilme(id) {

    window.location.href = `./editar/editar.html?id=${id}`

}


// ========================================
// APAGAR
// ========================================

async function apagarFilme(id) {

    const confirmar = confirm(
        "Deseja realmente apagar este filme?"
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

            alert(
                mensagem.message ||
                "Erro ao apagar o filme."
            )

            return
        }

        alert(
            mensagem.message ||
            "Filme apagado com sucesso!"
        )

        buscarFilmes()

    } catch (error) {

        console.error(error)

        alert("Erro ao conectar com o servidor.")

    }
}


// ========================================
// INICIAR
// ========================================

buscarFilmes()