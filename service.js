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