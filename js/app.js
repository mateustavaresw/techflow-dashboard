const html = document.documentElement;
const botoesTema = document.querySelectorAll('.btn-tema');
const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

function aplicarTema(tema) {
  if (tema === 'dark' || (tema === 'system' && sistemaEscuro.matches)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  botoesTema.forEach(function (botao) {
    if (botao.dataset.tema === tema) {
      botao.classList.add('bg-indigo-600', 'text-white');
    } else {
      botao.classList.remove('bg-indigo-600', 'text-white');
    }
  });
}

botoesTema.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const tema = botao.dataset.tema;
    localStorage.setItem('techflow-tema', tema);
    aplicarTema(tema);
  });
});

sistemaEscuro.addEventListener('change', function () {
  if (localStorage.getItem('techflow-tema') === 'system') {
    aplicarTema('system');
  }
});

aplicarTema(localStorage.getItem('techflow-tema') || 'system');


const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const btnAbrirSidebar = document.getElementById('btn-abrir-sidebar');
const btnFecharSidebar = document.getElementById('btn-fechar-sidebar');

function abrirSidebar() {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
}

function fecharSidebar() {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
}

btnAbrirSidebar.addEventListener('click', abrirSidebar);
btnFecharSidebar.addEventListener('click', fecharSidebar);
overlay.addEventListener('click', fecharSidebar);


const btnUsuario = document.getElementById('btn-usuario');
const menuUsuario = document.getElementById('menu-usuario');

function fecharMenu() {
  menuUsuario.classList.add('invisible', 'opacity-0');
}

btnUsuario.addEventListener('click', function (evento) {
  evento.stopPropagation();
  menuUsuario.classList.toggle('invisible');
  menuUsuario.classList.toggle('opacity-0');
});

document.addEventListener('click', fecharMenu);

document.querySelectorAll('a[href="#"]').forEach(function (link) {
  link.addEventListener('click', function (evento) {
    evento.preventDefault();
  });
});


const modal = document.getElementById('modal');
const modalCaixa = document.getElementById('modal-caixa');
const form = document.getElementById('form-projeto');
const btnSalvar = document.getElementById('btn-salvar');

const nome = document.getElementById('nome');
const responsavel = document.getElementById('responsavel');
const categoria = document.getElementById('categoria');
const grupoPrioridade = document.getElementById('grupo-prioridade');
const prazo = document.getElementById('prazo');
const descricao = document.getElementById('descricao');

function pegarHoje() {
  const data = new Date();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return data.getFullYear() + '-' + mes + '-' + dia;
}

function abrirModal() {
  modal.classList.remove('invisible', 'opacity-0');
  modalCaixa.classList.remove('scale-95');
  prazo.min = pegarHoje();

  setTimeout(function () {
    nome.focus();
  }, 100);
}

function limparFormulario() {
  form.reset();

  [nome, responsavel, categoria, prazo, descricao].forEach(function (campo) {
    campo.classList.remove('border-red-500', 'border-emerald-500');
    campo.classList.add('border-slate-400');
  });

  document.querySelectorAll('.erro').forEach(function (erro) {
    erro.classList.add('hidden');
  });

  btnSalvar.disabled = false;
  btnSalvar.textContent = 'Salvar projeto';
}

function fecharModal() {
  modal.classList.add('invisible', 'opacity-0');
  modalCaixa.classList.add('scale-95');
  limparFormulario();
}

document.getElementById('btn-novo-projeto').addEventListener('click', abrirModal);
document.getElementById('btn-fechar-modal').addEventListener('click', fecharModal);
document.getElementById('btn-cancelar').addEventListener('click', fecharModal);

modal.addEventListener('click', function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') {
    fecharModal();
    fecharMenu();
    fecharSidebar();
  }
});


function validar(campo, valido, mensagem) {
  const erro = campo.closest('.bloco').querySelector('.erro');

  campo.classList.remove('border-slate-400', 'border-red-500', 'border-emerald-500');

  if (valido) {
    campo.classList.add('border-emerald-500');
    erro.classList.add('hidden');
  } else {
    campo.classList.add('border-red-500');
    erro.textContent = mensagem;
    erro.classList.remove('hidden');
  }

  return valido;
}

function validarNome() {
  return validar(nome, nome.value.trim().length >= 3, 'Digite um nome com pelo menos 3 letras.');
}

function validarResponsavel() {
  return validar(responsavel, responsavel.value !== '', 'Escolha um responsável.');
}

function validarCategoria() {
  return validar(categoria, categoria.value !== '', 'Escolha uma categoria.');
}

function validarPrioridade() {
  const marcada = document.querySelector('input[name="prioridade"]:checked');
  return validar(grupoPrioridade, marcada !== null, 'Escolha a prioridade.');
}

function validarPrazo() {
  if (prazo.value === '') {
    return validar(prazo, false, 'Informe o prazo.');
  }
  return validar(prazo, prazo.value >= pegarHoje(), 'O prazo não pode ser uma data que já passou.');
}

function validarDescricao() {
  return validar(descricao, descricao.value.trim().length >= 10, 'Escreva pelo menos 10 caracteres.');
}

nome.addEventListener('blur', validarNome);
responsavel.addEventListener('change', validarResponsavel);
categoria.addEventListener('change', validarCategoria);
prazo.addEventListener('change', validarPrazo);
descricao.addEventListener('blur', validarDescricao);
document.querySelectorAll('input[name="prioridade"]').forEach(function (radio) {
  radio.addEventListener('change', validarPrioridade);
});

form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const resultados = [
    validarNome(),
    validarResponsavel(),
    validarCategoria(),
    validarPrioridade(),
    validarPrazo(),
    validarDescricao()
  ];

  if (resultados.includes(false)) {
    return;
  }

  btnSalvar.disabled = true;
  btnSalvar.textContent = 'Salvando...';

  const nomeDoProjeto = nome.value.trim();

  setTimeout(function () {
    criarCard();
    fecharModal();
    mostrarAviso('Projeto "' + nomeDoProjeto + '" cadastrado com sucesso!');
  }, 700);
});


const lista = document.getElementById('lista-projetos');
const contador = document.getElementById('contador');
const totalAtivos = document.getElementById('total-ativos');
const campoBusca = document.getElementById('busca');
const semResultado = document.getElementById('sem-resultado');
const aviso = document.getElementById('aviso');

const coresPrioridade = {
  'Alta': 'text-red-600 dark:text-red-400',
  'Média': 'text-amber-600 dark:text-amber-400',
  'Baixa': 'text-emerald-600 dark:text-emerald-400'
};

function atualizarContador(quantidade) {
  if (quantidade === 1) {
    contador.textContent = '1 projeto';
  } else {
    contador.textContent = quantidade + ' projetos';
  }
}

function criarCard() {
  const partesData = prazo.value.split('-');
  const dataFormatada = partesData[2] + '/' + partesData[1] + '/' + partesData[0];
  const prioridade = document.querySelector('input[name="prioridade"]:checked').value;

  const card = document.createElement('article');
  card.className = 'group flex flex-col rounded-lg border border-indigo-400 bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:bg-slate-800';

  card.innerHTML =
    '<div class="flex items-center justify-between">' +
      '<span class="card-categoria rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-700"></span>' +
      '<span class="card-prioridade text-xs font-semibold"></span>' +
    '</div>' +
    '<h3 class="card-nome mt-3 font-semibold transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400"></h3>' +
    '<p class="card-descricao mt-1 text-sm text-slate-500 dark:text-slate-400"></p>' +
    '<div class="mt-auto pt-4">' +
      '<div class="flex justify-between text-xs text-slate-500 dark:text-slate-400"><span class="card-responsavel"></span><span>0%</span></div>' +
      '<div class="mt-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700"><div class="h-2 w-0 rounded-full bg-indigo-600"></div></div>' +
      '<p class="card-prazo mt-2 text-xs text-slate-500 dark:text-slate-400"></p>' +
    '</div>';

  card.querySelector('.card-categoria').textContent = categoria.value;
  card.querySelector('.card-prioridade').textContent = prioridade;
  card.querySelector('.card-prioridade').className += ' ' + coresPrioridade[prioridade];
  card.querySelector('.card-nome').textContent = nome.value.trim();
  card.querySelector('.card-descricao').textContent = descricao.value.trim();
  card.querySelector('.card-responsavel').textContent = responsavel.value;
  card.querySelector('.card-prazo').textContent = 'Prazo: ' + dataFormatada;

  campoBusca.value = '';
  filtrarProjetos();

  lista.prepend(card);
  totalAtivos.textContent = Number(totalAtivos.textContent) + 1;
  atualizarContador(lista.children.length);
}

function filtrarProjetos() {
  const termo = campoBusca.value.toLowerCase();
  let visiveis = 0;

  for (let i = 0; i < lista.children.length; i++) {
    const card = lista.children[i];

    if (card.textContent.toLowerCase().includes(termo)) {
      card.classList.remove('hidden');
      visiveis++;
    } else {
      card.classList.add('hidden');
    }
  }

  if (visiveis === 0) {
    semResultado.classList.remove('hidden');
  } else {
    semResultado.classList.add('hidden');
  }

  atualizarContador(visiveis);
}

campoBusca.addEventListener('input', filtrarProjetos);

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(function () {
    aviso.classList.add('hidden');
  }, 3500);
}
