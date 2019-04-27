import * as mongoose from 'mongoose'

// SubItem de Restaurante

export interface MenuItem extends mongoose.Document{
    name: string,
    price: number
}

const menuSchema = new mongoose.Schema ({
    name: { 
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }
})

// ------------------------------------------------------------------------- //

export interface Restaurant extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
})

export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema);