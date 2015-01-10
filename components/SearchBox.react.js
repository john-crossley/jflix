/** @jsx React.DOM */

var React = require('react');
var SearchForm = require('./SearchForm.react');
var ItemList = require('./ItemList.react');

var SearchBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleSearchSubmit: function(search) {
        $.ajax({
            url: '/search/' + search.term,
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/search/' + search.term, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="searchBox">
                <h1>Search Component</h1>
                <SearchForm onSearchSubmit={this.handleSearchSubmit} />
                <ItemList data={this.state.data} />
            </div>
        );
    }
});

module.exports = SearchBox;