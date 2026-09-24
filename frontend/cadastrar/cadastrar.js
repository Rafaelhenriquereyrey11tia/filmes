const URL_API = "https://filmes-two-flax.vercel.app"


async function cadastrarFilme(event) {

    event.preventDefault()


    // ========================================
    // PEGAR OS CAMPOS DO FORMULÁRIO
    // ========================================

    const inputTitle = document.getElementById("title")
    const inputGender = document.getElementById("gender")
    const inputAgeLimit = document.getElementById("ageLimit")
    const inputDuration = document.getElementById("duration")


    // ========================================
    // VALIDAR OS CAMPOS
    // ========================================

    if (
        inputTitle.value.trim() === "" ||
        inputGender.value.trim() === "" ||
        inputAgeLimit.value === "" ||
        inputDuration.value === ""
    ) {

        alert("Preencha todas as informações!")

        return
    }


    // ========================================
    // CRIAR OBJETO DO FILME
    // ========================================

    const filme = {

        title: inputTitle.value.trim(),

        genre: inputGender.value.trim(),

        duration: inputDuration.valueAsNumber,

        rating: inputAgeLimit.valueAsNumber

    }


    console.log("Filme enviado:", filme)


    // ========================================
    // ENVIAR PARA O BACKEND
    // ========================================

    try {

        const resposta = await fetch(
            `${URL_API}/create-movie`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(filme)
            }
        )


        // ========================================
        // LER A RESPOSTA
        // ========================================

        const textoResposta = await resposta.text()

        console.log("Resposta do servidor:", textoResposta)


        // Tenta transformar a resposta em JSON

        let mensagem

        try {

            mensagem = JSON.parse(textoResposta)

        } catch {

            console.error(
                "O servidor não retornou JSON:",
                textoResposta
            )

            alert(
                "O servidor apresentou um erro. " +
                "Verifique o backend e o Vercel."
            )

            return
        }


        // ========================================
        // VERIFICAR ERRO
        // ========================================

        if (!resposta.ok) {

            alert(
                mensagem.message ||
                "Erro ao cadastrar o filme."
            )

            return
        }


        // ========================================
        // CADASTRO REALIZADO
        // ========================================

        alert(
            mensagem.message ||
            "Filme cadastrado com sucesso!"
        )


        // Voltar para a página inicial

        window.location.href = "../index.html"


    } catch (error) {

        console.error(
            "Erro na comunicação com o servidor:",
            error
        )

        alert(
            "Não foi possível conectar com o servidor."
        )

    }

}


// ========================================
// FORMULÁRIO
// ========================================

const formulario = document.querySelector(
    "#formulario-filme"
)


if (formulario) {

    formulario.addEventListener(
        "submit",
        cadastrarFilme
    )

}