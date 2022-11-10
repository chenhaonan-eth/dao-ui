// assets
import { IconHome } from '@tabler/icons';
// constant
const icons = { IconHome };

const sites = {
    id: 'sites',
    title: '',
    type: 'group',
    children: [
        {
            id: 'sites-group',
            title: 'Sites',
            type: 'item',
            url: '/sites',
            icon: icons.IconHome,
            breadcrumbs: true
        }
    ]
};
export default sites;
