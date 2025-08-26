    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // পেজ লোড হলে LocalStorage থেকে টাস্ক লোড হবে
    window.onload = loadTasks;

    // টাস্ক এড করা
    addBtn.addEventListener("click", addTask);

    function addTask() {
      const taskText = taskInput.value.trim();

      if (taskText === "") {
        alert("Please write something!");
        return;
      }

      createTaskElement(taskText);

      saveTask(taskText); // LocalStorage এ সেভ করা

      taskInput.value = "";
    }

    // টাস্ক তৈরি করা
    function createTaskElement(taskText, completed = false) {
      const li = document.createElement("li");
      li.textContent = taskText;

      if (completed) {
        li.classList.add("completed");
      }

      // Complete toggle
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTasks();
      });

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.classList.add("deleteBtn");

      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateTasks();
      });

      li.appendChild(delBtn);
      taskList.appendChild(li);
    }

    // LocalStorage এ টাস্ক সেভ করা
    function saveTask(taskText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // LocalStorage আপডেট করা
    function updateTasks() {
      let tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
          text: li.childNodes[0].nodeValue,
          completed: li.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // টাস্ক লোড করা
    function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => createTaskElement(task.text, task.completed));
    }