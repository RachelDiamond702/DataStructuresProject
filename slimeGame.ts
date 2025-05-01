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

board.forEach(row => {
    console.log(row.join(' ')); // Join each row and print
});