import {donationsSlice} from '../reducers/donations'
import { donations as donationsAPI } from '../../libs/api'


export const { update, remove, validate } = donationsSlice.actions

function sortCampaigns(campaigns, sortBy, order) {
    const result = []

    // chose the metod to sort
    if (sortBy == 'date') {
        
    }
    // sort the array
    // invert or revert according to order

    // return

    return result
}

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

export const removeAsync = ({id, token}) => async (dispatch) =>  {
    console.log('removing id: ', id)
    try {
        const donationsRemoved = await donationsAPI.remove(id, token)
        console.log(donationsRemoved)
        dispatch(remove(id))
    } catch(err) {
        console.log(err)
    }
}

export const validateAsync = ({id, token}) => async (dispatch) => {
    try {
        const donationsValidated = await donationsAPI.validate(id, token)
        console.log({donationsValidated})
        dispatch(validate(id))
    } catch(err){
        console.log(err)
    }
}