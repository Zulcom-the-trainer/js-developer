/**
 * Employee
 * @typedef {Object} Employee
 * @property {number} id
 * @property {string} name
 * @property {string} surname
 * @property {string} department
 * @property {Date|undefined} dateOfBirth дата рождения сотрудника
 * @property {string[]|undefined} phones список телефонов сотрудника
 * @property {number} managerId ид руководителя
 */
/**
 * Функция находит сотрудника по его имени.
 * В случае, если имя или фамилия пустые, они игнорируются.
 * @param name
 * @param surname
 *
 * @example
 * findByName("","") находит всех сотрудников.
 *
 * @example
 * findByName("Иван") находит всех Иванов
 *
 * @example
 * findByName(null,"Иванов") находит всех Ивановых.
 *
 * @returns {Employee} список сотрудников
 */
function findByName(name, surname) {
    // Использовать цикл for (лучше for ... of) для перебора сотрудников.
    for (const employee of DATA.employees) {
        if ((!name || name.length === 0 || employee.name === name)
            && (!surname || surname.length === 0 || employee.surname === surname)) {
            return employee;
        }
    }
}

/**
 * Функция добавляет сотрудника по имени. id присваивается автоматически, как самый большой id среди сотрудников + 1. В случае, если имя или фамилия не заданы, функция выбрасывает исключение с сообщением об ошибке.
 * @param name {string} The name of the employee
 * @param surname {string} The surname of the employee
 * @param department {string} The department of the employee
 * @throw {Error} name or surname should be passed
 *
 * @returns {number} id of the new employee
 */
function addEmployee(name, surname, department = 'IT') {
    if (!name || !surname || name.length === 0 || surname.length === 0) {
        throw new Error("name or surname should be passed")
    }
    let max = 0;
    for (const employee of DATA.employees) {
        if (employee.id > max) {
            max = employee.id;
        }
    }
    const id = max + 1;
    DATA.employees.push({
        id,
        name: name.trim(),
        surname: surname.trim(),
        department
    })
    return id;
}

/**
 * Удаляет сотрудника по id
 * @param {number} id
 */
function removeEmployee(id) {
    let index = 0;
    for (const employee of DATA.employees) {
        if (employee.id === id) {
            DATA.employees.splice(index, 1)
            return;
        }
        index++;
    }
}


/**
 * Функция выводит в консоль всю информацию о сотруднике.
 *
 * @param {Employee} employee сотрудник
 * @return {string} сотрудник
 */
function showEmployee(employee) {
    // Для этого функция должна использовать метод Object.keys для получения всех полей объекта employee. Далее она должна выводить информацию в формате ключ=значение в консоль, используя метод console.log().
    let employeeEntries = []
    for (const key of Object.keys(employee)) {
        if (['surname', 'name'].includes(key)) {
        } else {
            employeeEntries.push(`${key}: ${employee[key]}`)
        }
    }
    const text = `${employee.name} ${employee.surname} ${employeeEntries.join(', ')}`;
    console.log(text)
    return text;
}

/**
 * Функция showEmployees() должна брать список всех сотрудников из JSON
 * и выводить информацию по каждому, используя функцию showEmployee(employee).
 * Для перебора можно использовать for...of. Альтернативно можно использовать forEach.
 */
function showEmployees() {
    for (const employee of DATA.employees) {
        showEmployee(employee)
    }
    DATA.employees.forEach(showEmployee)
}

showEmployees();


const employeeMap = {};

/**
 * Поиск сотрудника по id
 * @param id
 * @returns {Employee}
 */
function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (var e of DATA.employees) {
        if (id === e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
}

/**
 * Добавляет номер телефона.
 * Для этого используется свойство phones типа массив.
 * Если такое свойство отсутствует, оно создается.
 * @param id
 * @param {string} phone
 */
function addPhone(id, phone) {
    const employee = findById(id);
    const phones = employee.phones;
    if (!phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}

/**
 * Устанавливает дату рождения сотрудника
 * @param id
 * @param date
 */
function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;
}

/**
 * Функция возвращает возраст сотрудника.
 * Принимает id сотрудника в качестве параметра.
 * Это решение вполне имеет смысл нагуглить.
 * Стоит отметить здесь, что в подобных случаях не стоит изобретать велосипед.
 * @param id
 * @returns {number}
 */
function getAge(id) {
    const employee = findById(id);
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Приводит дату в формат ДД.ММ.ГГГГ
 * @param date
 * @returns {string}
 */
function formatDate(date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth();
    if (month < 10) month = '0' + month;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

/**
 * Возвращает строковое представление сотрудника
 * @param id
 * @returns {string}
 */
function getEmployeeInfo(id) {
    const e = findById(id);
    const phones = e.phones ?
        `Список телефонов: ${e.phones}` : '';
    const age = e.dateOfBirth ?
        `Возраст: ${getAge(e.id)}` : '';
    return ` 
		Имя: ${e.name}
		Фамилия: ${e.surname}
		Дата рождения: ${formatDate(e.dateOfBirth)}
		${phones} 
		${age}
	`;
}

/**
 * Возвращает JSON сотрудника
 * @param id
 * @returns {string}
 */
function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

function testEmployee() {
    addPhone(133, "555-55-55");
    addPhone(133, "666-66-66");
    setDateOfBirth(133, new Date(2000, 1, 1))
    const info = getEmployeeInfo(133);
    console.log(info);
}

/**
 * @returns {SelectOption[]}
 */
function getEmployeesOptions() {

}
