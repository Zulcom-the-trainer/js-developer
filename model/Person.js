import {formatDate} from "../service";

export class Person {
    #_dateOfBirth;
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    fullName() {
        return `${this.name} ${this.surname}`;
    }

    /**
     * Функция возвращает возраст сотрудника.
     * Это решение вполне имеет смысл нагуглить.
     * Стоит отметить здесь, что в подобных случаях не стоит изобретать велосипед.
     * @returns {number|string}
     */
    get age() {
        if(!this.#_dateOfBirth) return ''
        let ageDiff = Date.now() - this.#_dateOfBirth.getTime();
        let ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    /**
     *
     * @param {string} value date as string
     */
    set dateOfBirth(value) {
        this.#_dateOfBirth = new Date(value);
    }

    get dateOfBirth() {
        return this.#_dateOfBirth ?  formatDate(this.#_dateOfBirth) : '';
    }

    /**
     * Возвращает строковое представление сотрудника
     * @returns {string}
     */
    toString() {
        const age = this.#_dateOfBirth ?
            `Возраст: ${this.age}` : '';
        return ` 
		Имя: ${this.name}
		Фамилия: ${this.surname}
		Дата рождения: ${this.dateOfBirth} 
		${age}
		`
    }

    static fromJSON(obj) {
        const person = new Person();
        return Object.assign(person, obj)
    }
}
