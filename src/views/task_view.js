import Backbone from 'backbone';
import _ from 'underscore';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .button.delete': 'deleteTask',
    'click .button.toggle-complete': 'toggleComplete',
    'click .button.edit': 'editTask',
  },
  deleteTask: function(e) {
    this.model.destroy();
    this.remove();
  },
  toggleComplete: function(e) {
    this.model.set("is_complete", !this.model.get('is_complete'));
    this.$el.toggleClass('is-complete');
  },
  editTask: function(e) {
    this.trigger('editMe', this);
  }
});

export default TaskView;
