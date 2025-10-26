const addButton = document.querySelector('.js-add');
const taskBlock = document.querySelector('.task-block')

let listOfTasks = loadList(); 
renderList()

addButton.addEventListener('click', ()=>{addTask()})

function addTask () {
  const listEl = document.getElementById('task');
  const taskname = listEl.value 
  const dateEl = document.getElementById('date');
  const taskdate = dateEl.value;

  if(taskname!== '' && taskdate!== '') {
    listOfTasks.push({
      taskname,
      taskdate
    });
  }

  listEl.value= '';
  saveList()
  renderList();
}

function renderList () {
let taskHTML= ''
  listOfTasks.forEach((obj, i)=> {
    const {taskname, taskdate,completed} = obj;
    const checked = completed ? 'checked' : '';
    taskHTML += `
    <div class="list">
        <div class="name">${taskname}</div>
        <div class="date">${taskdate}</div>
        <input class="check" type="checkbox" id="check" ${checked}>
        <button class="js-delete-btn">X</button>
      </div>
    `;
  });

  taskBlock.innerHTML = taskHTML;

  document.querySelectorAll('.js-delete-btn').forEach((delBtn, i)=>{
    delBtn.addEventListener('click', ()=>{
      listOfTasks.splice(i,1);
      saveList();
      renderList();
    });
  });

  document.querySelectorAll('.js-check').forEach((cb, idx)=>{
    cb.addEventListener('change', (e)=>{
      listOfTasks[idx].completed = e.target.checked;

    });
  });
  saveList();
}

document.querySelector('.check').addEventListener('click', ()=>{
  check()
})
 function saveList() {
  const itemJSON = JSON.stringify(listOfTasks)
  localStorage.setItem('savedList' , itemJSON)
 };

 function loadList () {
  const tasks = localStorage.getItem('savedList') || "[]"; 
  return JSON.parse(tasks)
 };

