# Объектно-ориентированное программирование в ES2015

## Создаем классы Person и Employee

Создадим классы `Person` и `Employee` в папке `model`, в файлах` Person.js` и `Employee.js`:

```js
class Person {
}

class Employee extends Person {
}
```

Также сделайте эти классы экспортируемыми. Реализуйте конструктор для класса `Person`:

```js
constructor(name, surname)
{
    this.name = name;
    this.surname = surname;
}
`````

В классе Employee нам тоже понадобится аналогичный конструктор:

```js
constructor(name, surname, department)
{
    super(name, surname);
    this.department = department;
}
```

Данный конструктор вызывает конструктор родительского класса, но также может выполнять дополнительную инициализацию - в
данном случае позволяет установить департамент.

В классе `Person` реализуем геттер для полного имени:

```js
get
fullName()
{
    return this.name + " " + this.surname;
}
```

А также для вычисления возраста (перенесем из` service.js` и немного модифицируем):

```
get age()
{
    if (!this._dateOfBirth) return "";
    let ageDiff = Date.now() - this._dateOfBirth.getTime();
    let ageDate = new Date(ageDiff); // miliseconds from epoch
    return " <b>Возраст:</b>" + Math.abs(ageDate.getUTCFullYear() - 1970);
}
```

Также нам понадобится метод `formatDate` (перенесем из `service.js`):

```js
formatDate(date)
{
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = date.getFullYear();
    return day + '.' + month + '.' + year;
}
```

Также реализуем методы для чтения и записи даты рождения. Будем устанавливать дату, получая ее из строки, а возвращать в
отформатированном виде:

```
{
    set dateOfBirth(date)
    {
        this._dateOfBirth = new Date(date);
    }
    get dateOfBirth()
    {
        return this._dateOfBirth ? "<b>Дата рождения:</b> " + this.formatDate(this._dateOfBirth) : "";
    }
}
```

Обратите внимание, что мы возвращаем пустую строку в случае, если дата не установлена.

Теперь мы можем перенести код функции `getEmployeeInfo()` в класс и использовать его для генерации строкового
представления класса в классе `Person`:

```js
toString()
{
    const phones = this.phones ?
        `Список телефонов: ${this.phones}` : '';
    return `${this.fullName} \${this.dateOfBirth} ${this.age} ${phones}`;
}

```

Теперь попробуйте в консоли создать сотрудника с помощью конструктора и вывести его на печать. Для того чтобы
класс `Employee` был доступен из консоли, нам придется поместить его в глобальный объект window - добавьте это в конец
Employee.js:

```js
window.Employee = Employee;
```

Также надо импортировать класс Employee в main.js:

```js
import {Employee} from './employees/model/Employee';
```

Теперь мы в консоли можем создать объект `Employee` и вывести его:

```js
e = new Employee("Sveta", "Svetova");
console.log(e.toString());
```

Также мы можем установить дату рождения:

```js
e.dateOfBirth = "2000-01-01"
console.log(e.toString());
```

Теперь будет выведена отформатированная дата и возраст. Также можно добавить телефон:

```js
e.addPhone("222")
console.log(e.toString());

```

## Используем новые классы для упаковки объектов `JSON`

Теперь наша задача - получать объект из имеющегося объекта `JSON`. Для этого нам пригодится
метод `Object.assign(object1, object2)`, который производит копирование всех свойств и возвращает результирующий объект.
Например, вызов
`Object.assign(new Person(), obj)`
Создаст объект класса `Person`, заполненный данными из объекта `obj`. У нас нет конструктора без параметров, но в данном
случае это неважно - при вызове `new Person()` поля `name` и `surname` получат значение `undefined`, но потом будут
получены из объекта `obj`. Таким образом, мы можем реализовать следующий метод:

```
static fromJSON(obj){
    return Object.assign(new Person(), obj)
}
```

Это - статический метод - фабрика объектов `Person`. Например,
вызов `Person.fromJSON({name: "Михаил", surname:"Михайлов"})`вернет объект класса `Person`. Добавьте аналогичный
метод `fromJSON` также в класс `Employee` (но он должен создавать объект как `new Employee()`)

Теперь, чтобы получить список всех сотрудников не в виде простых объектов, а упакованных в класс `Employee`, мы можем
реализовать такую функцию в файле `Employee.js`:

```js
export function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}
```

В целях тестирования добавьте такую глобальную функцию в `Employee.js`:

```js
window.allEmployees = function () {
    return jsonToEmployees(DATA.employees);
}
```

Теперь вы можете вывести список всех сотрудников, упакованных в класс `Employee`, в консоли:
`allEmployees()`
Попробуйте также получить отчеты обо всех сотрудниках:
`allEmployees().join("")`

Для того чтобы в отчетах увидеть дату рождения и возраст сотрудника, добавьте дату в `employees-json.js`:

```
 {
    id: 1,
    name: "Пафнутий",
    surname: "Пафнутьев",
    department: "IT",
    dateOfBirth: "2000-01-01"
}
```

3) Используем классы в пользовательском интерфейсе

Осталось воспользоваться новыми классами для вывода данных на экран. Для этого импортируем класс `Employee` и
функцию `jsonToEmployees()` в `ui.js`:
`import {Employee,jsonToEmployees} from "./model/Employee";`

В функции `showEmployees()` модифицируем цикл по `employees` - теперь цикл будет идти по сотрудникам, упакованным в
класс `Employee`:
```
for (let employee of jsonToEmployees(employees)) {
...
}
```

И теперь для установки значения `<li>` воспользуемся таким присвоением:
`li.innerHTML = employee;`
Этот метод вернет подробную информацию о сотруднике. Если установлена дата рождения, дата и возраст будут отображаться в
списке.

Использование классов-упаковок позволяет локализовать логику работы с объектом, а также использовать иерархию объектов и
полиморфизм.

