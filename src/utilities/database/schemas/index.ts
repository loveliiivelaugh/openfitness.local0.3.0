import { 
  integer, 
  real, 
  int,
  text, 
  sqliteTable
} from 'drizzle-orm/sqlite-core';


const exercise = sqliteTable('exercise', {
  id: int('id').primaryKey(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  name: text('name').notNull(),
  reps: integer('reps').notNull(),
  sets: integer('sets').notNull(),
  // date: date('date').notNull(),
  // time: time('time').notNull(),
  muscle: text('muscle'),
  difficulty: text('difficulty'),
  equipment: text('equipment'),
  instructions: text('instructions'),
  type: text('type'),
  user_id: int('user_id'),
  weight: integer('weight'),
  calories_burned: integer('calories_burned'),
});

const food = sqliteTable('food', {
  id: int('id').primaryKey(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  name: text('name').notNull(),
  calories: integer('calories').notNull(),
  // // // date: date('date').notNull(),
  // time: time('time').notNull(),
  // nutrients: json('nutrients'),
  user_id: int('user_id'),
  meal: text('meal').notNull(),
  num_servings: integer('num_servings').notNull(),
  serving_size: integer('serving_size').notNull()
});

const sleep = sqliteTable('sleep', {
  id: int('id').primaryKey(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  // // "startDate": text('startDate').notNull(),
  // // "endDate": text('endDate').notNull(),
  value: text('value').notNull(),
  duration: text('duration').notNull(),
});

const steps = sqliteTable('steps', {
  id: int('id').primaryKey().notNull(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  value: integer('value'),
  // // "startDate": text('startDate'),
  // // "endDate": text('endDate'),
  duration: text('duration'),
  type: text('type'),
});

const weight = sqliteTable('weight', {
  id: int('id').primaryKey(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  weight: text('weight').notNull(),
  // // // date: date('date').notNull(),
  user_id: int('user_id'),
  // time: time('time').notNull(),
});

const profile = sqliteTable('profile', {
  id: int('id').primaryKey(),
  // created_at: timestamp('created_at').notNull().defaultNow(),
  age: integer('age').notNull(),
  height: integer('height').notNull(),
  weight: integer('weight').notNull(),
  goal: integer('goal').notNull(),
  exercise: real('exercise').notNull(),
  user_id: int('user_id'),
  tdee: integer('tdee').notNull(),
  bmr: integer('bmr').notNull(),
});

export {
  profile,
  exercise,
  food,
  sleep,
  steps,
  weight
};