// assets
import { IconOlympics } from '@tabler/icons';

// constant
const icons = {
    IconOlympics
};

// ==============================|| TOPICS MENU ITEMS ||============================== //

export const fcTopics = () => {
    const apiResponse = [
        {
            name: 'topics-enms',
            partitionIds: [0]
        },
        {
            name: 'topic-test',
            partitionIds: [4]
        }
    ];
    const topics = apiResponse.map((topic) => ({
        id: topic.name,
        title: topic.name,
        type: 'collapse',
        url: `/topics/${topic.name}`,
        target: true,
        children: topic.partitionIds.map((partitionId) => ({
            id: `partition-${partitionId}`,
            title: `partition-${partitionId}`,
            type: 'item',
            url: `/topics/${topic.name}/${partitionId}`,
            breadcrumbs: false
        }))
    }));
    return {
        id: 'topics',
        title: `Total ${apiResponse.length}`,
        caption: '',
        type: 'group',
        children: [
            {
                id: 'topics-group',
                title: 'Topics',
                type: 'collapse',
                icon: icons.IconOlympics,
                target: true,
                children: topics
            }
        ]
    };
};

const topics = {
    id: 'topics',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'topics-group',
            title: 'Topics',
            type: 'collapse',
            icon: icons.IconOlympics,
            target: true,
            children: []
        }
    ]
};

export default topics;
