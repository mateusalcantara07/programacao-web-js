const turma = [
    { nome: "Ana Souza", media: 8.5 },
    { nome: "Bruno Lima", media: 5.2 }
];

const tabela = document.querySelector("#tabela");
const quadro = document.querySelector("#quadro");
const vazio = document.querySelector("#vazio");
const form = document.querySelector("#form-aluno");
const aviso = document.querySelector("#aviso");
const busca = document.querySelector("#busca");

// Busca em tempo real
busca.addEventListener("input", function () {

    const termo = busca.value.toLowerCase();

    const achados = turma.filter(function (aluno) {
        return aluno.nome.toLowerCase().includes(termo);
    });

    mostrarTurma(achados);

});

// Cria uma célula
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// Mostra a turma na tabela
function mostrarTurma(lista) {

    if (lista.length === 0) {
        quadro.hidden = true;
        vazio.hidden = false;
        return;
    }

    quadro.hidden = false;
    vazio.hidden = true;

    tabela.textContent = "";

    for (const aluno of lista) {

        let situacao = "reprovado";

        if (aluno.media >= 6) {
            situacao = "aprovado";
        }

        const linha = document.createElement("tr");

        linha.classList.add(situacao);

        linha.append(
            criarCelula(aluno.nome),
            criarCelula(aluno.media.toFixed(1)),
            criarCelula(situacao)
        );

        tabela.append(linha);
    }
}

// Cadastro
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = form.nome.value.trim();
    const nota = Number(form.nota.value);

    form.nome.classList.remove("campo-erro");
    form.nota.classList.remove("campo-erro");

    aviso.classList.remove("erro");


if (nome === "") {
    aviso.textContent = "Digite o nome do aluno.";
    aviso.classList.add("erro");
    form.nome.classList.add("campo-erro");
    form.nome.focus();
    return;
}

if (nome.length < 3) {
    aviso.textContent = "O nome deve ter pelo menos 3 letras.";
    aviso.classList.add("erro");
    form.nome.classList.add("campo-erro");
    form.nome.focus();
    return;
}

if (form.nota.value === "" || nota < 0 || nota > 10) {
    aviso.textContent = "A nota deve estar entre 0 e 10.";
    aviso.classList.add("erro");
    form.nota.classList.add("campo-erro");
    form.nota.focus();
    return;
}

aviso.classList.remove("erro");

    turma.push({
        nome: nome,
        media: nota
    });

    mostrarTurma(turma);

    aviso.textContent = nome + " cadastrado(a)!";

    form.reset();
    form.nome.focus();

});

// Mostra os alunos ao abrir a página
mostrarTurma(turma);