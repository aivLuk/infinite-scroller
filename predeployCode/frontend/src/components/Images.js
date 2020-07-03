import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';

import styles from './Images.module.css';

class Images extends Component {
    state = {
        images: [],
        page: 1
    }

    componentDidMount() {
        const page = this.state.page;
        axios.get(`https://infinite-scroller3.herokuapp.com/photos?page=${page}`)
            .then(res => this.setState({ images: res.data }))
    }

    fetchImages = () => {
        const page = this.state.page;
        this.setState({ page: page + 1 });
        const newPage = this.state.page;
        axios.get(`https://infinite-scroller3.herokuapp.com/photos?page=${newPage}`)
            .then(res => this.setState({ images: this.state.images.concat(res.data) }))
    }

    sortImages = () => {
        const copiedImages = [...this.state.images];
        copiedImages.sort((a, b) => (a.author >= b.author) ? 1 : -1)
        this.setState({ images: copiedImages })
    }

    render() {
        return (
            <div>
                <div className={styles.sortBtn} onClick={this.sortImages}>SORT ALPHABETICALLY</div>
                <div className={styles.images}>
                    <InfiniteScroll
                        dataLength={this.state.images.length}
                        next={this.fetchImages}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}>
                        {this.state.images.map(img => (
                            <div className={styles.imgContainer}>
                                <Image key={img.id} image={img} />
                                <p>{img.author}</p>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>

        );
    }

}

export default Images;