import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '12345', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Table created successfully');

//     await testConnection();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

testConnection();


export { sequelize };
