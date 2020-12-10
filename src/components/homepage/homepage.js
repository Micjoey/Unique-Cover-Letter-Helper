
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'


/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => {
    const history = useHistory()
    return(
        <Container text>
            <Header
                as='h1'
                content='Unique Cover Letter Generator'
                inverted
                style={{
                    fontSize: mobile ? '2em' : '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: mobile ? '1.5em' : '3em',
                }}
            />
            <Header
                as='h2'
                content='Want to save time while applying to jobs?'
                inverted
                style={{
                    fontSize: mobile ? '1.5em' : '1.7em',
                    fontWeight: 'normal',
                    marginTop: mobile ? '0.5em' : '1.5em',
                }}
            />
            <Button primary size='huge' onClick={() => history.push('/all-jobs/')}>
                Get Started
                <Icon name='right arrow' />
            </Button>
        </Container>
    )
}


HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Container>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Container>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Container as={Sidebar.Pushable} at='mobile'>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                    >
                        <Menu.Item as='a' active>
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>Work</Menu.Item>
                        <Menu.Item as='a'>Company</Menu.Item>
                        <Menu.Item as='a'>Careers</Menu.Item>
                        <Menu.Item as='a'>Log in</Menu.Item>
                        <Menu.Item as='a'>Sign Up</Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={sidebarOpened}>
                        <Segment
                            inverted
                            textAlign='center'
                            style={{ minHeight: 350, padding: '1em 0em' }}
                            vertical
                        >
                            <Container>
                                <Menu inverted pointing secondary size='large'>
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name='sidebar' />
                                    </Menu.Item>
                                    <Menu.Item position='right'>
                                        <Button as='a' inverted>
                                            Log in
                                        </Button>
                                        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                            Sign Up
                                        </Button>
                                    </Menu.Item>
                                </Menu>
                            </Container>
                            <HomepageHeading mobile />
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
        <DesktopContainer>{children}</DesktopContainer>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const Homepage = () => (
    <ResponsiveContainer>
        {/* <Segment style={{ padding: '8em 0em' }} vertical inverted>
            <Grid container stackable="true" verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }} inverted>
                            We Help Job Seekers Create Unique Cover Letters
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            People spend enourmous amount of time trying to create unique cover letters.
                        </p>
                        <Header as='h3' style={{ fontSize: '2em' }} inverted>
                            We Make Bananas That Can Dance
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                            bioengineered.
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Button size='huge'>Check Them Out</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '0em' }} vertical inverted>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }} inverted>
                            "What a Company"
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }} inverted>
                            "I shouldn't have gone with their competitor."
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            <b>Nan</b> Chief Fun Officer Acme Toys
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical inverted>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }} inverted>
                    Breaking The Grid, Grabs Your Attention
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    Instead of focusing on content creation and hard work, we have learned how to master the
                    art of doing nothing by providing massive amounts of whitespace and generic content that
                    can seem massive, monolithic and worth your attention.
                </p>
                <Button as='a' size='large'>
                    Read More
                </Button>

                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                    <a href='#'>Case Studies</a>
                </Divider>

                <Header as='h3' style={{ fontSize: '2em' }} inverted>
                    Did We Tell You About Our Bananas?
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                    it's really true. It took years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                </p>
                <Button as='a' size='large'>
                    I'm Still Quite Interested
                </Button>
            </Container>
        </Segment> */}

    </ResponsiveContainer>
)

export default Homepage