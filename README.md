# Основы JavaScript

## Занятие 2. JSON, работа с объектами и массивами.

### Сконструировать JSON с сотрудниками, их телефонами и адресами

Информация о сотруднике должна включать `id`, `name` (имя) и `surname` (фамилию) сотрудника.

Поместить в файл `employees-json.js`:

```javascript
const DATA = {
    employees: [
        {
            id: 1,
            name: "Пафнутий",
            surname: "Пафнутьев",
            department: "IT"
        }
    ]
}
```

Добавить информацию о нескольких сотрудниках (c id=2, id=3, ...).

### Подключить скрипт и JSON к файлу HTML

Создать файл `index.html`, используя стандартный шаблон WebStorm. В конце прописать:

```html

<meta charset="utf-8"/>

<script src="employees-json.js"></script>
<script src="service.js"></script>
```

Создать файл `service.js`, в который будут добавляться функции.

### Реализовать функцию для поиска сотрудника по имени и фамилии (возвращать массив).

Разработать функцию `findByName(name, surname)`
Функция находит сотрудника по его имени. В случае, если имя или фамилия пустые, они игнорируются. Например,
`findByName("","")` находит всех сотрудников. `findByName("Иван")` находит всех Иванов. `findByName(null,"Иванов")`
находит всех Ивановых. Использовать цикл `for` (лучше `for ... of`) для перебора сотрудников.

```javascript
function findByName(name, surname) {
    let res = [];
    for (var e of DATA.employees) {
        if ((!name || e.name === name) &&
            (!surname || e.surname === surname)) {
            res.push(e);
        }
    }
    return res;
}
```

### Реализовать функцию для добавления сотрудника по имени и фамилии.

Функция добавляет сотрудника по имени. `id` присваивается автоматически, как самый большой `id` среди сотрудников + 1. В
случае, если имя или фамилия не заданы, функция выбрасывает исключение с сообщением об
ошибке. `addEmployee(name, surname)`

```javascript
function addEmployee(name, surname) {
    if (!name || name.length == 0 || !surname || surname.length == 0) {
        throw new Error("name and surname should be not empty");
    }
    let max = 0;
    for (let e of DATA.employees) {
        if (e.id > max) max = e.id;
    }
    let id = max + 1;
    DATA.employees.push({id, name, surname});
    return id;
}
```

### Разработать функцию для удаления сотрудника по `id`.

Использовать `for...of` для поиска сотрудника. Использовать метод массива `splice(index, amount)` для удаления.

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

### Разработать функцию для вывода в консоль всей информации по сотруднику.

Функция `showEmployee(employee)` должна выводить в консоль всю информацию о сотруднике. Для этого функция должна
использовать метод `Object.keys` для получения всех полей объекта `employee`. Далее она должна выводить информацию в
формате ключ=значение в консоль, используя метод `console.log()`.

```javascript
function showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log("Информация о сотруднике " + employee["name"] + ":");
    for (let key of keys) {
        console.log(key + " = " + employee[key]);
    }
}
```

### Реализовать функцию, выводящую список всех сотрудников.

Функция `showEmployees()` должна брать список всех сотрудников из JSON и выводить информацию по каждому, используя
функцию`showEmployee(employee)`. Для перебора можно использовать `for...of`. Альтернативно можно использовать `forEach`.

```javascript
function showEmployees() { // альтернативный вариант:
// DATA.employees.forEach(showEmployee); 
    /*
    for (let e of DATA.employees) { 
     showEmployee(e); 
    */
}
```

### Проверять работу функций в консоли

Открыть консоль в браузере и запустить разные функции для проверки их работоспособности.