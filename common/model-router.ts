import { Router } from './router'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors';

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
    constructor(protected model: mongoose.Model<D>){
        super();
    }

    protected prepareOne(query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D>{
        return query.populate('user', 'name').populate('restaurant', 'name');
    }

    validateId = (req, resp, next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found'))
        }else{
            next()
        }
    }

    findAll = (req, resp, next) => 
        this.model.find().then(this.renderAll(resp, next)).catch(next)

    findById = (req, resp, next) => {
        this.prepareOne(this.model.findById(req.params.id)).then(this.render(resp, next)).catch(next);
    }

    save = (req, resp, next) => {
            console.log("Save: POST")
            let document = new this.model(req.body);
            document.save().then(this.render(resp, next)).catch(next);
    }

    replace = (req, resp, next) => {
        const options = { runValidators: true, overwrite: true }; // Atualização Total
        this.model.update({ _id: req.params.id }, req.body, options)
            .exec().then(result => { // executa uma query de consulta
                if (result.n) { // Se a consulta foi bem sucedida
                    return this.model.findById(req.params.id).then(this.render(resp, next)).catch(next) // retorna o usuário atualizado
                } else {
                    throw new NotFoundError('Documento não encontrado')
                }
            });
    }

    update = (req, resp, next) => {
        const options = { runValidators: true, new: true };
        this.model.findByIdAndUpdate(req.params.id, req.body, options).then(this.render(resp, next)).catch(next);
    }

    delete = (req, resp, next) => {
        this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
            if (cmdResult.result.n) {
                resp.send(204);
            } else {
                throw new NotFoundError('Documento não encontrado')
            }
            return next();
        }).catch(next);
    }
}