import React from 'react';

// include our API helper
import APIFetch from '../../utilities/api';
import GeneralPost from '../generalPost';

import './styles.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        // define an initial state for our data we will fetch
        this.state = {
			listOfPosts: [],
			status : "loading"
		};
    }

    // this function will be automatically called when react creates this "Home" object in the browser
    componentDidMount() {
        let fetchPosts = APIFetch('/posts/listValidPosts', null, 'GET');

        fetchPosts.then(async (data) => {
            if (await data.ok) {
                let posts = await data.json();
                this.parseResponse(posts);
                console.log(posts);
            } else if (await data.status === 404){
                this.setState({status : "No posts found"});
            } else {
                this.setState({status : "Network Problem"});
            }
        });
    }

    parseResponse(data) {
        var postInfo
        var count = (JSON.parse(JSON.stringify(data)).length) - 1;
        var numPosts = 10;
        this.setState({ posts:[] });
        while(data[count] !== undefined && numPosts > 0){
            postInfo = {
                game: data[count].gameName,
                description: data[count].description,
                numPlayers: data[count].numPlayers,
                location: data[count].location,
                time: data[count].gameTimeUTC.substring(0,10),
                duration: data[count].duration,
                id: data[count]._id,
                userID: data[count].userID
            }
            this.setState({
                listOfPosts: this.state.listOfPosts.concat(postInfo)
            })
            count--;
            numPosts--;
        }
    }

    render() {
        return (
            <div>
                <p className = 'post-text'>Most recent posts!</p>
                <div className = 'all-posts'>
                    {this.state.listOfPosts.map(singlePost => (
                        <GeneralPost toggleChat = {this.props.toggleChat} post = {singlePost} />
                    ))}
                </div>
            </div>
        );
    }
}
