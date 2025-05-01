// defining tile types for board
enum tileType {
    lava = "lava",
    water = "water",
    grass = "grass",
    rock = "rock",
    dirt = "dirt"
}

// setting up 5x5 board
const board: tileType[][] = [];

for(let i = 0; i < 5; i++){
    const row: tileType[] = [];
    for(let j = 0; j < 5; j++){
        const randomTile = getRandomTile();
        row.push(randomTile);
    }
    board.push(row);
}

// random tile helper function
function getRandomTile(): tileType{
    const tiles = Object.values(tileType);
    const randomIndex = Math.floor(Math.random()*tiles.length);
    return tiles[randomIndex];
}

console.table(board); // testing board size and randomizing

// priority queue helper class (added to support tile selection)
class PriorityQueue<T> {
    private items: { value: T, priority: number }[] = [];

    enqueue(value: T, priority: number) {
        this.items.push({ value, priority });
        this.items.sort((a, b) => a.priority - b.priority); // sort by lowest cost
    }

    dequeue(): T {
        return this.items.shift()!.value;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// setting up "slime" character
const slime = {
    position: {x: 2, y: 2}, // starting position
    energy: 10, // starting energy 
    points: 0, // starting points (tiles touched)

    move(){ // setting up possible movements
        const directions = [
            {x: 1, y: 0}, // right
            {x: -1, y: 0}, // left
            {x: 0, y: 1}, // up
            {x: 0, y: -1} // down
        ];

        const pq = new PriorityQueue<{x: number, y: number}>(); // setting up priority queue

        for (const dir of directions){ // moving character
            const newX = this.position.x + dir.x;
            const newY = this.position.y + dir.y;

            if(this.isValidMove(newX, newY)){ // checks if player has enough energy for move
                const cost = this.getEnergyCost(newX, newY);

                if(board[newY][newX] !== tileType.lava){
                    pq.enqueue({x: newX, y: newY}, cost); // fixed typo: enque -> enqueue
                }
            }
        }

        if(!pq.isEmpty()){
            const next = pq.dequeue(); // get tile with lowest cost
            const cost = this.getEnergyCost(next.x, next.y);

            if(this.energy >= cost){
                this.position = {x: next.x, y: next.y};
                this.energy -= cost;
                this.points++;
                console.log(`Moved to (${next.x}, ${next.y}) - Energy left: ${this.energy}`);
            }
            else{
                console.log("Not enough energy to move.");
            }
        }
        else {
            console.log("No valid non-lava tiles nearby."); // moved this else block out of inner if
        }
    },

    isValidMove(x: number, y: number): boolean {
        return x >= 0 && x < 5 && y >= 0 && y < 5;
    },

    getEnergyCost(x: number, y: number): number {
        const tile = board[y][x]; // y is row, x is column
        switch (tile) {
            case tileType.lava: return Infinity; // lava = death
            case tileType.water: return 3;
            case tileType.rock: return 2;
            case tileType.grass: return 1;
            case tileType.dirt: return 0;
            default: return Infinity;
        }
    },

    displayStatus() {
        console.log(`Slime is at (${this.position.x}, ${this.position.y})`);
        console.log(`Energy: ${this.energy}`);
        console.log(`Points: ${this.points}`);
    }
};

// testing slime status and movement
slime.displayStatus();
slime.move();
slime.displayStatus();
