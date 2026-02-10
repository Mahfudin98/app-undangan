import type { SectionNode } from '../helpers/types';
import NodeRenderer from './nodeRender';

type Props = {
    section: SectionNode;
};

export default function SectionRenderer({ section }: Props) {
    return (
        <section
            style={{
                backgroundColor: section.style?.backgroundColor,
                padding: section.style?.padding ?? 24,
            }}
            className={
                section.style?.fullWidth ? 'w-full' : 'mx-auto max-w-4xl'
            }
        >
            {section.children.map((node) => (
                <NodeRenderer key={node.id} node={node} />
            ))}
        </section>
    );
}
