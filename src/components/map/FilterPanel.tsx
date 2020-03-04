import * as React from 'react';
import * as easings from 'd3-ease';
import { cloneDeep } from 'lodash';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import { Spring, animated } from 'react-spring/renderprops';

import { Button } from '../../shared/components/Button';
import { Checkbox } from '../../shared/components/Checkbox';

interface FilterPanelProps {
  filters: any;
  onApplyFilters: (filters) => void;
}

interface FilterPanelState {
  parent: any;
  filters: any;
  isOpen: boolean;
}

export class FilterPanel extends React.Component<FilterPanelProps, FilterPanelState> {

  constructor(props) {
    super(props);

    this.state = {
      parent: null,
      isOpen: false,
      filters: cloneDeep(props.filters)
    };
  }

  componentDidMount() {
    const parent = ReactDOM.findDOMNode(this).parentNode;

    this.setState({
      parent
    });
  }

  getFilters = () => {
    return [
      {
        label: 'Unidad de Negocio',
        value: 'unidad',
        filters: [
          { label: 'Calsa', value: 'calsa' },
          { label: 'No Calsa', value: 'no calsa' }
        ]
      },
      {
        label: 'Clasificacion',
        value: 'clasificacion',
        filters: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' }
        ]
      }
    ];
  };

  onSetFilter = (e) => {
    const { filters } = this.state;
    const [filter, subfilter] = e.target.name.split('-');

    if (!filters[filter].includes(subfilter)) {
      filters[filter].push(subfilter);
    } else {
      filters[filter] = filters[filter].filter(f => f !== subfilter);
    }

    this.setState({
      filters
    });
  };

  render() {
    const { onApplyFilters } = this.props;
    const { parent, isOpen, filters } = this.state;

    if (!parent) {
      return <div/>;
    }

    const height = parent.offsetHeight;

    return (
      <Spring
        native
        from={{
          left: '10px',
          bottom: '10px',
          width: 55,
          height: '55px',
          borderTopRightRadius: '5px',
          opacity: 1
        }}
        to={{
          left: isOpen ? '0px' : '10px',
          bottom: isOpen ? '0px' : '10px',
          width: isOpen ? 410 : 55,
          height: isOpen ? `${height}px` : '55px',
          borderTopRightRadius: isOpen ? '20px' : '5px',
          opacity: isOpen ? 0 : 1
        }}
        config={{ duration: 500, easing: easings.easeSinOut }}
      >
        {({ left, bottom, width, height, borderTopRightRadius, opacity }) => (
          <animated.div
            style={{ left, bottom, width: (width as any).interpolate(w => `${w}px`), height, borderTopRightRadius }}
            className={classnames('FilterPanel', isOpen ? 'opened' : '')}
            onClick={isOpen ? () => {
            } : () => this.setState({ isOpen: true })}>
            <animated.svg style={{ opacity }}>
              <use xlinkHref={'/images/sprite.svg#icon-filter'}></use>
            </animated.svg>
            {isOpen && (
              <animated.div
                style={{ opacity: (width as any).interpolate([55, 200, 410], [0, 0, 1]).interpolate(o => o) }}
                className='InnerPanel'>
                <div className='Filters'>
                  <div className='header'>
                    <div>Filtrar</div>
                    <div className='close' onClick={!isOpen ? () => {
                    } : () => this.setState({ isOpen: false, filters: cloneDeep(this.props.filters) })}>X
                    </div>
                  </div>
                  <div>
                    {this.getFilters().map(f => (
                      <div className='filterTitle' key={f.value}>
                        {f.label}
                        <div className='FilterSubtitleWrapper'>
                          {f.filters.map(sf => (
                            <Checkbox
                              key={sf.value}
                              name={`${f.value}-${sf.value}`}
                              label={sf.label}
                              checked={filters[f.value].includes(sf.value)}
                              onChange={this.onSetFilter}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button fluid type='secondary' size='medium' onClick={() => onApplyFilters(filters)}>Aplicar Filtros</Button>
              </animated.div>
            )}
          </animated.div>
        )}
      </Spring>
    );
  }
}
