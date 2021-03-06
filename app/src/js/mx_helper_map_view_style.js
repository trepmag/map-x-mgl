let vtStyle = null;

export async function vtStyleBuilder(opt) {
  const h = mx.helpers;
  let elDone;

  if (!!vtStyle) {
    return;
  }
  /**
   * Init
   */
  const summary = await h.getSourceVtSummary(opt);
  const aStat = summary.attribute_stat;

  opt = Object.assign(
    {},
    {
      idView: null,
      idSource: null,
      binsMethod: 'jenks',
      binsNumber: 5
    },
    opt
  );

  opt._palette = null;
  opt._type = aStat.type;
  opt._elsParts = [];
  opt._elsInputs = [];
  opt._out = [];
  opt._buttons = [];

  /**
   * Labels
   */
  let title = opt.idSource || opt.idView;
  if (h.isViewId(opt.idView)) {
    title = h.getViewTitle(opt.idView);
  }

  /**
   * input : number of bins and method of binning
   */
  if (opt._type === 'continuous') {
    let elValidNum;
    const elNbins = h.el(
      'div',
      {
        class: 'form-group'
      },
      [
        h.el('label', 'Number of bins'),
        h.el('input', {
          class: 'form-control',
          type: 'number',
          value: opt.binsNumber,
          min: 1,
          max: 100,
          on: {
            change: (e) => {
              const value = e.target.value;
              // see  api/utils/checkRouteParams_rules.js
              if (value < 1 || value > 100) {
                elValidNum.innerText = 'Value must be >= 1 and <= 100';
                elNbins.classList.add('has-error');
                return;
              } else {
                elValidNum.innertext = '';
                elNbins.classList.remove('has-error');
              }
              opt.binsNumber = e.target.value;
              update();
            }
          }
        }),
        (elValidNum = h.el('span', {class: ['help-block']}))
      ]
    );
    const elBinsOptions = [
      'jenks',
      'head_tails',
      'quantile',
      'equal_interval'
    ].map((m) => {
      const label = h.getDictItem(m);
      const elOpt = h.el('option', {value: m}, label);
      if (m === opt.binsMethod) {
        elOpt.setAttribute('selected', 'true');
      }
      return elOpt;
    });

    const elBinsMethod = h.el(
      'div',
      {
        class: 'form-group'
      },
      [
        h.el('label', 'Binning method'),
        h.el(
          'select',
          {
            class: 'form-control',
            on: {
              change: (e) => {
                opt.binsMethod = e.target.value;
                update();
              }
            }
          },
          elBinsOptions
        )
      ]
    );

    opt._elsInputs.push(...[elNbins, elBinsMethod]);
  }

  /**
   * inputs : colors
   */
  const chroma = await h.moduleLoad('chroma-js');
  const RadioGroup = await h.moduleLoad('radio-group');
  const palettes = Object.keys(chroma.brewer).map((k) => {
    return {
      value: k,
      content: chroma.brewer[k].map((c) =>
        h.el('span', {
          style: {height: '10px', width: '10px', backgroundColor: c}
        })
      )
    };
  });

  const rgPalette = new RadioGroup({
    items: palettes,
    onUpdate: (palette) => {
      opt._palette = palette;
      update();
    },
    builder: (item) => {
      return h.el(
        'div',
        {
          style: {
            display: 'flex',
            padding: '5px',
            alignItems: 'center'
          }
        },
        h.el(
          'span',
          {
            style: {
              marginRight: '5px'
            }
          },
          item.value
        ),
        item.content
      );
    },
    configForm: {
      style: {
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid var(--mx_ui_border)',
        padding: '10px',
        borderRadius: '5px'
      }
    }
  });

  opt._elsInputs.push(rgPalette.el);

  const elInputsContainer = h.elPanel({
    title: 'Settings',
    content: h.el('div', {style: {padding: '10px'}}, opt._elsInputs)
  });

  opt._elsParts.push(elInputsContainer);

  /**
   * Result table container
   */
  opt._elTableContainer = h.el('div');
  opt._elsParts.push(opt._elTableContainer);

  /**
   * Button on done
   */
  if (h.isFunction(opt.onDone)) {
    elDone = h.el(
      'button',
      {
        type: 'button',
        class: ['btn', 'btn-default'],
        on: [
          'click',
          () => {
            opt.onDone(opt._out);
          }
        ]
      },
      'Update rules'
    );
    opt._buttons.push(elDone);
  }

  /**
   * Modal
   */
  h.modal({
    title: title,
    content: h.el('div', opt._elsParts),
    noShinyBinding: true,
    addSelectize: false,
    onClose: clean,
    buttons: opt._buttons
  });

  update();

  /**
   * Clean
   */
  function clean() {
    vtStyle = null;
    rgPalette.destroy();
  }

  /**
   * Update
   */
  async function update() {
    let titleTable = 'Table';
    const summary = await h.getSourceVtSummary(opt);
    const aStat = summary.attribute_stat;
    const uniqueFrom = new Set(aStat.table.map((r)=>r.from || r.value));
    const hasDuplicate = uniqueFrom.size !== aStat.table.length ;
  
    const valid = !hasDuplicate;
    const count = aStat.table.reduce((c, r) => {
      return c + r.count;
    }, 0);

    /**
    * Change elDone button state
    */
    if(h.isElement(elDone) && !valid){
      elDone.setAttribute('disabled',true); 
    }else{
      elDone.removeAttribute('disabled'); 
    }

    /**
     * Scale palette and set colors
     */
    const colors = chroma
      .scale(chroma.brewer[opt._palette])
      .colors(aStat.table.length);
    aStat.table.forEach((r, i) => {
      r.color = colors[i];
    });

    /**
     * Clean values for display
     */
    aStat.table.forEach((r) => {
      Object.keys(r).forEach((k) => {
        if (h.isNumeric(r[k])) {
          r[k] = Math.round(r[k] * 1000) / 1000;
        }
        if (k === 'color') {
          r.preview = h.el('div', {
            style: {
              backgroundColor: r[k],
              width: '20px',
              height: '20px',
              border: '1px solid ccc',
              borderRadius: '5px'
            }
          });
        }
      });
    });

    if (aStat.type === 'continuous') {
      titleTable = `${titleTable} ( Method : ${
        aStat.binsMethod
      }, number of bins : ${aStat.binsNumber}, count total : ${count}, valid: ${valid} )`;
    }else{
      titleTable = `${titleTable} ( count total : ${count}, valid : ${valid} ) `;
    }

    /**
     * Build / Update table
     */
    const elTable = h.elAuto('array_table', aStat.table, {
      tableTitle: titleTable
    });
    opt._elTableContainer.innerHTML = '';
    opt._elTableContainer.appendChild(elTable);

    opt._out = aStat;
  }
}
