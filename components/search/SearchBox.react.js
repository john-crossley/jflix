/** @jsx React.DOM */

var React = require('react');
var SearchForm = require('./SearchForm.react');
var ItemList = require('../item/ItemList.react');

var SearchBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleSearchSubmit: function(search) {
        var request = new XMLHttpRequest(),
            $this = this;
        request.open('GET', '/search/' + search.term, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                $this.setState({data: JSON.parse(request.responseText)});
            } else {
                console.log("Something went wrong");
            }
        };

        request.send();
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
