import { ReactNode, createContext, useEffect, useState } from 'react';
import { SQLocalDrizzle } from 'sqlocal/drizzle';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schemas';
import { useFitnessStore } from '@store';
import { createTables } from './schemas/sql/createTables';


// Initialize SQLocalDrizzle and pass the driver to Drizzle
const { driver, sql } = new SQLocalDrizzle({
	databasePath: 'database.sqlite3',
	verbose: true,
	onConnect: async () => {
		// Seed Database
		const data = await createTables(sql);
		// const result = await seedTables()

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
