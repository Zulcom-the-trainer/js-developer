# Используем AXIOS для работы с сервером. Протокол WebSocket.

## Используем AXIOS для работы с сервером

Возьмем наше приложение для управления сотрудниками и задачами.
Сейчас оно работает локально, но теперь у нас есть все возможности, чтобы оно работало с сервером, как полноценное
клиент-серверное приложение.

### Создадим новый модуль в папке employees: `server.js`. Этот модуль будет содержать код для взаимодействия с сервером.

Установим AXIOS:

```shell
npm i axios
```

Импортируем в `server.js` AXIOS и создадим переменную для работы с нашим сервером:

```js
import axios from 'axios';

const employees = axios.create(
    {baseURL: 'http://localhost:3333/employees'});
```

Также нам понадобится обработчик ошибок, на случай возникновения ошибок. Вместо того чтобы писать каждый раз метод
`.catch()` или блок `catch`, мы можем сделать единообразную обработку всех ошибочных ситуаций. Потенциально можно
сообщать
об ошибках пользователю, но пока мы будем просто выводить их в лог. AXIOS содержит необходимые для этого средства – это
интерсептор, перехватчик обращений:

```js
function errorResponseHandler(error) {
// if has response show the error
    if (error.response.data.message) {
        console.log("SERVER ERROR: " +
            error.response.data.message);
    }
    if (error.message) {
        console.log("SERVER ERROR: " + error.message);
    } else {
        console.log("ERROR: " + error);
    }
}

// apply interceptor on response
employees.interceptors.response.use(
    response => response,
    errorResponseHandler
);
```

Таким образом, мы просим перехватчик предобрабатывать все результаты обращения к серверу, но для нормального развития
событий мы просто возвращаем response в неизменном виде, а вот в случае ошибки вызываем наш кастомный
`errorResponseHandler`. Он анализирует ошибку, и если в ней есть сообщение, выводит его в лог, а если нет – выводит сам
объект ошибки. Обычно с сервера поступает сообщение с деталями ошибки.

Теперь давайте определим функцию, которая будет загружать с сервера список всех сотрудников, и которая должна вызываться
при старте приложения:

```js
export async function getEmployees() {
    let res = await employees.get('');
    return res.data._embedded.employees;
}
```

Импортируем server в `ui.js`, чтобы можно было им пользоваться:

```js
import * as server from './server';
```

Теперь модифицируем метод `runUI()`, чтобы он поддерживал асинхронность:

```js
export async function runUI() {
}
```

Изменим строчку, показывающую список сотрудников – теперь они не берутся из файла `JSON`, а приходят с сервера: вместо
`showEmployees(getEmployees());`

мы укажем
`showEmployees(await server.getEmployees());`

Теперь можно перегрузить страницу и посмотреть на результат – сотрудники уже загружаются с сервера!

#### Однако нам еще многое предстоит сделать.

Сейчас выпадающие списки менеджеров в поиске и добавлении сотрудника показывают списки сотрудников из `JSON` файла.
Списки
загружаются функцией `getEmployeesOptions()`. Давайте ее перепишем - она будет асинхронной и будет грузить менеджеров с
сервера:

```js
async function getEmployeesOptions() {
    let employees = await server.getEmployees();
    return employees.map(e => {
        return {text: e.name + ' ' + e.surname, value: e.id}
    });
}
```

Не забудьте обновить ее вызов на асинхронный в `runUI()`:
`const employeesOptions = await getEmployeesOptions();`

Снова можно перегрузить страницу и посмотреть на выпадающие списки.

Теперь давайте реализуем возможность искать сотрудников с помощью поисковой формы. Для этого перепишем функцию
`searchEmployeeUI`:

```js
export async function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value || null;
    const surname = document.getElementById("surnameSearch").value || null;
    const managerId = document.getElementById("managerSearch").value || null;
    const example = {name, surname, managerId};
    showEmployees(await server.findByExample(example));
}
```

Обратите внимание на изменения: во-первых, она стала асинхронной. Во-вторых, мы теперь используем переменную `managerId`
,
а не `managerRef`. В третьих мы создаем объект-образец `example` для поиска по образцу, который реализован в нашем
REST-сервисе. Остается добавить функцию `findByExample()` в server.js:

```js
export async function findByExample(employee) {
    let res = await employees.post('findByExample', employee);
    return res.data;
}
```

Убедитесь, что теперь работает поиск по параметрам.

### Однако не все работает правильно. Вы могли заметить, что менеджер показывается некорректно.Нам нужно загружать список всех сотрудников (для выпадающего списка менеджеров) также с сервера – пока что он грузится функцией getEmployees().

Поправим функцию `showEmployees`:

```js
async function showEmployees(employeesJSON) {
    let employees = jsonToEmployees(employeesJSON);
    let allEmployees = await server.getEmployees();
    const html = showEmployeesView(allEmployees, employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;
}
```

Окей, теперь все грузится с сервера.
Еще одно исправление – поскольку у нас теперь используется ссылка `managerId`, a не `managerRef`, надо поправить вызов
`employeeManagerView` в функции `showEmployeesView()`: `${employeeManagerView(allEmployees,e.managerId)}`

Теперь менеджер в списке сотрудников должен отображаться корректно.

### Но пока не работает добавление сотрудника. Давайте сделаем это! Добавим такую функцию в server.js:

```js
export async function addEmployee(name, surname, managerId = null) {
    let e = await employees.post('', {name, surname, managerId});
    return e.data;
}
```

Эта функция позволяет передавать как 2, так и 3 параметра. Если параметра 2, менеджер не будет установлен. Также
обратите внимание, что функция возвращает добавленного сотрудника, что позволяет, например, узнать его `id`.

Давайте воспользуемся этой функцией. В функции `addEmployeeUI()` в `ui.js` сделайте следующее изменение:

```js
let employee = await server.addEmployee(name, surname);
```

Теперь мы добавляем сотрудника и получаем ссылку на него.
Конечно, саму функцию надо пометить как асинхронную.

Остается обновить информацию о менеджере – для этого вызовем функцию

```js
await server.setEmployeeManager(employee.id, managerId);
```

Ее у нас еще нет, но ее несложно добавить:

```js
export async function setEmployeeManager(id, managerId) {
    await employees.post(id + '/managerId?id=' + managerId);
}
```

Не забудьте после добавления сотрудника перезагрузить список сотрудников c сервера в конце `addEmployeeUI()`:

```js
showEmployees(await server.getEmployees());
```

### Остается возможность удалять сотрудника с сервера и выбирать менеджера в списке сотрудников из выпадающего списка – сделайте это самостоятельно.






