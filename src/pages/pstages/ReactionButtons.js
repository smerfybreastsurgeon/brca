import { useAddReactionMutation } from './pstagesSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ pstage }) => {
    const [addReaction] = useAddReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = pstage.reactions[name] + 1;
                    addReaction({ pstageId: pstage.id, reactions: { ...pstage.reactions, [name]: newValue } })
                }}
            >
                {emoji} {pstage.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionButtons