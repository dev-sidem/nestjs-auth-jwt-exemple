import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @CreateDateColumn({ name: 'created_date' })
  createdDate!: Date;

  @UpdateDateColumn({ name: 'updated_date', nullable: true })
  updatedDate!: Date;

  @Column({ name: 'deleted_date', nullable: true })
  deletedDate!: Date;

  @Column({ name: 'created_by', length: 100, nullable: true })
  createdBy: string = '';

  @Column({ name: 'updated_by', length: 100, nullable: true })
  updatedBy: string = '';

  @Column({ name: 'deleted_by', length: 100, nullable: true })
  deletedBy: string = '';

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
