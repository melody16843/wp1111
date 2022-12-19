import {gql} from '@apollo/client'

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message($name: String!, $to: String!) {
        message(name: $name, to: $to){
            sender
            body
        }
    }
`