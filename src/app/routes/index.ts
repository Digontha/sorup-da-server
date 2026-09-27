import { Router } from 'express';
import homeRouter from '../modules/home/home.route';
import aboutRouter from '../modules/about/about.route';
import workExperienceRouter from '../modules/workExperience/workExperience.route';
import projectRouter from '../modules/project/project.route';
import researchRouter from '../modules/research/research.route';
import blogRouter from '../modules/blog/blog.route';
import contactRouter from '../modules/contact/contact.route';
import categoryRouter from '../modules/category/category.route';

const router = Router();

// All paths are static prefixes; module-internal ordering handles /:id routes
const routes = [
  { path: '/home', router: homeRouter },
  { path: '/about', router: aboutRouter },
  { path: '/work-experiences', router: workExperienceRouter },
  { path: '/projects', router: projectRouter },
  { path: '/research', router: researchRouter },
  { path: '/blogs', router: blogRouter },
  { path: '/contacts', router: contactRouter },
  { path: '/categories', router: categoryRouter },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
