import { createConnection, EntityTarget, getConnection } from 'typeorm';

const connection = {
  async create (): Promise<void> {
    await createConnection({
      type: 'postgres',
      synchronize: true,
      logging: false,
      entities: ['src/modules/**/entities/*.ts'],
      migrations: ['src/modules/**/migrations/*.ts'],
      url: process.env.DATABASE_URL
    });
  },

  async close (): Promise<void> {
    await getConnection().close();
  },

  async synchronize (): Promise<void> {
    await getConnection().dropDatabase();
    await getConnection().synchronize(true);
  },

  async loadSeeds (entity: EntityTarget<unknown>, data: any): Promise<void> {
    await getConnection().createQueryBuilder().insert().into(entity).values(data).execute();
  },

  async clear (entity: EntityTarget<unknown>): Promise<void> {
    await getConnection().createQueryBuilder().delete().from(entity).execute();
  }
};

export default connection;
