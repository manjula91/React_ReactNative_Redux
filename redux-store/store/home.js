const home = (
	state = {
		busy: false,
		repoDetails: null,
		history: [],
	},
	action
) => {
	switch (action.type) {
		case "SET_BUSY":
			return Object.assign({}, state, {
				busy: action.data.busy,
			})

		case "RENDER_RESULT":
			return Object.assign({}, state, {
				repoDetails: action.data,
			})

		case "STORE_RESULT":
			return Object.assign({}, state, {
				repoDetails: action.data,
				history: [...state.history, action.data],
			})

		default:
			return state
	}
}

export default home
