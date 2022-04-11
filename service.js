import {Employee} from "./model/Employee";

/**
 * Приводит дату в формат ДД.ММ.ГГГГ
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth();
    if (month < 10) month = '0' + month;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

/**
 * Функция добавляет сотрудника по имени. id присваивается автоматически, как самый большой id среди сотрудников + 1. В случае, если имя или фамилия не заданы, функция выбрасывает исключение с сообщением об ошибке.
 * @param employees {Employee[]} employees array
 * @param name {string} The name of the employee
 * @param surname {string} The surname of the employee
 * @param department {string} The department of the employee
 * @throw {Error} name or surname should be passed
 *
 * @returns {[number,Employee[]]} id of the new employee
 */
export function addEmployee(employees, name, surname, department = 'IT') {
    if (!name || !surname || name.length === 0 || surname.length === 0) {
        throw new Error("name or surname should be passed")
    }
    let max = 0;
    for (const employee of employees) {
        if (employee.id > max) {
            max = employee.id;
        }
    }
    const id = max + 1;
    employees.push(new Employee(name.trim(), surname.trim(), department, id))
    return [id, employees];
}


/**
 * Функция showEmployees() должна брать список всех сотрудников из JSON
 * и выводить информацию по каждому, используя функцию showEmployee(employee).
 * Для перебора можно использовать for...of. Альтернативно можно использовать forEach.
 * @param employees {Employee[]}
 */
export function showEmployees(employees) {
    console.log('Employees data:')
    printEmployeesData(employees)
}

export async function printEmployeesData(employees) {
    for (const employee of employees) {
        try {
            console.log(employee.fullName(), ' total:' + await employee.total())
        } catch (e) {
            console.log(`${employee.fullName()} have too big bonus: ${e}`)
        }
    }
}

/**
 * @param {Employee[]} employees
 * @returns {SelectOption[]}
 */
export function getEmployeesOptions(employees) {
    return employees.map(({name, surname, id}) => ({
            text: `${name} ${surname}`,
            value: id
        })
    )
}

/**
 * Поиск сотрудников по полям
 * @param {Employee[]} employees
 * @param name
 * @param surname
 * @param managerId
 */
export function searchEmployee(employees, name, surname, managerId) {
    let results = [];
    for (const employee of employees) {
        if (
            (!name || employee.name === name) &&
            (!surname || employee.surname === surname) &&
            (!managerId || (employee.managerId && employee.managerId === managerId))
        ) {
            results.push(employee)
        }
    }
    return results;

}