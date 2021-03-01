import { EntitySchema } from 'typeorm';

import Post from '../../../models/post';

const PostEntity = new EntitySchema<Post>({
  name: 'post',
  tableName: 'posts',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment'
    },
    title: {
      type: String,
      length: 50,
      nullable: false
    },
    content: {
      type: String,
      nullable: false
    },
    userId: {
      type: 'int',
      select: false
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: true,
      onDelete: 'CASCADE'
    }
  }
});

export default PostEntity;
