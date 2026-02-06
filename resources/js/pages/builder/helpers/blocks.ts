import type { EditorNode } from './types';

export type BlockType = 'text';

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
        default:
            throw new Error('Unknown block type');
    }
}
