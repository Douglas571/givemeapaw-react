import {donationsSlice} from '../reducers/donations'
import { donations as donationsAPI } from '../../libs/api'


export const { update, remove } = donationsSlice.actions



export const updateAsync = () => {
    console.log('executing updateAsync')
    return async (dispatch) => {
        try {
            console.log('fetching donations...')
            const donations = await donationsAPI.get()
            console.log('resived donations.')
            console.log({donations})
            dispatch(update(donations))
        } catch (err) {
            console.log(err)
        }
    }
}

export const removeAsync = (id) => async (dispatch) =>  {
    try {
        const donationsRemoved = await donationsAPI.remove(id)
        console.log(donationRemoved)
        dispatch(remove(id))
    } catch(err) {
        console.log(error)
    }
}