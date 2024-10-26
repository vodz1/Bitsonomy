import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class BaseAbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findOneWhere(query: Partial<T>) {
    return this.model.findOne(query)
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  create(data: Partial<T>) {
    const newModel = new this.model(data);
    return newModel.save();
  }

  updateById(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id , data , { new: true });
  }


}
