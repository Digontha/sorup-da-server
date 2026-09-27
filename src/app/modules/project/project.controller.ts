import catchAsync from '@/utils/catchAsync';
import { sendSuccessResponse } from '@/utils/response';
import { StatusCodes } from 'http-status-codes';
import { projectService } from './project.service';
import { PROJECT_MESSAGES } from './project.constant';
import { IListProjects } from './project.schema';

// GET /projects
const getAllProjectsHandler = catchAsync(async (req, res) => {
  const query = req.query as unknown as IListProjects;
  const { meta, projects } = await projectService.getAll(query);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: PROJECT_MESSAGES.SUCCESS,
    data: { meta, projects },
  });
});

// GET /projects/:id
const getSingleProjectHandler = catchAsync(async (req, res) => {
  const { project } = await projectService.getSingle(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: PROJECT_MESSAGES.SUCCESS,
    data: { project },
  });
});

// POST /projects
const createProjectHandler = catchAsync(async (req, res) => {
  const { project } = await projectService.createProject(req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: PROJECT_MESSAGES.CREATED,
    data: { project },
  });
});

// PUT /projects/:id
const updateProjectHandler = catchAsync(async (req, res) => {
  const { project } = await projectService.updateProject(req.params.id as string, req.body);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: PROJECT_MESSAGES.UPDATED,
    data: { project },
  });
});

// DELETE /projects/:id
const deleteProjectHandler = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.id as string);

  sendSuccessResponse(res, {
    statusCode: StatusCodes.OK,
    message: PROJECT_MESSAGES.DELETED,
    data: null,
  });
});

export const projectController = {
  getAllProjectsHandler,
  getSingleProjectHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
};
