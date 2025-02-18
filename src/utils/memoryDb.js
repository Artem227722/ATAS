class MemoryDatabase {
    constructor() {
        this.storage = new Map();
    }

    store(collection, data) {
        if (!this.storage.has(collection)) {
            this.storage.set(collection, []);
        }
        this.storage.get(collection).push(data);
    }

    find(collection, query) {
        if (!this.storage.has(collection)) return [];
        return this.storage.get(collection).filter(item => 
            Object.entries(query).every(([key, value]) => item[key] === value)
        );
    }
}

module.exports = { MemoryDatabase };
