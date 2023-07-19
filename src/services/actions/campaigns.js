import {campaignsSlice} from '../reducers/campaigns'
import { getCampaigns } from '../../libs/api'


export const { update, add } = campaignsSlice.actions

export const updateAsync = () => {
    return async (dispatch) => {
        try {
            console.log('fetching campaigns...')
            const campaigns = await getCampaigns()
            console.log('resived campaigns.')
            console.log({campaigns})
            dispatch(update(campaigns))
        } catch (err) {
            console.log(err)
        }
    }
}