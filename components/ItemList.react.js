/** @jsx React.DOM */

var React = require('react');
var Item = require('./Item.react');

var ItemList = React.createClass({
    render: function() {

        var itemNodes = this.props.data.map( function (item) {
            return (
                <Item id={item._id} slug={item.slug} />
            );
        });

        return (
            <ul className="commentList">
                {itemNodes}
            </ul>
        );
    }
});

module.exports = ItemList;