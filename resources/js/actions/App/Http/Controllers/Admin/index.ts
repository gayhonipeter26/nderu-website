import DashboardController from './DashboardController'
import ServiceController from './ServiceController'
import ProjectController from './ProjectController'
import PostController from './PostController'
import PhotographySessionController from './PhotographySessionController'
import FaqController from './FaqController'
import ContactChannelController from './ContactChannelController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ServiceController: Object.assign(ServiceController, ServiceController),
ProjectController: Object.assign(ProjectController, ProjectController),
PostController: Object.assign(PostController, PostController),
PhotographySessionController: Object.assign(PhotographySessionController, PhotographySessionController),
FaqController: Object.assign(FaqController, FaqController),
ContactChannelController: Object.assign(ContactChannelController, ContactChannelController),
}

export default Admin