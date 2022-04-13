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
import { Person } from "./Person";

export class Employee extends Person {
    department: string;
    id: number;
    managerId?: number;
    readonly salary: number = 1000;
    _phones?: Array<string>;

    constructor(name: string, surname: string, department: string, id: number, managerId: number = null) {
        super(name, surname)
    }

    toString(): string {
        return `${super.toString()}
                ${this._phones}`
    }

    static fromJSON(obj: Employee) {
        const employee = new Employee(obj.name,
            obj.surname,
            obj.department,
            obj.id,
            obj.managerId);
        return Object.assign(employee, obj)
    }

    toJSON(): string {
        return JSON.stringify(this);
    }

    /**
     * Добавляет номер телефона.
     * Для этого используется свойство phones типа массив.
     * Если такое свойство отсутствует, оно создается.
     */
    set phones(phone: string) {
        if (Array.isArray(this._phones)) {
            this._phones.push(phone)
        } else {
            this._phones = [phone]
        }
    }

    get phones(): string {
        return !Array.isArray(this._phones) ? '' : this._phones.join(', ')
    }

    bonus(): Promise<number> {
        return new Promise((resolve, reject) => {
            const bonus = Math.round(Math.random() * 1000);
            const maxBonusAmount = 700;
            setTimeout(() => bonus > maxBonusAmount ? reject(bonus) : resolve(bonus), 1000)
        })
    }

    async total(): Promise<number> {
        return this.salary + await this.bonus()
    }
}


export function jsonToEmployees(employeesJSON: Employee[]): Employee[] {
    const result = []
    for (const employeesJSONElement of employeesJSON) {
        result.push(Employee.fromJSON(employeesJSONElement))
    }
    return result
}