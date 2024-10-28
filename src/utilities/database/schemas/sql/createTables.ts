
// type ErrorType = (NodeJS.ErrnoException | null);
// // Seed database
// (async () => {
// 	fs.readdir(
// 		path.join(__dirname, "./sql"), 
// 		(error: ErrorType, files: string[]) => {
// 			console.error("ReadDir Error: ", error, "Files: ", files);
// 			files.forEach((file) => {
// 				fs.readFile("./sql/" + file, (error: ErrorType, data: Buffer) => {
// 					console.error("ReadFile Error: ", error,"Data:", data);
// 					// @ts-ignore
// 					// database.execute(sql`${data}`);
// 				})
// 			})
// 		});
// })()

export const createTables = async (sql: any) => await Promise.all([
    sql`
    CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        age INTEGER DEFAULT 21,
        height INTEGER DEFAULT 70,
        weight INTEGER DEFAULT 150,
        goal INTEGER DEFAULT 0,
        exercise REAL DEFAULT 1.55,
        user_id TEXT,
        tdee INTEGER DEFAULT 2000,
        bmr INTEGER DEFAULT 2000
    )
    `,
    sql`
    CREATE TABLE exercise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        reps INTEGER NOT NULL DEFAULT 0,
        sets INTEGER NOT NULL DEFAULT 0,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        time TIME NOT NULL DEFAULT CURRENT_TIME,
        muscle TEXT,
        difficulty TEXT,
        equipment TEXT,
        instructions TEXT,
        type TEXT,
        user_id TEXT,
        weight INTEGER NOT NULL DEFAULT 0,
        calories_burned INTEGER DEFAULT 0
    )
    `,
    sql`
    CREATE TABLE food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        name TEXT DEFAULT '',
        calories INTEGER DEFAULT 0,
        date DATE DEFAULT '2024-01-20',
        time TIME DEFAULT CURRENT_TIME,
        nutrients TEXT,
        user_id TEXT,  
        meal TEXT DEFAULT 'snack',
        num_servings INTEGER DEFAULT 1,
        serving_size INTEGER DEFAULT 1
    )
    `,
    sql`
    CREATE TABLE sleep (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        startDate TEXT,
        endDate TEXT,
        value TEXT,
        duration TEXT
    )
    `,
    sql`
    CREATE TABLE steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        value INTEGER,
        startDate DATE,
        endDate DATE,
        duration TIME,
        type TEXT
    )
    `,
    sql`
    CREATE TABLE weight (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        weight TEXT DEFAULT 'null',
        date DATE DEFAULT CURRENT_DATE,
        user_id TEXT,
        time TIME DEFAULT CURRENT_TIME
    )
    `
]);