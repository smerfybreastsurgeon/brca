import { useAddRecReactionMutation } from './recurSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionRecurButtons = ({ recur }) => {
    const [addRecReaction] = useAddRecReactionMutation()

    const reactionRecurButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = recur.reactions[name] + 1;
                    addRecReaction({ recurId: recur.id, reactions: { ...recur.reactions, [name]: newValue } })
                }}
            >
                {emoji} {recur.reactions[name]}
            </button>
        )
    })

    return <div>{reactionRecurButtons}</div>
}
export default ReactionRecurButtons