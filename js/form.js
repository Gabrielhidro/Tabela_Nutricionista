var adicionar = document.querySelector('#adicionar-paciente');
  adicionar.addEventListener('click', function(event){
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  var paciente = obtemPaciente(form);
  var pacienteTr = montaTr(paciente);
  var erros = validaPaciente(paciente);
  if(erros.length > 0){
   exibeMensagemErro(erros);

    return;
  }
  

  var tabela = document.querySelector('#tabela-pacientes');

  tabela.appendChild(pacienteTr);

  form.reset();
});

function exibeMensagemErro(erros){
  var ul = document.querySelector("#mensagem-erro")
  erros.forEach(function(erro){
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  })
}

function obtemPaciente(form){
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
  return paciente;
}

function montaTr(paciente){
  var pacienteTr = document.createElement("tr")
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura,"info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura,"info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc,"info-imc"));

  return pacienteTr;
}

function montaTd(dado,classe){
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

function validaPaciente(paciente){
  var erros = [];
  if(!validaPeso(paciente.peso)) erros.push("peso é inválido!")
  if(!validaAltura(paciente.altura)) erros.push("Altura é inválida!")

  return erros;
}