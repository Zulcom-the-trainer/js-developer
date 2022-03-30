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
 * @returns {*} список сотрудников
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
        name,
        surname,
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
 * @param {*} employee сотрудник
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
    console.log(`${employee.name} ${employee.surname} ${employeeEntries.join(', ')}`)
}

/**
 * Функция showEmployees() должна брать список всех сотрудников из JSON и выводить информацию по каждому, используя функцию showEmployee(employee). Для перебора можно использовать for...of. Альтернативно можно использовать forEach.
 */
function showEmployees() {
    for (const employee of DATA.employees) {
        showEmployee(employee)
    }
    DATA.employees.forEach(showEmployee)
}

showEmployees();




/**
 * Функция findById(id) должна перебирать всех сотрудников и находить сотрудника с совпадающим id
 * @param {number} id ИД сотрудника
 * @returns {*} employee
 * @throws {Error} сотрудник с id не найден!
 */
function findById(id) {

}

/**
 * Список телефонов должен храниться внутри JSON-объекта сотрудник. В качестве поля используется свойство phones типа массив. Если такое поле у сотрудника отсутствует, оно должно быть создано.
 * @param {number} id
 * @param {string} phone
 * @throw {Error} сотрудник с id не найден!
 */
function addPhone(id, phone) {

}

/**
 * Устанавливает дату рождения сотрудника
 * @param {number} id
 * @param {Date} date
 */
function setDateOfBirth(id, date) {

}

// Функция getAge(id) принимает id сотрудника в качестве параметра и возвращает возраст сотрудника. Стоит отметить здесь, что в подобных случаях не стоит изобретать велосипед, и лучше нагуглить подходящее решение.
/**
 *
 * @param {number} id
 * @throw {Error} У найденого сотрудника не установлена дата рождения
 */
function getAge(id) {

}

// formatDate(date) Данная функция должна возвращать строку с датой. Для этого можно использовать методы класса Date: getDate() , getMonth(), getYear(). Для даты и месяца надо добавлять на первую позицию 0, если дата или месяц меньше 10.
/**
 * Возвращает дату в формате дд.мм.гггг
 * @param {Date} date
 */
function formatDate(date) {

}

/**
 * Функция должна возвращать строку, содержащую подробную информацию о сотруднике: имя, фамилию, дату рождения в отформатированном виде, возраст, список телефонов сотрудника.
 * @param {number} id
 * @return {string}
 */
function getEmployeeInfo(id) {

}

// Написать тестовую функцию, которая добавляет сотрудника, добавляет телефоны, устанавливает дату рождения, и выводит подробную информацию о сотруднике в консоль.
function testEmployee() {

}

