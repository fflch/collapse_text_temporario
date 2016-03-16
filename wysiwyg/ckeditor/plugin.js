/**
 * @file
 * CKEditor native plugin to provide integration with Collapse Text.
 */

CKEDITOR.plugins.add('collapse_text',
{
  init: function(editor)
  {
    /* COMMAND */
    editor.addCommand('cmdCollapseTextDialog', new CKEDITOR.dialogCommand('collapseTextDialog'));

    // Use the strings provided by Drupal.settings for translation support.
    pluginStrings = Drupal.settings.collapse_text.pluginStrings;

    /* BUTTON */
    editor.ui.addButton('collapse_text',
    {
      label: pluginStrings.buttonLabel,
      command: 'cmdCollapseTextDialog',
      icon: this.path + 'button.png'
    });

    /* DIALOG */
    CKEDITOR.dialog.add('collapseTextDialog', function (editor)
    {
      return {
        title : pluginStrings.windowLabel,
        minWidth : 300,
        minHeight : 200,
        contents :
        [{
          id : 'tab1',
          elements :
          [{
            type : 'text',
            id : 'title',
            label : pluginStrings.titleLabel,
            validate : CKEDITOR.dialog.validate.notEmpty(pluginStrings.titleValidateError)
          }, {
            type : 'textarea',
            id : 'content',
            label : pluginStrings.contentLabel,
            validate : CKEDITOR.dialog.validate.notEmpty(pluginStrings.contentValidateError)
          }, {
            type : 'checkbox',
            id : 'state',
            label : pluginStrings.stateLabel,
          },{
            type : 'text',
            id : 'classes',
            label : pluginStrings.classesLabel,
          }]
        }],
        onOk : function()
        {
          var dialog = this;
          var title = dialog.getValueOf('tab1', 'title');
          var content = dialog.getValueOf('tab1', 'content');
          var classes = dialog.getValueOf('tab1', 'classes');
          var state = !dialog.getValueOf('tab1', 'state') ? 'collapsed' : 'collapse';

          var openTag = '[' + state + ' title="' + title + '"' + ((classes != "") ? ' class="' + classes + '"' : "") + ']';
          var closeTag = '[/' + state + ']';
          var inplaceTag = openTag + content + closeTag;

          var S = editor.getSelection();

          if(S == null)
          {
            editor.insertHtml(inplaceTag);
            return;
          }

          var R = S.getRanges();
          R = R[0];

          if(R == null)
          {
            editor.insertHtml(inplaceTag);
            return;
          }

          var startPos = Math.min(R.startOffset, R.endOffset);
          var endPos = Math.max(R.startOffset, R.endOffset);

          if(startPos == endPos)
          {
            editor.insertHtml(inplaceTag);
            return;
          }

          var container = new CKEDITOR.dom.element('p');
          var fragment = R.extractContents();

          container.appendText(openTag);
          fragment.appendTo(container);
          container.appendText(closeTag);

          editor.insertElement(container);
        }
      };
      // End CKEDITOR.dialog.add.
    });
  }// End init.
  // End CKEDITOR.plugins.add.
});
