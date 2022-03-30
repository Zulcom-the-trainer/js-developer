1) Написать функцию, которая будет находить сотрудника по id

Функция `findById(id)` должна перебирать всех сотрудников и находить сотрудника с совпадающим `id`.

```javascript
function findById(id) {
    for (var e of DATA.employees) {
        if (id == e.id) {
            return e;
        }
    }
    throw Error("сотрудник с id=" + id + "не найден !");
}
```

2) Оптимизировать поиск по `id`: использовать объект для кэширования.

Создать объект `employeeMap={}` и сохранять там уже найденных сотрудников. Использовать `id` в качестве ключа и ссылку
на сотрудника в качестве значения.

```javascript

const employeeMap = {};

function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (var e of DATA.employees) {
        if (id == e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
}

```

3) Реализовать метод для добавления телефона сотрудника.

`addPhone(id, phone)`
Список телефонов должен храниться внутри JSON-объекта сотрудник. В качестве поля используется свойство phones типа
массив. Если такое поле у сотрудника отсутствует, оно должно быть создано.

```javascript
function addPhone(id, phone) {
    const employee = findById(id);
    const phones = employee.phones;
    if (!phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}
```

4) Реализовать метод, устанавливающий дату рождения сотрудника

`setDateOfBirth(id, date)`

```javascript
function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;
}
```

5) Реализовать метод, возвращающий возраст сотрудника.

Функция `getAge(id)` принимает `id` сотрудника в качестве параметра и возвращает возраст сотрудника. Стоит отметить
здесь, что в подобных случаях не стоит изобретать велосипед, и лучше нагуглить подходящее решение.

```javascript
function getAge(id) {
    const employee = findById(id);
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let  ageDate = new Date(ageDiff); // miliseconds from epoch return Math.abs(ageDate.getUTCFullYear() - 1970); 
}
```

6) Написать функцию, форматирующую дату и возвращающую ее в формате дд.мм.гггг.

`formatDate(date)`
Данная функция должна возвращать строку с датой. Для этого можно использовать методы класса `Date`: `getDate()`
, `getMonth()`,
`getYear()`. Для даты и месяца надо добавлять на первую позицию `0`, если дата или месяц меньше `10`.

```javascript
function formatDate(
    date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = date.getFullYear();

    return day + '.' + month + '.' + year;
}
```

7) Написать функцию, возвращающую подробную информацию о сотруднике.

Функция `getEmployeeInfo(id)` должна возвращать строку, содержащую подробную информацию о сотруднике: имя, фамилию, дату
рождения в отформатированном виде, возраст, список телефонов сотрудника.

```javascript
function getEmployeeInfo(id) {
    const e = findById(id);
    const phones = e.phones ? `Список телефонов: ${e.phones}` : '';
    const age = e.dateOfBirth ? `Возраст: ${getAge(e.id)}` : '';
    return `Имя: ${e.name} Фамилия: ${e.surname} Дата рождения: ${formatDate(e.dateOfBirth)} ${phones} ${age}
`;
}
```

8) Написать тестовую функцию, которая добавляет сотрудника, добавляет телефоны, устанавливает дату рождения, и выводит
   подробную информацию о сотруднике в консоль.

Функция `testEmployee()` предназначена для тестирования функций с консоли.

```javascript
function testEmployee() {
    addPhone(133, "555-55-55");
    addPhone(133, "666-66-66");
    setDateOfBirth(133, new Date(
        2000, 1, 1))
    const info = getEmployeeInfo(133);
    console.log(info);
}
```

9) Написать функцию, которая выводит информацию о сотруднике в формате JSON строки

Функция должна использовать метод JSON.stringify().

```javascript

function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

```


