import ContactChannelController from './ContactChannelController'
import DashboardController from './DashboardController'
import FaqController from './FaqController'
import PhotographySessionController from './PhotographySessionController'
import PostController from './PostController'
import ProjectController from './ProjectController'
import ServiceController from './ServiceController'
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