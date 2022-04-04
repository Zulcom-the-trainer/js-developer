```
В этом коммите соджержится код решения - чтобы вам было проще разобраться с webpack :)
```

# Поиск по сотрудникам. Динамическое изменение стилей.

## Поиск по сотрудникам.

Реализуем возможность искать по сотрудникам. Искать будем по имени, фамилии, названию департамента и руководителю.

Для этого добавим форму поиска в `index.html`.

```html

<form>
    Поиск сотрудника:

    <input id="nameSearch" placeholder="Имя" size="30">
    <input id="surnameSearch" placeholder="Фамилия" size="30">

    Поиск по менеджеру:
    <select id="managerSearch"></select>

    <button type=button onclick="searchEmployeeUI()">Найти сотрудников</button>
    <input type="reset" value="Сбросить форму">
</form>
```

Обратите внимание: здесь реализована кнопка для поиска сотрудников, а также кнопка для сброса данных
формы. `<input type="reset">` предназначен как раз для сброса данных форм.

Теперь реализуем функцию `searchEmployeeUI()` в файле `ui.js`:
Данная функция должна получать данные формы, осуществлять поиск и затем выводить результаты, перерисовывая список
сотрудников:

```javascript
function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    const managerRef = document.getElementById("managerSearch").value;

    const employees = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}
```

Также в файл `service.js` добавим функцию `searchEmployees(name, surname, managerRef)`. Данная функция должна возвращать
сотрудников по заданным параметрам. Если какой-то параметр не задан (`null` или `undefined` или пустая строка), параметр
должен игнорироваться. Таким образом, вызов `searchEmployees("Иван")` должен находить всех Иванов, вне зависимости от
фамилии или того, кто его менеджер.

```javascript
function searchEmployees(name, surname, managerRef) {
    let results = [];
    for (let e of DATA.employees) {
        if ((!name ||
                e.name == name) &&
            (!surname || e.surname == surname) &&
            (!managerRef || e.managerRef == managerRef)) {
            results.push(e);
        }
    }
    return results;
}
```

## Отображение результатов валидации путем изменения вида `input`-полей

Мы будем подсвечивать `input`-поля розовым в случае некорректности параметров ввода. Для этого мы будем использовать
возможность менять стиль у произвольного элемента.

Изменим валидацию формы в функции `addEmployeeUI()`, подсвечивая фон:

```javascript
if (name == "") {
    errorHTML += "- Имя сотрудника должно быть задано<br>";
    document.getElementById("name")
        .style.backgroundColor = '#FFEEEE';
}
const surname = document.getElementById("surname").value;
if (surname == "") {
    errorHTML += "- Фамилия сотрудника должна быть задана<br>";
    document.getElementById("surname").style.backgroundColor = '# FFEEEE';
}
```

## Реализуем интерфейс с закладками

Мы будем использовать работу с CSS для переключения между закладками. У нас на текущий момент будет 2 закладки: поиск
сотрудника и добавление сотрудника. Сначала реализуем сами закладки. Поместим их в `index.html`:

```html

<div class="tab">
    <button id="searchButton" class="tablinks"
            onclick="openTab(event, 'searchPane')">Поиск сотрудника
    </button>
    <button class="tablinks"
            onclick="openTab(event, 'addPane')">Добавление сотрудника
    </button>
</div>
```

Теперь опишем необходимые стили в `style.css`:

```css
body {
    font-family: Verdana, serif;
}

button, input, select {
    outline: none;
    padding: 5px;
    font-size: 15px;
    background-color: #f1f1f1;
    border: none;
}

.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Стиль кнопок, использующийся для открытия контента */
.tab button {
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px;
    transition: 1s;
    font-size: 13px;
    margin: 0px;
}

/* Измненение фона таба при наведении мышкой */
.tab button:hover {
    background-color: #ddd;
}

/* Создаем класс для активного таба */
.tab button.active {
    background-color: #fff;
}

/* Стиль для содержания таба */
.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}
```

Стили необходимо присоединить в index.html в блоке `<head>`:

```html

<link rel="stylesheet" type="text/css" href="style.css">
```

Теперь поместим форму поиска сотрудника в ```<div id="searchPane" class="tabcontent">```

```html

<div id="searchPane" class="tabcontent">
    <h3>Поиск сотрудника</h3>
    <form>
        <input id="nameSearch" placeholder="Имя" size="30">
        <input id="surnameSearch" placeholder="Фамилия" size="30">

        Поиск по менеджеру:
        <select id="managerSearch"></select>

        <p>
            <button type=button onclick="searchEmployeeUI()"
                    id="searchEmployeesButton">Найти сотрудников
            </button>

            <input type="reset" value="Сбросить форму">
        </p>
    </form>

    <div id="employeesPlaceholder"></div>

</div>
```

Также поместим форму добавления сотрудников в `<div id="addPane" class="tabcontent">`:

```html

<div id="addPane" class="tabcontent">
    <h3>Добавление сотрудника</h3>
    <label for="name">Имя:</label>
    <input id="name" placeholder="Имя">

    <label for="surname">Фамилия:</label>
    <input id="surname" placeholder="Фамилия">

    <label for="managerSelect">Менеджер:</label>
    <select id="managerSelect"></select>
    <div id="addEmployeeFormErrorMessage"></div>

    <p>
        <button onclick="addEmployeeUI()" id="addEmployeeButton">
            Добавить сотрудника
        </button>
    </p>

</div>
```

Теперь нам нужно реализовать функцию `openTab(event, tabId)` в `ui.js`:

```javascript
/**

 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */ function openTab(evt, id) { // Определяем переменные var i, tabcontent, tablinks;

// Получаем все элементы с class="tabcontent" и прячем их tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

// Получаем все элементы с class="tablinks" и удаляем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className =
            tablinks[i].className.replace(" active", "");
    }

// Показываем текущий таб и добавляем класс "active"
// на кнопку, которая открывает этот таб document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}
```

Теперь табы должны работать. Остается активировать первый таб при загрузке страницы, для этого поместим в функцию
`runUI()` код:

```javascript
 document.getElementById("searchButton").click();
 ```

## Реализуем возможность отправки данных по нажатию Ввод в `input`-полях

Реализуем функцию, которая будет находить все `input`-поля и навешивать на нее слушатель события `keyup`. Если нажатая
кнопка - кнопка ввода (она имеет код 13), то мы отправляем данные путем нажатия на первую кнопку

```javascript
function assignSendOnEnter(paneId, buttonId) {
    let allInput = document.querySelectorAll("#" + paneId + " input");
    for (let input of allInput) {
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector("#" + paneId + " button").click();
            }
        });
    }
}
```

Остается добавить навешивание события при старте в функцию `runUI()`:

```javascript
assignSendOnEnter("searchPane", "searchEmployeesButton");
assignSendOnEnter("addPane", "addEmployeeButton");
```

Теперь можно проверить, что форма отправляется при нажатии `Enter` на любом поле ввода.

На этом реализация черновой версии возможностей программы завершается, и мы начинаем перерабатывать наш код, вводя
современные концепции, которые позволят делать наш код легко читаемым и расширяемым, и позволят минимизировать
вероятность ошибок в большом проекте.

## Дополнительные задания

- Реализовать поиск при любом изменении полей поисковой формы (без нажатия на кнопку поиска)
- Реализовать возможность поиска по дате рождения

# Модули в JavaScript. Работа с webpack.

Мы написали уже достаточно большую программу, но порядка в ней нет: куча функций, отовсюду можно вызвать любую функцию.

Мы заранее аккуратно разделили код на отдельные модули `ui.js` и `service.js` - модуль интерфейсного слоя и
бизнес-логику, но пока что у нас отсутствует инкапсуляция - сокрытие частей программы, не нужных другим слоям. Именно
этим мы займемся, используя webpack и модули JavaScript.

1) Разделение на модули

Установите webpack:

```shell
npm install -g webpack-cli
npm install -g webpack
npm install webpack
```

Создайте файл `webpack.config.js` со следующим содержанием:

```javascript
module.exports = {
    entry: './main.js',
    devtool: 'source-map',
    mode: 'development',

    output: {
        filename: './bundle.js'
    }
};
```

Поместите все файлы `.js` в папку employees.

В файле `employees-json.js` экспортируйте данные:

```javascript
export const DATA = {...}
```

Теперь добавьте импорт в файл `service.js`:

```javascript
import {DATA} from './employees-json';
```

Из `service.js` экспортируйте функции, которые нужны в `ui.js`:

```javascript
export function getEmployees() {
    return DATA.employees
}
```

К таким функциям также можно отнести `addEmployee`, `removeEmpoloyee`, `findById`, `searchEmployees`
, `setEmployeeManager`.

Теперь импортируйте все эти функции в `ui.js`:

```javascript
import {getEmployees, removeEmployee, addEmployee, findById, searchEmployees, setEmployeeManager} from './service';
```

Из `ui.js` в свою очередь надо экспортировать функции, которые понадобятся в интерфейсе - в `index.html`: это
функции `runUI`,
`addEmployeeUI`, `openTab`, `searchEmployeeUI`.

Создайте файл `main.js` и импортируйте в него то, что было экспортировано из `ui.js`:

```javascript
import {runUI, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui';
```

В `main.js` мы должны сделать функции доступными извне - они будут вызываться из `index.html`. Для того чтобы сделать
это, надо присвоить их глобальному объекту `window`. Также надо запустить `runUI()`.

```javascript
window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
runUI();
```

или так:

```js
window.addEventListener("load", runUI);
```

Теперь можно собрать весь код с помощью webpack. Для этого запустите webpack в папке, в которой находится
`webpack.config.js`:

```shell
webpack -w
```

Ключ `-w` позволяет запустить `webpack` в режиме `watch`, для того, чтобы при любых изменениях кода он запускал
пересборку. Остановить работу webpack можно, нажав `Ctrl-C`.

В результате появится папка `dist`, и в ней - файл `bundle.js`, содержащий весь собранный код.

Остается подключить этот код к проекту. Для этого в конец `index.html` вместо тех скриптов, которые подключались ранее,
добавим следующее:

```html

<script src="./dist/bundle.js"></script>
```

Теперь у нас есть четкое разграничение областей видимости и разделение программы по уровням:
представление (`index.html`) -> логика представления (`ui.js`) ->бизнес-логика (`service.js`) ->
данные (`employees-json.js`).

Такой подход делает код значительно более управляемым, но мы только на первом шаге улучшения кода.

### Отладка с использованием `source-map`

Также обратите внимание, что мы добавили в` webpack.config.js` строчку `devtool: 'source-map'`

Таким образом мы включаем генерацию `source map`. Эта возможность позволяет связать код `bundle.js`, который выполняется
в браузере, с кодом в отдельных модулях, и позволяет видеть в отладчике отдельные модули. Откройте отладчик и найдите
исходные файлы модулей. Поставьте точки останова и попробуйте поработать с отладчиком.

### Загружаем CSS через webpack.

CSS-файлы тоже можно включать в `bundle.js` и загружать через `webpack`. Для этого нам понадобится установить
CSS-загрузчик (запускайте в папке проекта!):

```shell
npm install --save-dev style-loader css-loader
```

Также необходимо модифицировать `webpack.config.js`, добавив в него описание загрузчика CSS:

```js
module.exports ={
    /* ...вышеупомянутые объявления... */
    output: {
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
   
}
```

Теперь мы можем импортировать CSS напрямую в `main.js`:
```js
import './style.css';
```

При этом загрузку CSS в `index.html` можно больше не использовать, удалив строчку:
```html
<link rel="stylesheet" type="text/css" href="style.css">
```

Перезагрузите код, чтобы убедиться, что все работает так же.
