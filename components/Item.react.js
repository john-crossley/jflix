/** @jsx React.DOM */

var React = require('react');

var Item = React.createClass({
    render: function () {
        return (
            <li className="commentListItem">
                <a href={"/play/" + this.props.id}>{this.props.slug}</a>
            </li>
        );
    }
});

module.exports = Item;