import { EntitySchema } from 'typeorm';

import User from '../../../models/user';

const UserEntity = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment'
    },
    displayName: {
      type: String,
      length: 50,
      nullable: false
    },
    email: {
      type: String,
      unique: true,
      nullable: false
    },
    image: {
      type: String,
      nullable: true
    },
    password: {
      type: String,
      select: false,
      nullable: false
    }
  }
});

export default UserEntity;
