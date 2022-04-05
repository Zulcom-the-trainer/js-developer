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
## Дополнительные задания

- Реализовать поиск при любом изменении полей поисковой формы (без нажатия на кнопку поиска)
- Реализовать возможность поиска по дате рождения


# Webpack - занятие 2
## Использование горячей перезагрузки

Горячая перезагрузка - очень удобная возможность для разработки, позволяющая видеть изменения на странице без
перезагрузки страницы. При этом состояние на странице сохраняется, что позволяет не восстанавливать его снова в цикле
изменение кода - тестирование.

WebPack содержит плагин для реализации горячей перезагрузки. Для ее использования вам понадобится установить webpack
сервер для разработки:

```shell
npm i -g webpack-dev-server
```

Это установит webpack-dev-server глобально, чтобы его можно было открыть из любой папки. Также нам понадобится локальная
установка `webpack-cli` и `webpack`, используемых в `webpack-dev-server`, их тоже нужно установить:

```shell
npm install --save-dev webpack-cli webpack
```

Также поставьте сервер локально:

```shell
npm i webpack-dev-server
```

Далее необходимо изменить конфигурацию `webpack.config.js`. Для этого в начале файла создайте переменную

```js
const webpack = require('webpack');
```

Функция `require` - это аналог import в EcmaScript 2015.

Также вам надо будет настроить devServer: для этого добавьте в объект `module.exports`:
```
{
   devServer: {
      hot: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   }
}
```

Это - настройка `webpack-dev-server`. Мы указываем, что хотим включить hot deploy, то есть горячую перезагрузку кода, и
в качестве местоположения нашего кода будет выступать папка `./dist`. В этой папке будет появляться множество файлов с
расширением `.hot-update.js` - это патчи системы. Папку dist придется периодически чистить.

Еще нужно описать текущий режим работы webpack - production или `development`:

```
module.exports = { mode: 'development', ...
```

Также потребуется подключить плагин для горячей перезагрузки, добавьте в объект `module.exports`:

```js
plugins: [
    new webpack.HotModuleReplacementPlugin()
],
```

Еще нужно поправить раздел entry в `webpack.config.js` - он теперь должен выглядеть так:

```js
entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './main.js'
],
```

Также нужно переместить `index.html` в папку `dist`, именно оттуда сервер будет брать код, а также поменять ссылку на
`bundle.js`, т.к. теперь он находится в текущей папке, а не в `dist/bundle.js`:

```html

<script src="bundle.js"></script>
```

Теперь вы можете запустить сервер:
`webpack-dev-server`

И открыть страницу по адресу `http://localhost:8080`.

При открытии страницы в консоли браузера вы увидите:

```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
```

Это значит, что горячая загрузка заработала. Попробуйте поменять что-нибудь в коде программы (обратите внимание, что
менять надо один из `.js` файлов, изменение `index.html` не поддерживает горячую перезагрузку). Например, можно изменить
текст у кнопки удаления в функции `showEmployees()` модуля `ui.js`:

```js
removeButton.innerHTML = "xxx";
```

При этом страница в браузере автоматически перезагрузится.

Однако, если у вас будут изменены данные, их состояние не сохранится. Скажем, если у вас был добавлен какой-либо
сотрудник, данные сбросятся на первоначальные. Чтобы этого не происходило, нужно добавить в `main.js` следующий код:

```js
if (module.hot) {
    module.hot.accept();
}
```

Теперь при изменении кода страница не будет перезагружаться, но новый код будет применяться к странице с сохранением ее
состояния. Для проверки добавьте сотрудника и измените надпись на кнопке удаления снова.

Обратите внимание, что сейчас выпадающие списки с именами сотрудников (например, в поле "поиск по менеджеру")
увеличиваются при каждой горячей перезагрузке. Чтобы это починить, вы можете добавить в начало функции `fillSelect()`
в `ui.js:`

```js

select.innerHTML = "";
```

Это обнулит выпадающий список перед добавлением в него новых элементов. Результат изменений вы увидите сразу, без
перезагрузки страницы.

Дополнительные возможности горячей перезагрузки

Также вы можете передавать данные в перезагруженную страницу, если какое-то состояние теряется, и его необходимо
восстанавливать. Для этого можно добавить функцию обратного вызова:

```js
module.hot.dispose(function (data) { // Очистка слушателей и передача данных data 
    // в обновленный модуль data.info = "some info";
});
```

Эта функция `function(data)` будет вызвана, когда страница будет обновлять загруженный в нее код. В этой функции можно
выполнить очистку слушателей событий, а в переменную data можно записать любые данные, которые будут доступны из
перезагруженной страницы с помощью переменной `module.hot.data`. Скажем, такой код:
`console.log(module.hot.data.info);
`
Будет выводить `some info`.

### Экспорт из модуля по умолчанию

ES2015 поддерживает синтаксис экспорта и импорта по умолчанию.

Изменим код employees-json.js c

```js
    export const DATA = {...}
```

на

```js
 export default {...}
```

Также изменим импорт в файле `service.js` c
`import { DATA } from './employees-json';`
на `import DATA from './employees-json';`
Такой экспорт по умолчанию в файле может быть только один. Экспортировать можно объект (как в данном случае), функцию,
массив, любое значение, класс и так далее. Как мы видим, при экспорте имя не задается, и устанавливается при импорте -
так, в данном случае имя могло быть не `DATA`, а любым другим.

В случае, если в файле есть дефолтный экспорт, при импорте он должен указываться без фигурных скобок, при этом все
остальные импорты должны быть в фигурных скобках.

### Расширение возможностей модуля с помощью ре-экспорта

Допустим у нас есть задача расширить или изменить поведение какой-то функции без изменения модуля. Это может
понадобиться, если данный модуль используется во многих местах, может быть даже в разных проектах (если это библиотечный
модуль), а нам необходимы локальные изменения/дополнения. Также возможно, что какие-то возможности нам нужны только при
разработке, а в продакшн их следует отключить.

Скажем, нам нужно при загрузке страницы выводить в лог текущее содержание объекта `DATA`. Сейчас за действия при
загрузке страницы отвечает функция `runUI`. Попробуем ее дополнить, не меняя исходный модуль `ui.js`.

Для этого создадим новый модуль `ui-dev.js` со следующим содержанием:

```js
import * as ui from './ui';

export * from './ui';
import DATA from './employees-json';

export function runUI() {
    ui.runUI();
    console.log(DATA);
}
```

На первой строчке мы импортируем все, что было экспортировано из исходного модуля, в пространство имен `ui`. Это значит,
что к исходному `runUI` можно будет обратиться так:
`ui.runUI()`

На второй строчке мы используем ре-экспорт. Это значит, что все, что было экспортировано из модуля `ui.js`, будет
доступно и при импорте из модуля `ui-dev.js`. Таким образом, у нас есть возможность расширить функциональность исходного
модуля, что мы и делаем, переопределяя функцию `runUI`.

Теперь в `main.js` будем импортировать функции не из модуля `ui.js`, а из модуля `ui-dev.js`:

```js
import {runUI, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui-dev';
```

При этом функция `runUI()` будет импортирована в измененном виде, и мы увидим в консоли значение переменной `DATA`.
Также мы можем сделать универсальный модуль, который будет ре-экспортировать содержимое `ui-dev.js` или `ui.js` в
зависимости от текущего режима, прописанного в `webpack.config.js` - `production` или `development`. Режим можно узнать
с помощью переменной
`process.env.NODE_ENV`.

В зависимости от режима можно включать или выключать логгирование и другие сервисные функции. Стандартный синтаксис
`import`/`export` нельзя заключать в блок `if`, поэтому мы будем использовать синтаксис CommonJS, который также
понимается webpack. Вот содержимое модуля `ui-all.js`:

```js
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./ui-dev.js')
} else {
    module.exports = require('./ui.js')
}
```

Остается импортировать из модуля `ui-all` в модуль` main.js`:

```js
import {runUI, addEmployeeUI, openTab, searchEmployeeUI} from './employees/ui-all';
```

Теперь в зависимости от режима разработки при старте программы будет (или не будет) выводиться в консоль значение `DATA`
. Чтобы сделать разницу между режимами более явной, поменяйте цвет фона для режима разработки в модуле `ui-dev.js`:

```js
export function runUI() {
    ui.runUI();
    console.log(DATA.employees);
    document.body.style.backgroundColor = '#EFE';
}
```

Теперь в режиме development цвет фона будет зеленый. Обратите внимания, что после изменения режима в `webpack.config.js`
необходимо перезапустить `webpack-dev-server`.

Также можно управлять настройкой режима непосредственно при запуске: для этого надо задать режим 
```shell
webpack-dev-server --mode=development или webpack-dev-server --mode=production
```

Такая настройка имеет более высокий приоритет, чем конфигурация `webpack.config.js`. Также режим можно задавать и у самого
`webpack` (если не используется` webpack-dev-server`).

Дополнительное задание

- Спрашивайте подтверждение при удалении сотрудника, но только в режиме `production`. Используйте функцию `confirm("Вы
   уверены, что хотите удалить сотрудника?")`
