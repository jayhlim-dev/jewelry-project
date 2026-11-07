export function whatsappDraftForTopic(topic) {
    if (!topic) {
        return 'Good day. I would like to enquire about your collection.';
    }
    if (topic.id === 'other') {
        return 'Good day. I would like to enquire about your collection.';
    }
    return `Good day. I would like to enquire regarding: ${topic.label}.`;
}
