async function buscarFilmes() {

    // ir ao backend, acessar a rota GET e mostrar os filmes na tela.
    const resposta = await fetch("https://filmes-two-flax.vercel.app")

    const filmes = await resposta.json()

    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        const API = "https://filmes-two-flax.vercel.app"


        async function buscarFilmes() {
        
            const sectionFilmes =
                document.querySelector(".filmes")
        
            const quantidade =
                document.querySelector("#quantidade-filmes")
        
        
            try {
        
                const resposta = await fetch(API)
        
        
                if (!resposta.ok) {
        
                    throw new Error(
                        "Não foi possível carregar os filmes."
                    )
        
                }
        
        
                const filmes = await resposta.json()
        
        
                sectionFilmes.innerHTML = ""
        
        
                quantidade.textContent =
                    `${filmes.length} filme(s)`
        
        
                if (filmes.length === 0) {
        
                    sectionFilmes.innerHTML = `
        
                        <div class="mensagem">
        
                            Nenhum filme cadastrado.
        
                        </div>
        
                    `
        
                    return
        
                }
        
        
                filmes.forEach((filme) => {
        
                    const classificacao =
                        filme.rating > 0
                            ? `${filme.rating} anos`
                            : "Livre"
        
        
                    sectionFilmes.innerHTML += `
        
                        <article class="filme">
        
                            <div class="filme-conteudo">
        
                                <p class="filme-id">
        
                                    FILME #${filme.id}
        
                                </p>
        
        
                                <h3>
        
                                    ${filme.title}
        
                                </h3>
        
        
                                <div class="informacoes">
        
        
                                    <div class="informacao">
        
                                        <span>
                                            Gênero
                                        </span>
        
                                        <span>
                                            ${filme.genre}
                                        </span>
        
                                    </div>
        
        
                                    <div class="informacao">
        
                                        <span>
                                            Duração
                                        </span>
        
                                        <span>
                                            ${filme.duration} min
                                        </span>
        
                                    </div>
        
        
                                    <div class="informacao">
        
                                        <span>
                                            Classificação
                                        </span>
        
                                        <span>
                                            ${classificacao}
                                        </span>
        
                                    </div>
        
        
                                </div>
        
                            </div>
        
        
                            <div class="acoes">
        
        
                                <button
                                    class="botao botao-editar"
                                    onclick="editarFilme(${filme.id})"
                                >
        
                                    Editar
        
                                </button>
        
        
                                <button
                                    class="botao botao-apagar"
                                    onclick="apagarFilme(
                                        ${filme.id},
                                        '${filme.title.replace(/'/g, "\\'")}'
                                    )"
                                >
        
                                    Apagar
        
                                </button>
        
        
                            </div>
        
                        </article>
        
                    `
        
                })
        
        
            } catch (error) {
        
                console.error(error)
        
        
                sectionFilmes.innerHTML = `
        
                    <div class="mensagem">
        
                        Não foi possível carregar os filmes.
        
                    </div>
        
                `
        
            }
        
        }
        
        
        function editarFilme(id) {
        
            window.location.href =
                `./editar/editar.html?id=${id}`
        
        }
        
        
        async function apagarFilme(id, titulo) {
        
            const confirmar = confirm(
                `Deseja realmente apagar "${titulo}"?`
            )
        
        
            if (!confirmar) {
        
                return
        
            }
        
        
            try {
        
                const resposta = await fetch(
                    `${API}/delete-movie/${id}`,
        
                    {
                        method: "DELETE"
                    }
                )
        
        
                if (!resposta.ok) {
        
                    throw new Error(
                        "Erro ao apagar o filme."
                    )
        
                }
        
        
                alert(
                    "Filme apagado com sucesso."
                )
        
        
                buscarFilmes()
        
        
            } catch (error) {
        
                console.error(error)
        
        
                alert(
                    "Não foi possível apagar o filme."
                )
        
            }
        
        }
        
        
        buscarFilmes()
        sectionFilmes.innerHTML += `

            <div>

                <h2>${filme.title}</h2>

                <p><strong>Gênero:</strong> ${filme.genre}</p>

                <p><strong>Duração:</strong> ${filme.duration} minutos</p>

                <p><strong>Classificação indicativa:</strong> ${filme.rating > 0 ? filme.rating + ' anos' : 'Livre'}</p>

            </div>

        `
    })
}

buscarFilmes()