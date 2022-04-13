import { formatDate } from "../service";

export class Person {
    #_dateOfBirth: Date;
    name: string;
    surname: string;

    constructor(name: string, surname: string) {
    }

    fullName(): string {
        return `${this.name} ${this.surname}`;
    }

    /**
     * Функция возвращает возраст сотрудника.
     * Это решение вполне имеет смысл нагуглить.
     * Стоит отметить здесь, что в подобных случаях не стоит изобретать велосипед.
     */
    get age(): number {
        if (!this.#_dateOfBirth) return -1
        let ageDiff = Date.now() - this.#_dateOfBirth.getTime();
        let ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    set dateOfBirth(value) {
        this.#_dateOfBirth = new Date(value);
    }

    get dateOfBirth(): string {
        return this.#_dateOfBirth ? formatDate(this.#_dateOfBirth) : '';
    }

    /**
     * Возвращает строковое представление сотрудника
     * @returns {string}
     */
    toString(): string {
        const age = this.#_dateOfBirth ?
            `Возраст: ${this.age}` : '';
        return ` 
		Имя: ${this.name}
		Фамилия: ${this.surname}
		Дата рождения: ${this.dateOfBirth} 
		${age}
		`
    }

    static fromJSON(obj: Person): Person {
        const person = new Person(obj.name, obj.surname);
        return Object.assign(person, obj)
    }
}
