/** @jsx React.DOM */

var React = require('react');

var SearchForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var searchTerm = this.refs.searchTerm.getDOMNode().value.trim();
        if (! searchTerm) {
            return;
        }

        this.props.onSearchSubmit({term: searchTerm});
        this.refs.searchTerm.getDOMNode().value = '';
    },
    render: function() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search for media..." ref="searchTerm" />
                <input type="submit" value="Search!" />
            </form>
        );
    }
});

module.exports = SearchForm;