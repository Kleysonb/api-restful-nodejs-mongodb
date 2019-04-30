import { ModelRouter } from '../common/model-router';
import { Review } from './reviews.model';
import * as restify from 'restify';

class ReviewsRouter extends ModelRouter<Review> {

    constructor() {
        super(Review);
    }

    envelope(document: any): any {
        let resource = super.envelope(document)
        
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `/restaurants/${restId}`

        const userId = document.user._id ? document.user._id : document.user
        resource._links.user = `/users/${userId}`

        return resource
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
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}

export const reviewsRouter = new ReviewsRouter();