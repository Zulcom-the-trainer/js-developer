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
function addEmployee(name, surname, department) {

}

/**
 * Удаляет сотрудника по id
 * @param {number} id
 */
function removeEmployee(id) {

}


/**
 * Функция выводит в консоль всю информацию о сотруднике.
 *
 * @param {*} employee сотрудник
 */
function showEmployee(employee) {
    // Для этого функция должна использовать метод Object.keys для получения всех полей объекта employee. Далее она должна выводить информацию в формате ключ=значение в консоль, используя метод console.log().

}

/**
 * Функция showEmployees() должна брать список всех сотрудников из JSON и выводить информацию по каждому
 */
function showEmployees() {
  // Используйте функцию showEmployee(employee). Для перебора можно использовать for...of. Альтернативно можно использовать forEach.
}


/* Откройте консоль в браузере и запустите разные функции для проверки их работоспособности */