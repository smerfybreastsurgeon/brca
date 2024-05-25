import { useAddSurgReactionMutation } from './surgerySlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionSurgeryButtons = ({ surgery }) => {
    const [addSurgReaction] = useAddSurgReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = surgery.reactions[name] + 1;
                    addSurgReaction({ surgeryId: surgery.id, reactions: { ...surgery.reactions, [name]: newValue } })
                }}
            >
                {emoji} {surgery.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionSurgeryButtons