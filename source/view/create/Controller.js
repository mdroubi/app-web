/* global $ */
var _ = require('underscore'),
  View = require('./View.js'),
  Model = require('./EventModel.js');

var Controller = module.exports = function ($modal, connection, focusedStream, target) {
  this.connection = connection;
  this.focusedStream = focusedStream;
  this.$modal = $modal;
  this.target = target;
  this.container = '.modal-content';
  this.view = null;
  this.newEvent = null;
};
_.extend(Controller.prototype, {
  show: function () {
    this.newEvent = new Model({event: this._defaultEvent()});
    this.$modal.modal({currentTarget: this.target});
    $(this.container).empty().hide();
    setTimeout(function () {
      $(this.container).fadeIn();
    }.bind(this), 500);
    $(this.container).append('<div class="modal-header">  ' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">' +
      '&times;</button> ' +
      '<h4 class="modal-title" id="myModalLabel">Add Event</h4>' +
      '<div class="modal-close"></div> ' +
      '</div>' +
      '<div id="modal-content"></div>');
    this.view = new View({model: this.newEvent});
    this.view.connection = this.connection;
    this.view.focusedStream = this.focusedStream;
    this.view.render();
    this.view.on('close', this.close.bind(this));

  },
  close: function () {
    if (this.view) {
      this.view.close();
      this.view = null;
    }
    this.newEvent = null;
    $(this.container).empty();
    $('#pryv-modal').hide().removeClass('in').attr('aria-hidden', 'true');
    $('.modal-backdrop').remove();
  },
  _defaultEvent: function () {
    var result = {};
    result.time = new Date().getTime() / 1000;
    result.tags = [];
    result.content = null;
    result.desctiption = '';
    return result;
  }
});