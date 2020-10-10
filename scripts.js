// Array onde sera salvo as tarefas
let toDoItems = [];

// Funcao que adiciona uma tarefa dentro do array de tarefas
function addToDo(text){
  const toDo = {
    text,
    checked: false,
    id: Date.now()
  };
  // Enviar tarefa para lista de tarefas
  toDoItems.push(toDo);
  renderToDo(toDo);
  console.log('Lista de Tarefas', toDoItems);
};

  //marcar tarefa como concluída
  function toggleDone(key){
    //buscando índice da tarefa dentro do array de tarefas de acordo com a key (id)
    const index = toDoItems.findIndex(function (item){
      return item.id === Number(key);
    })
    //inversão do value da checked (negação do estado anterior)
    toDoItems[index].checked = !toDoItems[index].checked
    renderToDo(toDoItems[index]);
  };

  //excluir tarefa
  function deleteToDo(key){
    //buscando índice da tarefa dentro do array de tarefas de acordo com a key (id)
    const index = toDoItems.findIndex(function (item){
      return item.id === Number(key);
    })
    //adicionar um parâmetro dentro do objeto deletado, chamado deleted = true
    const toDo = {
      deleted: true,
      ...toDoItems[index]
    }
    toDoItems = toDoItems.filter(item => item.id !== Number(key));
    renderToDo(toDo);
  };

    // Buscar elemento formulario do DOM
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  //ARROW FUNCTION - "função de uma linha"
  event.preventDefault();
      // buscar elemento do input do DOM (tracker)
  const input = document.querySelector('.js-todo-input');
      // Buscando valor que o usuario digita no input.
  const text = input.value.trim();

  if (text !== ''){
    addToDo(text);
    input.value = '';
    input.focus();
  }
})

// Funcao que renderiza os toDo's na tela
function renderToDo(toDo){
  localStorage.setItem('ToDoItems', JSON.stringify(toDoItems));

    // Tracker a lista onde deve ser incluida os todos.
  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${toDo.id}']`);

    // cria o li no DOM dentro da ul
  const listItem = document.createElement('li');

  //verificação de if ternário (código resumido do if) onde, após o "?" vem o valor if true, e após o ":" vem o valor if false
  const isChecked = toDo.checked ? 'done' : '';

  if(toDo.deleted){
    item.remove();
    return
  }
  
  //conforme verificação acima, a classe é atribuída no listItem
  listItem.setAttribute('class', `todo-item ${isChecked}`);
  //filtro de data-key para identificação do elemento no array
  listItem.setAttribute('data-key', `${toDo.id}`);

  listItem.innerHTML = `
    <input id='${toDo.id}' type="checkbox" />
    <label for="${toDo.id}" class="tick js-tick"></label>
    <span>${toDo.text}</span>
    <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
    </button>
    `;
  
    //verificação para, caso o documento já contenha o id alterado para checked=true, será "replace", ou caso ainda não tenha, será "append" (adicionado)
  if(item){
    list.replaceChild(listItem, item)
  }else{
  list.append(listItem);
  }
}

//marcar tarefa como concluída
//selecionar lista de tarefas
const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event =>{
  if (event.target.classList.contains('js-tick')){
    //buscar o data customizado e chamar a função que marca a tarefa como concluída
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  //saber se o usuário clicou no botão de delete e salva o id(key) do elemento clicado
  if(event.target.classList.contains('js-delete-todo')){
    //buscar o data customizado e chamar a função que marca a tarefa como excluída
    const itemKey = event.target.parentElement.dataset.key;
    deleteToDo(itemKey);
  }
});

document.addEventListener('DOMContentLoad', () =>{
  const lista = localStorage.getItem('ToDoItems');
  if (lista){
    toDoItems = JSON.parse(lista);
    toDoItems.forEach(toDo => {
      renderToDo(toDo);
    })
  }
})

//FONTE: https://freshman.tech/todo-list/