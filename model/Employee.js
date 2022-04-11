/**
 * EmployeeJSON
 * @typedef {Object} EmployeeJSON
 * @property {number} id
 * @property {string} name
 * @property {string} surname
 * @property {string} department
 * @property {Date|undefined} dateOfBirth дата рождения сотрудника
 * @property {string[]|undefined} phones список телефонов сотрудника
 * @property {number} managerId ид руководителя
 */
import {Person} from "./Person";

export class Employee extends Person {
    constructor(name, surname, department, id, managerId = null) {
        super(name, surname);
        this.department = department;
        this.id = id
        this.managerId = managerId;
        this.salary = 1000;
    }

    toString() {
        return `${super.toString()}
                ${this._phones}`
    }

    static fromJSON(obj) {
        const employee = new Employee();
        return Object.assign(employee, obj)
    }

    toJSON() {
        return JSON.stringify(this);
    }

    /**
     * Добавляет номер телефона.
     * Для этого используется свойство phones типа массив.
     * Если такое свойство отсутствует, оно создается.
     * @param {string[]} phones
     */
    set phones(phones) {
        this._phones = phones;
    }

    get phones() {
        return !Array.isArray(this._phones) ? '' : this._phones.join(', ')
    }

    bonus() {
        return new Promise((resolve, reject) => {
            const bonus = Math.round(Math.random() * 1000);
            const maxBonusAmount = 700;
            setTimeout(() => bonus > maxBonusAmount ? reject(bonus) : resolve(bonus), 1000)
        })
    }

    /**
     *
     * @returns {Promise<number>}
     */
    async total() {
        return this.salary + await this.bonus()
    }
}

/**
 *
 * @param {EmployeeJSON[]} employeesJSON
 * @returns {Employee[]}
 */
export function jsonToEmployees(employeesJSON) {
    const result = []
    for (const employeesJSONElement of employeesJSON) {
        result.push(Employee.fromJSON(employeesJSONElement))
    }
    return result
}