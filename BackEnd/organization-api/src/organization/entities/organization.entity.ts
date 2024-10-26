
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
    _id?: mongoose.Types.ObjectId;

    @Prop({ required: true })
    name: string;
  
    @Prop()
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
