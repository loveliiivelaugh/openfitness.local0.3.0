import { ReactNode, createContext, useEffect, useState } from 'react';
import { SQLocalDrizzle } from 'sqlocal/drizzle';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schemas';
import { useFitnessStore } from '@store';
// import { createTables } from './schemas/sql/createTables';


// Initialize SQLocalDrizzle and pass the driver to Drizzle
const { driver, sql } = new SQLocalDrizzle({
	databasePath: 'database.sqlite3',
	verbose: true,
	onConnect: async () => {
		// Seed Database
		// const data = await createTables(sql);
		// const result = await seedTables()
		const data = await Promise.all([
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
			`,
		]);

		console.log("Sqlocal Connected! ", data)
	}
});

const database = drizzle(driver, { schema });

const LocalDatabaseContext = createContext<SQLocalDrizzle | null>(null);

const useDatabase = () => {
	const fitnessStore = useFitnessStore();
	const [db, setDb] = useState<SQLocalDrizzle>(null);

	const readTable = async (table: string) => await database
		.select()
		.from(schema[table as keyof typeof schema])
		.all();

	const writeTable = async (table: string, payload: any) => await database
		.insert(schema[table as keyof typeof schema])
		.values(payload)
		.returning();

	useEffect(() => {
		if (database) {
			setDb(database);

			const schemas = Object.keys(schema);
			
			(async () => {
				const initialData = await Promise.all(
					schemas.map((table: string) => new Promise(
						async (resolve) => {
							const rows = await readTable(table);
							const fields = schema[table as keyof typeof schema];
							const columns = Object
								.keys(fields)
								.filter(key => !key.startsWith("Symbol"))
								.map(key => fields[key as keyof typeof fields])

							resolve({ table, columns, rows });
						})
					)
				);

				fitnessStore.setFitnessTables(initialData);
			})();
		};

	}, [database]);

	return db;
};

const LocalDatabaseProvider = ({ children }: { children: ReactNode }) => {
	const database = useDatabase();
	return (
		<LocalDatabaseContext.Provider value={database}>
			{children}
		</LocalDatabaseContext.Provider>
	)
};

export { database, useDatabase, LocalDatabaseProvider };
