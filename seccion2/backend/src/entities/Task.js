const { EntitySchema } = require('typeorm');

const Task = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    titulo: {
      type: 'varchar',
      length: 150,
      nullable: false,
    },
    descripcion: {
      type: 'text',
      nullable: true,
    },
    completado: {
      type: 'boolean',
      default: false,
    },
    archivoAdjunto: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    fechaCreacion: {
      type: 'timestamp',
      createDate: true,
    },
  },
});

module.exports = { Task };