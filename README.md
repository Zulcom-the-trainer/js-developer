### Написать функцию, которая выводит список всех сотрудников в список <ul>
Функция `showEmployees(employees)` должна использовать DOM для создания элементов `<li> списка <ul>`. В каждом элементе
должны выводиться данные об одном сотруднике. Должно выводиться имя и фамилия сотрудника. Результат должен помещаться в
PLACEHOLDER, заранее добавленный на страницу:

```html
<div id="employeesPlaceholder"></div>
```

Перед повторным заполнением плейсхолдер должен очищаться:

```javascript
function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}
```

Также объявите константу `PLACEHOLDER`, равную `employeesPlaceholder`.

Функцию нужно поместить в файл `ui.js` и подключить файл к HTML-файлу.

```javascript
function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");
    for (let employee of employees) {
        const li = document.createElement("li");
        ul.appendChild(li);

        li.innerHTML = employee.name + " " + employee.surname;

    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
}
```

### Запускать функцию показа списка сотрудников при открытии страницы.

Для этого нужно сделать функцию `runUI`, в которой будут помещены все действия, выполняемые при загрузке страницы.

Данную функцию можно вызывать после подключения скриптов в HTML:

```html
<script src="employees-json.js"></script>
<script src="service.js"></script>
<script src="ui.js"></script>
```

В конце документа добавьте вызов runUI:

```html
<script>
    runUI();
</script>

```

Сама функция пока что выглядит тривиально:

```javascript
function runUI() {
    showEmployees(DATA.employees);
}

```

### Создать форму с возможностью добавить нового сотрудника и полями name и surname.

Сама форма должна располагаться в `index.html`:

```html
<div>
    Имя:
    <input id="name" placeholder="Имя">

    Фамилия:
    <input id="surname" placeholder="Фамилия">

    <button onclick="addEmployeeUI()">Добавить сотрудника</button>

</div>

```

При нажатии на кнопку должна вызываться функция `addEmployeeUI()`:

```javascript
function addEmployeeUI() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const id = addEmployee(name, surname);
    showEmployees(DATA.employees);
}
```

4) Нужно предусмотреть валидацию данных формы. Если name или surname не заполнены, должно показываться сообщение об
   ошибке.

Для этого после формы следует предусмотреть соответствующий плейсхолдер:
```html
<div id="addEmployeeFormErrorMessage"></div>
```

А в самой функции нужно его заполнять в случае наличия ошибок:

```javascript
function addEmployeeUI() {
    let errorHTML = "";
    const name = document.getElementById("name").value;
    if (name == "") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
    }
    const surname = document.getElementById("surname").value;
    if (
        surname == "") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
    }
    document.getElementById("addEmployeeFormErrorMessage").innerHTML = errorHTML;
    if (errorHTML.length != 0) return;

    addEmployee(name, surname);

    showEmployees(DATA.employees);
}
```

### После добавления сотрудника данные в форме следует очищать.

Для этого в функции addEmployeeUI() нужно очищать поля формы после отправки:

```javascript
document.getElementById("name").value = "";
document.getElementById("surname").value = "";
```

Дополнительные задания:
- Реализовать возможность задать дату рождения сотрудника 
- Реализовать валидацию поля ввода даты рождения

