
document.addEventListener('DOMContentLoaded', () => {
    function createNewList(listName) {
        const newListContainer = document.createElement('div');
        newListContainer.className = 'list-container';

        const newListHeader = document.createElement('h2');
        newListHeader.innerText = listName;
        newListContainer.appendChild(newListHeader);

        const newList = document.createElement('ol');
        newList.className = 'sublist';

        let taskCounter = 1;

        const newForm = document.createElement('form');

        const newInput = document.createElement('input');
        newInput.id = `${listName}-task`;
        newInput.setAttribute('autocomplete', 'off');
        newInput.setAttribute('autofocus', 'true');
        newInput.setAttribute('placeholder', 'New Task');
        newInput.setAttribute('type', 'text');

        const newSubmit = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');

        newForm.appendChild(newInput);
        newForm.appendChild(newSubmit);

        newForm.className = 'task-form';

        newForm.onsubmit = (event) => {
            event.preventDefault();

            const cb = document.createElement("INPUT");
            cb.className = 'marcador';
            cb.setAttribute("type", "checkbox");

            const li = document.createElement('li');
            li.appendChild(cb);

            const taskText = document.querySelector(`#${listName}-task`).value;
            const taskTextNode = document.createTextNode(`${taskCounter}.- ${taskText}`);
            taskCounter++;

            li.appendChild(taskTextNode);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'button-eliminarTask';
            deleteButton.innerText = 'x';
            deleteButton.onclick = () => {
                li.remove();
            };

            li.appendChild(deleteButton);

            cb.onchange = function () 
            {
                if (this.checked) 
                {
                    li.style.textDecoration = 'line-through';
                } 
                else 
                {
                    li.style.textDecoration = 'none';
                }
            };

            document.querySelector(`#${listName}-task`).value = '';
            newList.appendChild(li);

            return false;
        };

        const marcarTodo = document.createElement('button');
        marcarTodo.className = 'button-marcarTodo';
        marcarTodo.innerText = 'Marcar Todo';

        marcarTodo.onclick = () => {
            const checkboxes = newList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = !checkbox.checked;
                const li = checkbox.parentNode;
                if (checkbox.checked) 
                {
                    li.style.textDecoration = 'line-through';
                } 
                else 
                {
                    li.style.textDecoration = 'none';
                }
            });
        };

        const eliminarList = document.createElement('button');
        eliminarList.innerText = 'Eliminar Lista';
        eliminarList.className = 'button-eliminarLista';

        eliminarList.onclick = () => {
            const confirmDelete = confirm('¿Estás seguro de eliminar la lista?');
            if (confirmDelete) 
            {
                newListContainer.remove();
            }
        };

    newListContainer.appendChild(newForm);
    newListContainer.appendChild(marcarTodo);
    newListContainer.appendChild(eliminarList);
    newListContainer.appendChild(newList);

    document.body.appendChild(newListContainer);
}

document.querySelector('#new-list').onsubmit = (event) => {
  event.preventDefault();
  const listName = prompt('Ingresa el nombre de la lista:');
  if (listName !== null && listName.trim() !== '') {
    createNewList(listName);
  }
  return false;
};
});
