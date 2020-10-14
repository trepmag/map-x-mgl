import {el} from '@fxi/el';
import {path, vtStyleBuilder} from './mx_helpers.js';

(function() {
  'use strict';

  JSONEditor.defaults.resolvers.unshift(function(schema) {
    if (schema.type === 'array' && schema.format === 'tableSourceAutoStyle') {
      return 'tableSourceAutoStyle';
    }
  });

  JSONEditor.defaults.editors.tableSourceAutoStyle = JSONEditor.defaults.editors.table.extend(
    {
      addControls: function() {
        var self = this;
        self.addControlsBase =
          JSONEditor.defaults.editors.table.prototype.addControls;
        self.addControlsBase();

        /**
         * Add Auto style
         */

        const elAuto = el(
          'button',
          {
            class: 'btn btn-default',
            type: 'button',
            title: 'Auto style'
          },
          [
            el('i', {
              class: ['glyphicon', 'glyphicon-cog']
            }),
            el('span', 'Auto style')
          ]
        );

        elAuto.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          autoStyle(e);
        });

        this.auto_style_button = elAuto;

        self.controls.appendChild(this.auto_style_button);

        function autoStyle() {
          const editor = self;
          const schema = editor.getItemSchema();
          const idView = path(schema, 'options.idView');
          const lang = mx.settings.language;
          vtStyleBuilder({
            idView: idView,
            onDone: (data, mergeLabelByRow) => {
              const editor = self;
              const origRules = editor.getValue();
              const modeNumeric = data.type === 'continuous';
              const rules = data.table.map((r, i) => {
                let newRule = {
                  value: modeNumeric ? r.from : r.value,
                  color: r.color
                };

                /**
                 * Preserve label by merge
                 */
                if (mergeLabelByRow === true) {
                  const ruleToMerge = origRules[i];
                  if (ruleToMerge) {
                    /**
                     * Copy previous settings
                     */
                    newRule = Object.assign({}, ruleToMerge, newRule);
                  }
                } else {
                  /**
                   * Create label (other parameters will be defaults)
                   */
                  if (modeNumeric) {
                    newRule[`label_${lang}`] = `${r.from} - ${r.to}`;
                  } else {
                    newRule[`label_${lang}`] = `${r.value}`;
                  }
                }

                return newRule;
              });

              editor.setValue(rules);

              editor.onChange(true);
            }
          });
        }
      }
    }
  );
})();
