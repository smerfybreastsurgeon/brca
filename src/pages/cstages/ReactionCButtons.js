import { useAddCReactionMutation } from './cstagesSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionCButtons = ({ cstage }) => {
    const [addCReaction] = useAddCReactionMutation()
    

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = cstage.reactions[name] + 1;
                    addCReaction({ cstageId: cstage.id, reactions: { ...cstage.reactions, [name]: newValue } })
                }}
            >
                {emoji} {cstage.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionCButtons