import { useAddReactionMutation } from "../pstages/pstagesSlice"

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionPatButtons = ({ patient }) => {
    const [addReaction] = useAddReactionMutation()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => {
                    const newValue = patient.reactions[name] + 1;
                    addReaction({ patientId: patient.id, reactions: { ...patient.reactions, [name]: newValue } })
                }}
            >
                {emoji} {patient.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}
export default ReactionPatButtons