
// models/Cat.js
export default class Cat {
    constructor(id, name, isOutside, lastUpdate = null) {
        this.id = id;
        this.name = name;
        this.isOutside = isOutside;
        this.lastUpdate = lastUpdate ? lastUpdate : Math.floor(Date.now() / 1000);
    }

    setOutside(status) {
        this.isOutside = status;
        this.updateLastUpdate();
    }

    updateLastUpdate() {
        this.lastUpdate = Math.floor(Date.now() / 1000);
    }

    displayInfo() {
        console.log(`ID: ${this.id}, Name: ${this.name}, Is Outside: ${this.isOutside}, Last Update: ${this.lastUpdate}`);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            isOutside: this.isOutside,
            lastUpdate: this.lastUpdate
        };
    }

    static fromJSON(catData) {
        return new Cat(catData.id, catData.name, catData.isOutside, catData.lastUpdate);
    }
}