async function cadastrarFilme() {
    const inputTitle = document.getElementById("title")
    const inputGender = document.getElementById("gender")
    const inputAgeLimit = document.getElementById("ageLimit")
    const inputDuration = document.getElementById("duration")

    if (
        inputTitle.value === "" ||
        inputGender.value === "" ||
        inputAgeLimit.value === "" ||
        inputDuration.value === ""
    ) {
        alert("Preencha todas as informações!")
        return
    }

    const filme = {
        title: inputTitle.value,
        genre: inputGender.value,
        rating: inputAgeLimit.valueAsNumber,
        duration: inputDuration.valueAsNumber
    }

    const informacoesAEnviar = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    }

    const resposta = await fetch(
        "https://filmes-two-flax.vercel.app/create-movie",
        informacoesAEnviar
    )

    const mensagemDecifrada = await resposta.json()

    console.log(mensagemDecifrada)

    alert(mensagemDecifrada.message)

    window.location.href = "../index.html"
}