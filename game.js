// Mendapatkan referensi ke elemen canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variabel untuk menentukan apakah permainan sudah dimulai atau belum
let gameStarted = false;
let gameRunning = false;
let paused = false;

const tileSize = 25;

function drawGrid() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  for (let x = 0; x < canvas.width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Mendapatkan referensi ke elemen tombol "Play"
const playButton = document.getElementById("playButton");

// Menambahkan event listener pada tombol "Play"
playButton.addEventListener("click", handlePlayButtonClick);

// Mendapatkan referensi ke elemen tombol "Pause"
const pauseButton = document.getElementById("pauseButton");

function handlePauseButtonClick() {
  if (gameStarted && gameRunning) {
    paused = !paused;

    if (paused) {
      pauseButton.style.backgroundColor = "orange";
      pauseButton.innerText = "Lanjut";
      playButton.innerText = "Dijeda"; // Mengubah tulisan pada tombol "Play" saat dijeda
    } else {
      pauseButton.style.backgroundColor = "#4caf50";
      pauseButton.innerText = "Jeda";
      playButton.innerText = "Dimainkan"; // Mengubah tulisan pada tombol "Play" saat dilanjutkan
    }
  }
}

// Menambahkan event listener pada tombol "Pause"
pauseButton.addEventListener("click", handlePauseButtonClick);

// Mendapatkan referensi ke elemen tombol
const randomDroidButton = document.getElementById("randomDroidButton");

function drawRedDroid() {
  ctx.fillStyle = "red";
  let isPath = map[redDroid.y][redDroid.x] === 1;
  if (
    isPath &&
    redDroid.x >= 0 &&
    redDroid.x < mapWidth &&
    redDroid.y >= 0 &&
    redDroid.y < mapHeight
  ) {
    const x = redDroid.x * tileSize;
    const y = redDroid.y * tileSize;

    ctx.fillRect(x, y, tileSize, tileSize);

    // Menambahkan border pada droid merah
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize);
  }
}

function drawGreenDroid() {
  ctx.fillStyle = "green";
  let isPath = map[greenDroid.y][greenDroid.x] === 1;
  if (
    isPath &&
    greenDroid.x >= 0 &&
    greenDroid.x < mapWidth &&
    greenDroid.y >= 0 &&
    greenDroid.y < mapHeight
  ) {
    const x = greenDroid.x * tileSize;
    const y = greenDroid.y * tileSize;

    ctx.fillRect(x, y, tileSize, tileSize);

    // Menambahkan border pada droid hijau
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize);
  }
}

function drawDroids() {
  drawRedDroid();
  drawRedDroids();
  drawGreenDroid();
}

function newRedDroids() {
  drawRedDroid();
  drawRedDroids();
}

// Mendefinisikan posisi awal droid merah dan droid hijau
let redDroid = { x: 0, y: 0 };
let greenDroid = { x: 16, y: 12 };

// Mendapatkan referensi ke elemen tombol
const addDroidRedButton = document.getElementById("addDroidRed");

function drawRedDroids() {
  ctx.fillStyle = "red";

  for (const redDroid of redDroids) {
    const isPath = map[redDroid.y][redDroid.x] === 1;
    if (
      isPath &&
      redDroid.x >= 0 &&
      redDroid.x < mapWidth &&
      redDroid.y >= 0 &&
      redDroid.y < mapHeight
    ) {
      const x = redDroid.x * tileSize;
      const y = redDroid.y * tileSize;

      ctx.fillStyle = "red";
      ctx.fillRect(x, y, tileSize, tileSize);

      // Menambahkan border pada setiap sisi droid
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }
}

// Array untuk menyimpan posisi Droid Merah Duplikat
let redDroids = [];

function addRedDroid() {
  if (redDroids.length < 3) {
    const redDroidNumber = redDroids.length + 1;
    console.log("Tekan tombol tambah ke-" + redDroidNumber);

    // Menambahkan droid merah baru pada setiap sudut peta
    const topRightDroid = { x: mapWidth - 1, y: 0 };
    const bottomRightDroid = { x: mapWidth - 1, y: mapHeight - 1 };
    const bottomLeftDroid = { x: 0, y: mapHeight - 1 };

    if (redDroidNumber === 1) {
      redDroids.push(topRightDroid);
    } else if (redDroidNumber === 2) {
      redDroids.push(bottomRightDroid);
    } else if (redDroidNumber === 3) {
      redDroids.push(bottomLeftDroid);
    }

    // Gambar ulang seluruh peta, grid, dan Droid Merah
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawGrid();
    drawRedDroids();
  }
  drawDroids();
}

// Menambahkan event listener ke tombol "Tambah Droid Merah"
addDroidRedButton.addEventListener("click", addRedDroid);

function randomizeDroidPosition() {
  if (!gameRunning) {
    let validRedPosition = false;
    let validGreenPosition = false;

    while (!validRedPosition || !validGreenPosition) {
      redDroid.x = Math.floor(Math.random() * mapWidth);
      redDroid.y = Math.floor(Math.random() * mapHeight);
      greenDroid.x = Math.floor(Math.random() * mapWidth);
      greenDroid.y = Math.floor(Math.random() * mapHeight);

      // Logika agar ketika diacak hanya didalam canvas game saja
      validRedPosition = map[redDroid.y][redDroid.x] === 1;
      validGreenPosition = map[greenDroid.y][greenDroid.x] === 1;
    }

    // Acak posisi droid merah
    redDroids.forEach(function (droid) {
      let validPosition = false;

      while (!validPosition) {
        droid.x = Math.floor(Math.random() * mapWidth);
        droid.y = Math.floor(Math.random() * mapHeight);

        validPosition = map[droid.y][droid.x] === 1;
      }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
    //drawRedDroids();
  }
}

// Menambahkan event listener ke tombol "Randomize Droid Position"
randomDroidButton.addEventListener("click", randomizeDroidPosition);

// Mendefinisikan ukuran peta
const mapWidth = 32;
const mapHeight = 24;

const randomMapButton = document.getElementById("randomMapButton");

function handleRandomMapButtonClick() {
  generateMaze(Math.floor(mapWidth / 2), Math.floor(mapHeight / 2)); // Mengacak peta dengan memanggil generateMaze()
  drawMap(); // Menggambar peta yang teracak

  drawGrid();
  drawDroids(); // Menggambar posisi droid setelah peta teracak
  //drawRedDroids();
}

randomMapButton.addEventListener("click", handleRandomMapButtonClick);

// Inisialisasi peta dengan nilai 1 (dinding) di setiap sel
const map = [];
for (let row = 0; row < mapHeight; row++) {
  const newRow = [];
  for (let col = 0; col < mapWidth; col++) {
    if (
      row === 0 ||
      row === mapHeight - 1 ||
      col === 0 ||
      col === mapWidth - 1
    ) {
      newRow.push(1); // Tepian canvas diisi dengan jalan
    } else {
      newRow.push(0); // Selain tepian canvas diisi dengan dinding
    }
  }
  map.push(newRow);
}

function generateMaze(x, y) {
  map[y][x] = 1; // Tandai posisi saat ini sebagai celah
  const directions = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];
  shuffle(directions);

  for (const [dx, dy] of directions) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (
      nextX >= 0 &&
      nextX < mapWidth &&
      nextY >= 0 &&
      nextY < mapHeight &&
      map[nextY][nextX] === 0
    ) {
      map[nextY][nextX] = 1;
      map[y + dy / 2][x + dx / 2] = 1;

      generateMaze(nextX, nextY);
    }
  }
}

function createShortcut() {
  const centerX = Math.floor(mapWidth / 2);
  const centerY = Math.floor(mapHeight / 2);

  // Jalan pintas horizontal
  for (let col = 1; col < mapWidth - 1; col++) {
    if (col !== centerX) {
      map[centerY][col] = 1; // Mengubah sel menjadi jalan
    }
  }

  // Jalan pintas vertikal
  for (let row = 1; row < mapHeight - 1; row++) {
    if (row !== centerY) {
      map[row][centerX] = 1; // Mengubah sel menjadi jalan
    }
  }
}

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      const tile = map[row][col];
      const x = col * tileSize;
      const y = row * tileSize;

      if (tile === 0) {
        ctx.fillStyle = "gray"; // Warna dinding
      } else {
        ctx.fillStyle = "white"; // Warna jalan
      }

      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

// Fungsi untuk mengacak elemen dalam array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mendapatkan referensi ke elemen tombol
const povDroidRedButton = document.getElementById("povDroidRed");

let povDroidRedEnabled = false; // Status sudut pandang droid merah

function togglePovDroidRed() {
  povDroidRedEnabled = !povDroidRedEnabled;

  if (povDroidRedEnabled) {
    // Menampilkan hanya peta, droid merah, dan droid merah terduplikasi
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawRedDroid();
    drawRedDroids(); // Menggambar droid merah terduplikasi
    addDroidRedButton.disabled = true;
    addDroidRedButton.style.backgroundColor = "#ffffff";
    randomDroidButton.disabled = true;
    randomDroidButton.style.backgroundColor = "#ffffff";
    povDroidGreenButton.disabled = true;
    povDroidGreenButton.style.backgroundColor = "#ffffff";
  } else {
    // Menampilkan peta, droid merah, dan droid hijau
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
    // drawRedDroids(); // Menggambar droid merah terduplikasi
    addDroidRedButton.disabled = false;
    addDroidRedButton.style.backgroundColor = "#4caf50";
    randomDroidButton.disabled = false;
    randomDroidButton.style.backgroundColor = "#4caf50";
    povDroidGreenButton.disabled = false;
    povDroidGreenButton.style.backgroundColor = "#4caf50";
  }
}

// Menambahkan event listener ke tombol "Pandangan Droid Merah"
povDroidRedButton.addEventListener("click", togglePovDroidRed);

const povDroidGreenButton = document.getElementById("povDroidGreen");
let povDroidGreenEnabled = false;

povDroidGreenButton.addEventListener("click", togglePovDroidGreen);

const greenDroids = []; // Array untuk menyimpan posisi droid hijau
greenDroids.push(greenDroid);

function togglePovDroidGreen() {
  povDroidGreenEnabled = !povDroidGreenEnabled;

  // Memperbarui status disabled pada slider
  slider.disabled = !povDroidGreenEnabled;

  if (povDroidGreenEnabled) {
    // Menampilkan peta, droid hijau, dan pandangan droid hijau
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
    drawPovDroidGreen();
    addDroidRedButton.disabled = true;
    addDroidRedButton.style.backgroundColor = "#ffffff";
    randomDroidButton.disabled = true;
    randomDroidButton.style.backgroundColor = "#ffffff";
    povDroidRedButton.disabled = true;
    povDroidRedButton.style.backgroundColor = "#ffffff";
  } else {
    // Menampilkan peta, droid merah, droid hijau, dan droid hijau terduplikasi
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
    addDroidRedButton.disabled = false;
    addDroidRedButton.style.backgroundColor = "#4caf50";
    randomDroidButton.disabled = false;
    randomDroidButton.style.backgroundColor = "#4caf50";
    povDroidRedButton.disabled = false;
    povDroidRedButton.style.backgroundColor = "#4caf50";
  }
}

function drawPovDroidGreen() {
  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      const x = col * tileSize;
      const y = row * tileSize;

      if (isInPovRange(col, row)) {
        ctx.fillStyle = "rgba(0, 128, 0, 0.3)"; // Warna gelap pudar untuk pandangan droid hijau
      } else {
        ctx.fillStyle = "darkgreen"; // Warna hijau gelap di luar pandangan droid hijau
      }
      addDroidRedButton.disabled = true;
      addDroidRedButton.style.backgroundColor = "#ffffff";

      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function isInPovRange(col, row) {
  const greenDroid = greenDroids[0]; // Ambil posisi droid hijau yang pertama (asumsi hanya ada satu droid hijau)

  const startCol = greenDroid.x - Math.floor(povDroidGreenSize / 2);
  const endCol = greenDroid.x + Math.floor(povDroidGreenSize / 2);
  const startRow = greenDroid.y - Math.floor(povDroidGreenSize / 2);
  const endRow = greenDroid.y + Math.floor(povDroidGreenSize / 2);

  return col >= startCol && col <= endCol && row >= startRow && row <= endRow;
}

const slider = document.getElementById("povRangeSlider");
let povDroidGreenSize = 3; // Ukuran awal pandangan Droid Hijau (3x3)

slider.addEventListener("input", function () {
  const value = parseInt(slider.value);

  if (!povDroidGreenEnabled) {
    // Menonaktifkan slider jika toggle povDroidGreenEnabled tidak diaktifkan
    slider.disabled = !povDroidGreenEnabled;

    // Jika toggle povDroidGreenEnabled belum diaktifkan, kembalikan nilai slider ke nilai sebelumnya
    slider.value = povDroidGreenSize - 1;
    return;
  }

  // Mengubah ukuran pandangan Droid Hijau sesuai dengan nilai slider
  povDroidGreenSize = Math.pow(2, value) + 1; // Menghitung ukuran berdasarkan eksponen 2 (misal: 2^value) dan ditambah 1

  if (povDroidGreenEnabled) {
    // Menampilkan peta, droid hijau, dan pandangan droid hijau
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
    drawPovDroidGreen();
  } else {
    // Menampilkan peta, droid merah, droid hijau, dan droid hijau terduplikasi
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus seluruh isi canvas

    drawMap();
    drawGrid();
    drawDroids();
  }
});

let redDroidPath = [];
let greenDroidPath = [];

function saveDroidPath() {
  redDroidPath.push({ x: redDroid.x, y: redDroid.y });
  greenDroidPath.push({ x: greenDroid.x, y: greenDroid.y });
}

let redDroidIndex = 0;

let redDroidTarget = greenDroid; // Mengatur target awal Droid Merah ke lokasi Droid Hijau
let redDroidTargetUpdated = false; // Menandakan apakah target Droid Merah telah diperbarui

function generateRedDroidPath() {
  redDroidPath = [];
  let currentPos = { ...redDroid };

  while (
    currentPos.x !== redDroidTarget.x ||
    currentPos.y !== redDroidTarget.y
  ) {
    redDroidPath.push({ ...currentPos });

    const possibleMoves = [];
    if (currentPos.x > 0 && map[currentPos.y][currentPos.x - 1] === 1) {
      possibleMoves.push({ x: currentPos.x - 1, y: currentPos.y }); // Gerakan ke kiri
    }
    if (
      currentPos.x < mapWidth - 1 &&
      map[currentPos.y][currentPos.x + 1] === 1
    ) {
      possibleMoves.push({ x: currentPos.x + 1, y: currentPos.y }); // Gerakan ke kanan
    }
    if (currentPos.y > 0 && map[currentPos.y - 1][currentPos.x] === 1) {
      possibleMoves.push({ x: currentPos.x, y: currentPos.y - 1 }); // Gerakan ke atas
    }
    if (
      currentPos.y < mapHeight - 1 &&
      map[currentPos.y + 1][currentPos.x] === 1
    ) {
      possibleMoves.push({ x: currentPos.x, y: currentPos.y + 1 }); // Gerakan ke bawah
    }

    if (possibleMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      currentPos = possibleMoves[randomIndex];
    } else {
      currentPos = { ...redDroid };
      redDroidPath = [];
      break; // Jalur buntu, hentikan pencarian
    }
  }

  redDroidPath.push({ ...redDroidTarget });
  redDroidTargetUpdated = false; // Mengatur status target diperbarui menjadi false
}

function moveRedDroid() {
  redDroids.forEach((droid) => {
    // Simpan jalur droid merah lainnya
    saveDroidPath();

    if (redDroidPath.length === 0) {
      generateRedDroidPath(); // Menghasilkan daftar posisi droid merah lainnya
    }

    const currentPosition = redDroidPath.shift(); // Mengambil posisi berikutnya dari daftar posisi
    droid.x = currentPosition.x;
    droid.y = currentPosition.y;
  });
  saveDroidPath();

  if (redDroidPath.length === 0 || redDroidTargetUpdated) {
    generateRedDroidPath();
  }

  const currentPosition = redDroidPath.shift();
  redDroid.x = currentPosition.x;
  redDroid.y = currentPosition.y;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawGrid();
  drawDroids();
  drawRedDroids();

  if (
    currentPosition.x === redDroid.target.x &&
    currentPosition.y === redDroid.target.y
  ) {
    clearInterval(intervalId);
    gameRunning = false;
    gameStarted = false;

    // Menampilkan notifikasi
    const notification = document.getElementById("notification");
    notification.innerText = "Droid Hijau berhasil ditangkap!";
  }
}

function moveGreenDroid() {
  saveDroidPath();

  const possibleMoves = [];

  if (greenDroid.x > 0 && map[greenDroid.y][greenDroid.x - 1] === 1) {
    if (
      !redDroidPath ||
      greenDroid.x - 1 !== redDroid.x ||
      greenDroid.y !== redDroid.y
    ) {
      possibleMoves.push({ x: greenDroid.x - 1, y: greenDroid.y }); // Gerakan ke kiri
    }
  }
  if (
    greenDroid.x < mapWidth - 1 &&
    map[greenDroid.y][greenDroid.x + 1] === 1
  ) {
    if (
      !redDroidPath ||
      greenDroid.x + 1 !== redDroid.x ||
      greenDroid.y !== redDroid.y
    ) {
      possibleMoves.push({ x: greenDroid.x + 1, y: greenDroid.y }); // Gerakan ke kanan
    }
  }
  if (greenDroid.y > 0 && map[greenDroid.y - 1][greenDroid.x] === 1) {
    if (
      !redDroidPath ||
      greenDroid.x !== redDroid.x ||
      greenDroid.y - 1 !== redDroid.y
    ) {
      possibleMoves.push({ x: greenDroid.x, y: greenDroid.y - 1 }); // Gerakan ke atas
    }
  }
  if (
    greenDroid.y < mapHeight - 1 &&
    map[greenDroid.y + 1][greenDroid.x] === 1
  ) {
    if (
      !redDroidPath ||
      greenDroid.x !== redDroid.x ||
      greenDroid.y + 1 !== redDroid.y
    ) {
      possibleMoves.push({ x: greenDroid.x, y: greenDroid.y + 1 }); // Gerakan ke bawah
    }
  }

  if (possibleMoves.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    greenDroid.x = possibleMoves[randomIndex].x;
    greenDroid.y = possibleMoves[randomIndex].y;
  }

  // Cek apakah Droid Merah dan Droid Hijau bertemu di jalur
  if (
    redDroidPath.some(
      (position) => position.x === greenDroid.x && position.y === greenDroid.y
    )
  ) {
    redDroidTarget = { x: greenDroid.x, y: greenDroid.y }; // Perbarui target Droid Merah
    redDroidTargetUpdated = true; // Mengatur status target diperbarui menjadi true
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawGrid();
  drawDroids();
  drawRedDroids();
  drawGreenDroid();
}

function handlePlayButtonClick() {
  if (!gameStarted) {
    gameStarted = true;
    gameRunning = true;
    paused = false;
    startGame();

    generateRedDroidPath(); // Menghasilkan daftar posisi droid merah
    intervalId = setInterval(moveRedDroid, 1000);
    intervalId = setInterval(moveGreenDroid, 1000);

    playButton.style.backgroundColor = "red";
    playButton.innerText = "Dimainkan";
    playButton.disabled = true;
  }
}

function startGame() {
  // Logika permainan dimulai
  generateMaze(Math.floor(mapWidth / 2), Math.floor(mapHeight / 2));
  createShortcut();
  drawMap();
  drawGrid();
  drawDroids();
}

// Memanggil fungsi startGame() jika permainan belum dimulai
if (!gameStarted) {
  startGame();
}
