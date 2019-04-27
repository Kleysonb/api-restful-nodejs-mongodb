import { ModelRouter } from '../common/model-router';
import { Review } from './reviews.model';
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';

class ReviewsRouter extends ModelRouter<Review> {

    constructor() {
        super(Review);
    }
    
    // findById = (req, resp, next) => {
    //     this.model.findById(req.params.id)
    //         .populate('user', 'name')
    //         .populate('restaurant', 'name')
    //         .then(this.render(resp, next))
    //         .catch(next)
    // }

    applyRoutes(application: restify.Server) {
        // CRUD Review
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}

export const reviewsRouter = new ReviewsRouter();