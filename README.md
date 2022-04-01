# Занятие 2. Расширение функциональности. Работа с событиями.

## Реализуем возможность удаления сотрудника из списка

В цикле функции `showEmployees()` добавьте код для добавления кнопки Удалить для каждого сотрудника в списке:

```javascript
 const removeButton = document.createElement("button");
removeButton.innerHTML = "Удалить";
removeButton.addEventListener('click',
    () => removeEmployeeUI(employee.id));
li.appendChild(removeButton);
```

Также необходимо реализовать метод `removeEmployeeUI`. Эта функция должна вызывать `removeEmployee(id)` из `service.js`.
После удаления сотрудника необходимо перерисовать список всех сотрудников вызовом `showEmployees()`.

```javascript
function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}
```

Код для удаления сотрудника может выглядеть так:

```javascript
function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id === id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}
```

Также вы можете использовать `findIndex` для поиска номера элемента с определенным `id`.

## Создаем возможность добавлять руководителя.

Для сотрудника можно будет задавать руководителя. Это будет делаться путем выбора из выпадающего списка всех
сотрудников.

Для этого в форму добавления сотрудника добавим выпадающий список:

Руководитель:

```html 
<select id="managerSelect"></select>
```

Этот список надо заполнить списков всех сотрудников. Для этого реализуйте стандартную
функцию `fillSelect(select, values, selectedValue)`. Данная функция будет принимать ссылку на `select` в первом
параметре, массив объектов с текстом и значением во втором, и выбранное значение - в третьем. Например, следующий код:

```javascript
fillSelect(document.getElementById("managerSelect"), [{
    text: " Иван Иванов",
    value: 133
},
    {
        text: " Петр Петров",
        value: 134
    }], 133);
```

Заполнит выпадающий список двумя значениями: Иван Иванов и Петр Петров, при этом Иван Иванов будет выбран изначально.

Вот реализация такого метода:

```javascript
function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue == option.value) option.selected = true;
        select.appendChild(option);
    }
}

```

Теперь нам надо создать массив `values` для заполнения дроп-дауна списком всех сотрудников. Это можно сделать так:

```javascript
function getEmployeesOptions() {
    let options = [];
    for (let e of DATA.employees) {
        options.push({
            text: e.name + ' '
                + e.surname, value: e.id
        });
    }
    return options;
}
```

Остается заполнить дроп-даун списком сотрудников. Для этого добавим в `runUI()` такой вызов:

```javascript
fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
```

Теперь необходимо при добавлении сотрудника сохранять ссылку на менеджера. Ссылка будет называться `managerRef`, и будет
содержать `id` сотрудника, являющегося руководителем. Для этого в `service.js` реализуем
функцию `setEmployeeManager(id, managerId)`. Также в функции `addEmployeeUI()` будем получать и сохранять `id`
менеджера:

```javascript
const id = addEmployee(name, surname);
const managerId = document.getElementById("managerSelect").value;
setEmployeeManager(id, managerId);
```

Теперь нам необходимо выводить руководителя в функции `showEmployees()`. Это можно сделать следующим образом:

```javascript
let managerHTML = "";
if (employee.managerRef) {
    let manager = findById(employee.managerRef);
    managerHTML = " <b>Руководитель:</b> " + manager.name + " " + manager.surname;
}
li.innerHTML = employee.name + " " + employee.surname + managerHTML;
```

## Добавляем возможность изменить руководителя в списке.

Реализуем возможность показывать руководителя. Для этого в функции `showEmployees()` в цикле по сотрудникам добавим
возможность отображать не просто имя руководителя, а выпадающий список с выбранным руководителем. Также добавим
обработчик события `onchange`. При изменении руководителя ссылка managerRef должна обновляться.

```javascript
if (employee.managerRef) {
    let manager = findById(employee.managerRef);
    const managerSpan = document.createElement("span");
    const managerSelect = document.createElement("select");
    fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
    managerSelect.addEventListener('change', () => employee.managerRef = managerSelect.value);
    managerSpan.innerHTML = " <b>Руководитель:</b> ";
    li.appendChild(managerSpan);
    li.appendChild(managerSelect);
}
```

Дополнительные задания

- Реализовать возможность изменить имя, фамилию и дату рождения сотрудника
