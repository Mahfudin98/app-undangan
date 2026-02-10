import type { EditorSchema } from '../helpers/types';
import SectionRenderer from './sectionRender';

type Props = {
    schema: EditorSchema;
};

export default function PreviewRenderer({ schema }: Props) {
    return (
        <div className="min-h-screen bg-white">
            {schema.sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}
        </div>
    );
}
