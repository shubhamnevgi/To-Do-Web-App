document.addEventListener("DOMContentLoaded", function() {
  let submit = document.querySelector("input[type='submit']");
  let alerts = document.querySelector(".alerts");
  let titlec = document.getElementById("ttitle");
  let descc = document.getElementById("tdesc");
  let todoList = document.getElementById("todo-list");
  let pendingBtn = document.querySelector("#pending");
  let completedBtn = document.querySelector("#completed");
  let allBtn = document.querySelector("#all");

  let status = "Pending";
  let timestamp = new Date().toISOString();

  let tasks = JSON.parse(localStorage.getItem("todo")) || [];
  console.log(tasks);

  displayTasks(tasks);

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (!(titlec.value === "" || descc.value === "")) {
      tasks.push({ title: titlec.value, desc: descc.value, timestamp: timestamp, status: status });
      localStorage.setItem("todo", JSON.stringify(tasks));

      alerts.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
      <svg>
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          Task added! Keep up the amazing work!
        </div>
      </div>`;

      setTimeout(() => {
        alerts.innerHTML = ``;
      }, 3000);

      titlec.value = "";
      descc.value = "";

      displayTasks(tasks);
    } else {
      alerts.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
        <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
      </svg>
      <div class="alert alert-warning d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          Whoa! An empty task? How mysterious!
        </div>
      </div>`;

      setTimeout(() => {
        alerts.innerHTML = ``;
      }, 3000);
    }
  });

  function displayTasks(tasks) {
    todoList.innerHTML = "";

    tasks.forEach(task => {
      let li = document.createElement("li");

      li.innerHTML = `<div class="card text-center">
        <div class="card-header d-flex justify-content-between">
          <div class="taskstatus">Status: ${task.status}</div>
          <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Mark as Completed
              </label>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title" style="font-size: 2rem; font-weight: 500;">${task.title}</h5>
          <p class="card-text" style="font-size: 1.5rem;">${task.desc}</p>
        </div>
        <div class="card-footer text-body-secondary d-flex justify-content-between">
          ${getRelativeTime(task.timestamp)} <!-- Get relative time here -->
          <button id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg></button>
        </div>
      </div><br>`;

      todoList.appendChild(li);

      let cardheader = li.querySelector("div.card-header.d-flex.justify-content-between");
      let cardbody = li.querySelector("div.card-body");

      let checkbox = li.querySelector('#flexCheckDefault.form-check-input');

      checkbox.addEventListener("click", (e) => {
        if (checkbox.checked) {
          task.status = "Completed";
          li.querySelector('.taskstatus').textContent = 'Status: Completed';
          cardheader.style.backgroundColor = 'rgba(52, 194, 48, 0.6)';
          cardheader.style.border = '1px solid forestgreen';
          cardbody.style.textDecoration = 'line-through';
        } else {
          task.status = "Pending";
          li.querySelector('.taskstatus').textContent = 'Status: Pending';
          cardheader.style.backgroundColor = '';
          cardheader.style.border = '';
          cardbody.style.textDecoration = 'none';
        }

        localStorage.setItem("todo", JSON.stringify(tasks));
        console.log(e);
        console.log(task.status);
      });

      if (task.status === "Completed") {
        checkbox.checked = true;
        li.querySelector('.taskstatus').textContent = 'Status: Completed';
        cardheader.style.backgroundColor = 'rgba(52, 194, 48, 0.6)';
        cardheader.style.border = '1px solid forestgreen';
        cardbody.style.textDecoration = 'line-through';
      } else {
        checkbox.checked = false;
        li.querySelector('.taskstatus').textContent = 'Status: Pending';
        cardheader.style.backgroundColor = '';
        cardheader.style.border = '';
        cardbody.style.textDecoration = 'none';
      }

      let deleteBtn = li.querySelector("#delete");

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const index = tasks.findIndex(item => item.title === task.title && item.desc === task.desc);

        if (index !== -1) {
          tasks.splice(index, 1);
          localStorage.setItem("todo", JSON.stringify(tasks));
          li.remove();
        }

        let alerts = document.querySelector(".alerts");

        alerts.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <div>
            Task deleted! One less to worry about!
          </div>
        </div>`;

        setTimeout(() => {
          alerts.innerHTML = ``;
        }, 3000);

        console.log(alerts);
      });
    });
  }

  function getRelativeTime(timestamp) {
    const now = new Date();
    const taskTime = new Date(timestamp);
    const timeDiff = now.getTime() - taskTime.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years === 1 ? 'Last year' : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? 'Last month' : `${months} months ago`;
    } else if (days > 0) {
      if (days === 1) return 'Yesterday';
      if (days < 7) return `${days} days ago`;
      const weeks = Math.floor(days / 7);
      return weeks === 1 ? 'Last week' : `${weeks} weeks ago`;
    } else if (hours > 0) {
      return hours === 1 ? 'An hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'A minute ago' : `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return seconds === 1 ? 'A second ago' : `${seconds} seconds ago`;
    } else {
      return 'Just now';
    }
  }

  pendingBtn.addEventListener("click", () => {

    let list = document.body.querySelectorAll('#todo-list li')
    console.log(list)

    list.forEach(todo => {
      let checkbox = todo.querySelector('#flexCheckDefault.form-check-input');
      console.log(todo)
      if (checkbox.checked) {
        todo.hidden = true;
        // console.log("C: ", todo)
      } else {
        todo.hidden = false;
        // console.log("P: ", todo)
      }
    });

  });


  completedBtn.addEventListener("click", () => {

    let list = document.body.querySelectorAll('#todo-list li')
    console.log(list)

    list.forEach(todo => {
      let checkbox = todo.querySelector('#flexCheckDefault.form-check-input');
      console.log(todo)
      if (checkbox.checked) {
        todo.hidden = false;
        // console.log("C: ", todo)
      } else {
        todo.hidden = true;
        // console.log("P: ", todo)
      }
    });
  });

  allBtn.addEventListener("click", () => {
    displayTasks(tasks)
  });

});
