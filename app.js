/** @jsx React.DOM */

var React = require('react');
var SearchBox = require('./components/search/SearchBox.react');

// Render the components, picking up where react left off on the server
React.renderComponent(
  <SearchBox />,
  document.getElementById('react-app')
);
