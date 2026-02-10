import type { EditorNode } from './types';

export type BlockType = 'text' | 'image';

export function createNode(type: BlockType): EditorNode {
    switch (type) {
        case 'text':
            return {
                id: crypto.randomUUID(),
                type: 'text',
                props: {
                    text: 'Text Baru',
                    tag: 'h1',
                },
                style: {
                    color: '#111827',
                    fontSize: 32,
                    textAlign: 'center',
                },
            };

        case 'image':
            return {
                id: crypto.randomUUID(),
                type: 'image',
                props: {
                    src: 'https://placehold.co/600x400',
                    alt: 'Image',
                    width: 400,
                    align: 'center',
                },
            };

        default:
            throw new Error('Unknown block type');
    }
}
