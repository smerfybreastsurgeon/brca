import { useAddNeoadjuvantReactionMutation } from './neoadjuvantSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionNeoadjuvantButtons = ({ neoadjuvant }) => {
    const [addNeoadjuvantReaction] = useAddNeoadjuvantReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = neoadjuvant.reactions[name] + 1;
                    addNeoadjuvantReaction({ neoadjuvantId: neoadjuvant.id, reactions: { ...neoadjuvant.reactions, [name]: newValue } })
                }}
            >
                {emoji} {neoadjuvant.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionNeoadjuvantButtons