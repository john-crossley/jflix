/** @jsx React.DOM */

var React = require('react');

var Video = React.createClass({

    getInitialState: function() {
        return {
            videoUrl: this.props.url
        };
    },

    getDefaultProps: function() {
        return {
            width: '100%',
            height: '100%'
        };
    },

    render: function() {
        return (
            <video width={this.props.width} height={this.props.height} controls>
                <source src={'/stream/' + this.state.videoUrl} type='video/mp4' />
            </video>
        )
    }
});

module.exports = Video;
