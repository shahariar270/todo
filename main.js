const btn = document.querySelector("#btn");
const inputs = document.querySelector("#inputs");
const toDoFrom = document.querySelector("#toDoFrom");
const underList = document.querySelector("#underList");
const massage = document.querySelector("#massage");

//from listner function
const toDoFromSubmit = (e) => {
  e.preventDefault();
  //all inputs are make value
  const inputValue = inputs.value;
  //genarate unique id
  const todoId = Date.now().toString();
  //make todo in real
  CreateTodo(inputValue, todoId);
  showMassage("todo added", "Susses");
  //add todo in local storasge
  const loacalStore = getlocalFunction();
  loacalStore.push({ todoId, inputValue });
  localStorage.setItem("mytodos", JSON.stringify(loacalStore));
  inputs.value = "";
};
//finis of event listner function

//input here todos function
const CreateTodo = (inputValue, todoId) => {
  //add list tag
  const newListItem = document.createElement("li");
  //make it unique ids
  newListItem.id = todoId;
  //get all task in list tag
  newListItem.innerHTML = `<span>${inputValue}</span>
<span><button id="deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i>
</button></span>`;
  //add ul tag and li tag
  underList.appendChild(newListItem);
  //li design by css
  newListItem.classList.add("li-style");
  //find delete btn
  const deleteBtn = newListItem.querySelector("#deleteBtn");
  //add event listner
  deleteBtn.addEventListener("click", DeleteTodo);
};
//massage show add
const showMassage = (text, status) => {
  massage.textContent = text;
  massage.classList.add(`bg-${status}`);
  setTimeout(function () {
    massage.textContent = "";
    massage.classList.remove(`bg-${status}`);
  }, 1000);
};
const getlocalFunction = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};
const readData = () => {
  const todos = localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
  todos.map((todo) => CreateTodo(todo.inputValue, todo.todoId));
};
//add from in eventlistner
toDoFrom.addEventListener("submit", toDoFromSubmit);
window.addEventListener("DOMContentLoaded", readData);


//make here deleteTodo function
const DeleteTodo = (event) => {
  let findperent = event.target.parentElement.
  
    parentElement.parentElement;
  underList.removeChild(findperent)
  showMassage("todo Deleted", "Loss");
  
//remove from local-store
    let todos = localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : [];
    todos = todos.filter((todo) => todo.todoId !== findperent.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));

}
