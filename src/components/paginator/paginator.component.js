import React, { Component } from 'react';

class Paginator extends Component {
    constructor(props) {
        super(props);

        this.state = { current: 1 };
    }

    onPageClicked = (page) => {
        this.setState({ current: page });
        this.props.onPageClicked(page);
    }

    renderPages = () => {
        const items = [];

        for (let i = 0; i < this.props.pages; i++) {
            const page = i + 1;

            items.push(
                <li className={`page-item`} key={i}>
                    <a className={`page-link ${page === this.state.current ? 'text-white bg-danger' : 'text-danger'}`} style={{ cursor: 'pointer' }} onClick={() => this.onPageClicked(page)}>{page}</a>
                </li>
            );
        }

        return items;
    }

    render() {
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {this.renderPages()}
                </ul>
            </nav>
        );
    }
};

export default Paginator;