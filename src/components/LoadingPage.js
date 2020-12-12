
import React from 'react'
import { Segment, Dimmer, Image, Loader } from "semantic-ui-react"

export const loadingPage = () => {
    return (
        <Segment padded="very"> 
            <Dimmer active>
                <Loader content='Loading' />
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}
export const loadingPageInverted = () => {
    return (
        <Segment padded="very">
            <Dimmer active inverted>
                <Loader inverted size='massive' content='Loading' />
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}
