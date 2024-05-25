import { useAddSubReactionMutation } from './subtypeSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionSubtypeButtons = ({ subtype }) => {
    const [addSubReaction] = useAddSubReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = subtype.reactions[name] + 1;
                    addSubReaction({ subtypeId: subtype.id, reactions: { ...subtype.reactions, [name]: newValue } })
                }}
            >
                {emoji} {subtype.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionSubtypeButtons