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

    set(key, value) {
        const index = this.hash(key);

        // Initialize the bucket if it’s empty
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];

        // Check if key exists → update value
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) { // bucket[i] = [key, value]
                bucket[i][1] = value;
                return; // done updating
            }
        }

        // Key does not exist → add new key-value pair
        bucket.push([key, value]);
        this.size++;

        // Check if we need to grow
        if (this.size / this.capacity >= this.loadFactor) {
            this._grow();
        }
    }

    // Private method to grow the hash map
    _grow() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value); // re-insert into new buckets
                }
            }
        }
    }
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) return null;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null
    }
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++){
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }
}

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");

console.log(map.get("apple"));  // → red
console.log(map.has("banana")); // → true
console.log(map.has("carrot")); // → false

map.remove("banana");
console.log(map.has("banana")); // → false
console.log(map.get("banana")); // → null
