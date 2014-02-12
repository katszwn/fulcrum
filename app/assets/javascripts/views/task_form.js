if (typeof Fulcrum == 'undefined') {
  Fulcrum = {};
}

Fulcrum.TaskForm = Fulcrum.FormView.extend({

  tagName: 'div',

  className: 'task_form',

  events: {
    "click input[type=button]": "saveTask"
  },

  render: function() {
    var view = this;

    div = this.make('div');
    $(div).append(this.textField("task"));
    
    var submit = this.make('input', {id: 'task_submit', type: 'button', value: 'Add Task'});
    $(div).append(submit);
    
    this.$el.html(div);
    
    return this;
  },

  saveTask: function() {
    this.disableForm();

    var view = this;

    this.model.save(null, {
      success: function(model, response) {
      },

      error: function(model, response) {
        var json = $.parseJSON(response.responseText);
        view.enableForm();
        model.set({errors: json.task.errors});
        window.projectView.notice({
          title: I18n.t("save error", {defaultValue: "Save error"}),
          text: model.errorMessages()
        });
      }
    });
  },

  // Makes the note for uneditable during save
  disableForm: function() {
    this.$('input,text').attr('disabled', 'disabled');
    this.$('input[type="button"]').addClass('saving');
  },

  // Re-enables the note form once save is complete
  enableForm: function() {
    this.$('input,text').removeAttr('disabled');
    this.$('input[type="button"]').removeClass('saving');
  }

});


