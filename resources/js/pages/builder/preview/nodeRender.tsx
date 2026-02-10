import type { EditorNode } from '../helpers/types';

type Props = {
    node: EditorNode;
};

export default function NodeRenderer({ node }: Props) {
    const style = node.style ?? {};

    if (node.type === 'text') {
        const Tag = node.props.tag;
        return (
            <Tag
                style={{
                    color: style.color,
                    fontSize: style.fontSize,
                    textAlign: style.textAlign,
                }}
            >
                {node.props.text}
            </Tag>
        );
    }

    if (node.type === 'image') {
        const align =
            node.props.align === 'center'
                ? 'mx-auto'
                : node.props.align === 'right'
                  ? 'ml-auto'
                  : '';

        return (
            <img
                src={node.props.src}
                alt={node.props.alt ?? ''}
                style={{ width: node.props.width }}
                className={align}
            />
        );
    }

    return null;
}
