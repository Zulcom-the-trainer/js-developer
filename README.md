# Использование TypeScript

## Инсталляция и начало использования TS

Установим необходимые пакеты:

```shell
 npm install --save-dev typescript ts-loader
```

Мы устанавливаем компилятор `TypeScript` и загрузчик `TS` из `Webpack`, который мы будем использовать для сборки
модулей.

- Создайте в корне проекта файл `tsconfig.json`. Это файл с конфигурацией TypeScript.
  Поместите в него такой код:

 ```json
 {
  "compilerOptions": {
    "outDir": "./dist/",
    "target": "es2022",
    "lib": [
      "es2022",
      "DOM"
    ],
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "jsx": "react",
    "allowJs": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

Это - настройки языка `TypeScript`. Обратите внимание на `include` и `exclude`. Первое – это шаблон для включения файлов
в
компиляцию. Второе – указание, что папка `node_modules` должна быть исключена из компиляции. В настройках компилятора
`compilerOptions` мы устанавливаем выходную директорию `dist` – туда будет помещен собранный код. Также мы указываем
целевой
язык – здесь это `es2017`, но вы можете указать один из вариантов: `es3`, `es5`, `es2015`, `es2016`, `es2018`,`es2019`
,`es2020`,`es2021`,`es2022`,`esnext` – это разные версии
JavaScript. Например, если включить `target` `es5`, то код будет компилироваться в код, совместимый с `ES5`, то есть
работать
и на старых браузерах, но объем кода будет самым большим, и он будет работать медленнее. Настройка `lib` позволяет
указать, что из нашего кода мы сможем использовать `es2017` и DOM-библиотеки. `experimentalDecorators` включают
поддержку
декораторов, `sourceMap` позволяет генерировать соответствие TS файлов и бандл, что позволяет видеть исходный TypeScript
в
отладчике.
Особенно стоит обратить внимание на настройку `noImplicitAny`. Если она включена, то для того, чтобы использовать код
JS,
надо указывать, что переменные имеют тип, иначе будет ошибка. Скажем, такой код будет ошибочным:

```ts
function log(someArg) {
} // Error : someArg has an implicit `any` type
```

И чтобы его исправить, нужно явным образом указать тип any или какой-то более конкретный:

```ts
function log(someArg: any) {
}
```

- Еще нам понадобится `Webpack`. В целом его настройка обычная, но нам нужно подключить `ts-loader`, который будет
  пропускать через себя `TS`-файлы и выдавать уже JS, который далее будет собираться в бандл.
  Вот код для его настройки` webpack.config.js`:

```js
const path = require('path');
module.exports = {
    entry: './mainTs.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

Инфраструктура готова, и мы можем создать файл `mainTs.ts` и запустить автоматическую сборку командой

## Пишем классы с использованием TS

- Определите класс `Person` с помощью конструктора, используя имя в качестве параметра.
- Реализуйте функцию `getInfo()`, используя интерполяцию строки: она должна возвращать строковое представление `Person`.
- Реализуйте метод получения/установки имени; метод `set name` должен проверять длину имени: оно должно быть не менее 3.

- Определите класс `Person` в `Person.ts` и выполните его экспорт:

```ts
export class Person {
    constructor(private _name: string) {
    }
}
```

- Определите метод getInfo():

```ts
getInfo()
{
    return `person: ${this.name}`
}

```

- Определите методы получения и изменения свойства имени:

```
set name(name)
{
    if (name.length < 3)
        throw `incorrect name ${name}`
    this._name = name
}

get name()
{
    return this._name
}
```

- Определите класс `Employee`, расширяющий класс `Person`, добавив свойства `salary` и `position` и переопределив
  функцию
  `getInfo()`.

- Создайте файл `Employee.ts` и импортируйте `Person`:
  `import {Person} from './Person'`

- Создайте класс `Position.ts` и импортируйте его в `Person.ts`.`Position.ts` должен быть таким:

```ts

export enum Position {
    MANAGER,
    DEVELOPER,
    DIRECTOR
}

```

- Определите класс `Employee`, который расширяет класс `Person`:

 ```ts
 export class Employee extends Person {
    constructor(_name: string, public position: Position, public salary: number) {
        super(_name);
    }
}
```

- Переопределите `getInfo()` и вызовите `getInfo()` из суперкласса:

```ts
getInfo()
{
    return super.getInfo() +
        ` ${this.position} ${this.salary}`
}
```

- Определите класс `Employees` с инкапсулированным списком сотрудников с помощью статических методов:
- `add()` для добавления сотрудника в скрытый список сотрудников; он должен включать проверку типа и генерировать
  исключение в случае, если добавленное значение не Employee;
    - `list()` для возврата копии списка всех сотрудников.

- Создайте файл `Employees.ts` и импортируйте `Employee`:

  `import { Employee } from "./Employee"`

- Создайте экспортированный класс `Employees`:
  `export class Employees { }`

- Определите переменную модуля для списка сотрудников:

  `static _employees: Employee[] = [];`

    - Добавьте статический метод `add()` для добавления новых сотрудников в массив `_employees` и убедитесь, что
      аргументом является `Employee`:

```
static add(employee:Employee) {
Employees._employees.push(employee)
}
```

- Добавьте статический метод `list()` который возвращает список сотрудников:

```
static list():Employee[] {
return [...Employees.employees];
}

```

-Создайте модуль `mainTs.ts`, который должен:

- создавать нескольких сотрудников и добавлять их в массив `Employees` с помощью функции `add()`;
- печатать список сотрудников с помощью метода `getInfo()`.
- импортируйте `Employee` и `Employees`:

```ts
import { Employees } from "./Employees"
import { Employee } from "./Employee"
```

- Внутри `mainTs.ts` создайте функцию `main`. Внутри нее Создайте нескольких сотрудников и добавьте их с помощью
  метода `Employees.add()`:

```ts
Employees.add(new Employee("John", "manager", 1000));
Employees.add(new Employee("Bill", "developer", 5000));
Employees.add(new Employee("James", "director", 4000));
```

- Получите список сотрудников:

```
let employees:Employee[] = Employees.list();
```

- Создайте переменную в виде заполнителя `html`:
  `let html=""`

- Выполните итерацию по сотрудникам, чтобы добавить `html` представление:

```ts

for (let e of employees) {
    html += e.getInfo() + "<br>"
}
```

- Выведите полученный `html` на веб-страницу: `document.getElementById("employees").innerHTML = html;`

- Теперь нам нужно получить возможность ссылаться на main. Сделаем глобальную ссылку:
      `window.run = main;`
Но вы увидите ошибку, т.к. в объекте window нет метода `run`, и если JS спокойно бы это проглотил, TS будет на это
жаловаться. Попробуйте щелкнуть с `Ctrl` по `window` – и посмотрите, где вы окажетесь. Это – файл `lib.es6.d.ts`,
предоставляющий обертки для стандартных типов. Но метод `run` в нем конечно не описан – его надо добавить.

В данном случае нам надо расширить интерфейс `window` – давайте сделаем это:

```
declare global {
interface Window {
run: () => void;
}
}
```

После этого вы спокойно сможете присвоить переменной `window.run` значение – указатель на функцию.
Есть и более простой, но менее правильный способ записать значение в `window.run`:
`(<any>window).run = function() { … }`

- Создайте `employees.html` который должен использовать `mainTs.ts` и отображать всю информацию:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employees</title>
</head>
<body>
<div id="employees"></div>
</body>

<script src="dist/bundle.js"></script>
<script>
    run();
</script>
</html>
```

- Откройте `employees.html`. В нем должен быть список сотрудников с информацией, полученной с помощью `getInfo()`.

## Дополнительное задание

- Реализуйте возможность добавления и удаления сотрудников, а также вычисление средней зарплаты.