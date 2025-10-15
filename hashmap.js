class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }
    hash(key) {
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
}

const map = new HashMap();
console.log(map.hash("apple"));
console.log(map.hash("banana"));