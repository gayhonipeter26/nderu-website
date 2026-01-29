import ProjectShowController from './ProjectShowController'
import PhotographyShowController from './PhotographyShowController'
import PostShowController from './PostShowController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    ProjectShowController: Object.assign(ProjectShowController, ProjectShowController),
PhotographyShowController: Object.assign(PhotographyShowController, PhotographyShowController),
PostShowController: Object.assign(PostShowController, PostShowController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers