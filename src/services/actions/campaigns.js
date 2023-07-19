import {campaignsSlice} from '../reducers/campaigns'

export const { update, add } = campaignsSlice.actions

export const updateAsync = () => {
    return async (dispatch) => {
        try {
            const campaigns = await getCampaigns()
            dispatch(update(campaigns))
        } catch (err) {
            console.log(err)
        }
    }
}
