// Register Logic
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const age = parseInt(regAge.value);
    const password = regPassword.value;
    const confirmPassword = regConfirmPassword.value;

    const error = document.getElementById("regError");

    if (!username || !email || !age || !password || !confirmPassword) {
      error.textContent = "Please fill everything.";
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      error.textContent = "Email must be a valid @gmail.com address.";
      return;
    }

    if (age < 16 || age > 30) {
      error.textContent = "Age must be between 16 and 30.";
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[a-z]/.test(password)) {
      error.textContent = "Password must contain uppercase, lowercase, and number.";
      return;
    }

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));
    window.location.href = "login.html";
  });
}

// Login Logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    const error = document.getElementById("loginError");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      window.location.href = "welcome.html";
    } else {
      error.textContent = "Invalid username or password";
    }
  });
}

// Welcome Page CRUD
const crudForm = document.getElementById("crudForm");
const crudTableBody = document.querySelector("#crudTable tbody");
let crudData = JSON.parse(localStorage.getItem("crudData")) || [];

function renderTable() {
  crudTableBody.innerHTML = "";
  crudData.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.password}</td>
      <td class="actions">
        <button onclick="editUser(${index})">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </td>`;
    crudTableBody.appendChild(row);
  });
}

if (crudForm) {
  renderTable();
  crudForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("crudUsername").value.trim();
    const email = document.getElementById("crudEmail").value.trim();
    const age = parseInt(document.getElementById("crudAge").value);
    const password = document.getElementById("crudPassword").value;

    if (editIndex !== null) {
      crudData[editIndex] = { username, email, age, password };
      editIndex = null;
    } else {
      crudData.push({ username, email, age, password });
    }

    localStorage.setItem("crudData", JSON.stringify(crudData));
    crudForm.reset();
    renderTable();
  });
}

let editIndex = null;
window.editUser = function (index) {
  const user = crudData[index];
  document.getElementById("crudUsername").value = user.username;
  document.getElementById("crudEmail").value = user.email;
  document.getElementById("crudAge").value = user.age;
  document.getElementById("crudPassword").value = user.password;
  editIndex = index;
};

window.deleteUser = function (index) {
  crudData.splice(index, 1);
  localStorage.setItem("crudData", JSON.stringify(crudData));
  renderTable();
};
