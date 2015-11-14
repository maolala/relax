import Utils from '../../../utils';
import {Types} from '../../../data-types';
import {getColorString} from '../../../helpers/colors';

export default {
  type: 'container',
  options: [
    {
      label: 'Background Color',
      type: 'Optional',
      id: 'useBackgroundColor',
      unlocks: [
        {
          label: 'Background color',
          type: Types.Color,
          id: 'backgroundColor'
        }
      ]
    },
    {
      label: 'Max Width',
      type: 'Optional',
      id: 'useMaxWidth',
      unlocks: [
        {
          label: 'Maximum Width',
          type: Types.Pixels,
          id: 'widthPx',
          props: {
            min: 0,
            max: false
          }
        },
        {
          label: 'Content horizontal alignment',
          type: Types.Select,
          id: 'contentHorizontal',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Padding',
      type: Types.Padding,
      id: 'padding'
    },
    {
      label: 'Rounded Corners',
      type: 'Optional',
      id: 'useCorners',
      unlocks: [
        {
          type: Types.Corners,
          id: 'corners'
        }
      ]
    },
    {
      label: 'Border',
      type: 'Optional',
      id: 'useBorder',
      unlocks: [
        {
          type: Types.Border,
          id: 'border'
        }
      ]
    }
  ],
  defaults: {
    useBackgroundColor: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    useMaxWidth: true,
    widthPx: 1000,
    contentHorizontal: 'center',
    padding: '20px',
    useCorners: false,
    corners: '0px',
    useBorder: false
  },
  rules: (props) => {
    const rule = {};
    const holderRule = {};

    rule.backgroundColor = props.useBackgroundColor && getColorString(props.backgroundColor);

    if (props.useMaxWidth) {
      rule.maxWidth = props.widthPx;
      rule.width = '100%';
      rule.display = 'inline-block';

      holderRule.textAlign = props.contentHorizontal;
    }

    rule.padding = props.padding;
    rule.borderRadius = props.useCorners && props.corners;

    if (props.useBorder) {
      Utils.applyBorders(rule, props.border);
    }

    return {
      container: rule,
      holder: holderRule
    };
  },
  getIdentifierLabel: (props) => {
    let str = '';

    if (props.useMaxWidth) {
      str += props.widthPx + 'px';
    } else {
      str += 'Full';
    }

    str += ' | ';

    if (props.useBackgroundColor) {
      str += getColorString(props.backgroundColor);
    } else {
      str += 'transparent';
    }

    return str;
  }
};