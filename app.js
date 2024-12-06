let input = document.getElementById("todo_input");
let title = document.getElementById("title_input");
let todoList = document.getElementById("todo_table_body");
let counter = parseInt(localStorage.getItem("counter")) || 1;
let updateBtn = document.getElementById("update");
let addTodoBtn = document.getElementById('todo_btn');
let selectedId = null;

window.addEventListener("load", function () {
  updateBtn.style.display = 'none';
  let getTodo = JSON.parse(localStorage.getItem("todo")) || [];
  getTodo.forEach((el) => {
    common(el);  // Show todos from localStorage on page load
  });
});

function addTodo() {
  if (input.value === "" || title.value === "") {
    return alert("Please Enter Your Todo");
  }

  let obj = {
    id: counter,
    title: title.value,
    todo: input.value
  };

  let oldTodo = JSON.parse(localStorage.getItem("todo")) || [];
  oldTodo.push(obj);
  localStorage.setItem("todo", JSON.stringify(oldTodo));

  common(obj);  // Display the new todo
  counter++;  // Increment counter for next todo
  localStorage.setItem('counter', counter);  // Store updated counter in localStorage

  title.value = "";
  input.value = "";
}

function common(todo) {
  let tr = document.createElement('tr');
  tr.setAttribute('id', `row${todo.id}`);
  
  let id = document.createElement('td');
  id.innerText = todo.id;  // Show the actual todo id, not counter

  let titleTd = document.createElement('td');
  titleTd.innerText = todo.title;

  let todoTd = document.createElement('td');
  todoTd.innerText = todo.todo;

  let btnTd = document.createElement('td');

  tr.classList.add('tr');
  tr.appendChild(id);
  tr.appendChild(titleTd);
  tr.appendChild(todoTd);
  tr.appendChild(btnTd);

  todoList.appendChild(tr);

  // Delete button
  let Dlbtn = document.createElement("button");
  Dlbtn.classList.add("Dlbtn");
  Dlbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  Dlbtn.setAttribute("onclick", `Dlbtn(${todo.id})`);
  btnTd.appendChild(Dlbtn);

  // Edit button
  let Edbtn = document.createElement("button");
  Edbtn.classList.add("Edbtn");
  Edbtn.innerHTML = '<i class="fas fa-edit"></i>';
  Edbtn.setAttribute("onclick", `Editbtn(${todo.id})`);
  btnTd.appendChild(Edbtn);

  // Checkbox
  let Check = document.createElement("input");
  Check.setAttribute("type", "checkbox");
  Check.classList.add("Check");
  todoTd.appendChild(Check);

  Check.addEventListener("click", function () {
    if (Check.checked) {
      tr.classList.add("highlight");
    } else {
      tr.classList.remove("highlight");
    }
  });
}

function Dlbtn(id) {
  let getTodo = JSON.parse(localStorage.getItem('todo')) || [];
  getTodo = getTodo.filter((el) => el.id !== id);
  localStorage.setItem('todo', JSON.stringify(getTodo));
  document.getElementById(`row${id}`).remove();

  let mexId=Math.max(...getTodo.map(todo =>todo.id),0)
  localStorage.setItem('counter' , mexId)

  alert('Todo Deleted');
}


function Editbtn(id) {
  let getElement=JSON.parse(localStorage.getItem('todo')) || [];
  let EditinputElements=getElement.find((el)=>el.id == id)
  if (EditinputElements) {
    title.value=EditinputElements.title
    input.value=EditinputElements.todo


    selectedId = id;


    updateBtn.style.display='block'
    addTodoBtn.style.display='none'
  }
}


updateBtn.addEventListener('click', function () {
  if (selectedId === null) return;

  let getItems = JSON.parse(localStorage.getItem('todo')) || [];
  console.log(getItems);

  
  getItems.forEach((el) => {
    if (el.id == selectedId) {
      el.title = title.value;
      el.todo = input.value;
    }
  });

  localStorage.setItem('todo', JSON.stringify(getItems));


  let row = document.getElementById(`row${selectedId}`);
  console.log(row);
  row.children[1].innerText = title.value;
  row.children[2].innerText = input.value;

  
  title.value = "";
  input.value = "";
  selectedId = null;

  updateBtn.style.display = "none";
  document.getElementById("todo_btn").style.display = "block";

  alert("Todo Updated");
});



