import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectImageAction, searchMediaAction, selectVideoAction , searchPhotoAction, searchVideoAction} from '../actions/mediaActions';
import PhotoPage from '../components/PhotoPage';
import VideoPage from '../components/VideoPage';
import '../styles/style.css';
// import { flickrImages, shutterStockVideos } from '../Api/api';

// MediaGalleryPage Component
class MediaGalleryPage extends Component {
  constructor() {
    super();
    // this.handleSearch = this.handleSearch.bind(this);
    //this.handleSelectImage = this.handleSelectImage.bind(this);
    // this.handleSelectVideo = this.handleSelectVideo.bind(this);
  }

  // Dispatches *searchMediaAction*  immediately after initial rendering.
  componentDidMount() {
    this.props.dispatch(searchPhotoAction('rain'));
    this.props.dispatch(searchVideoAction('rain'));
  }

  // Dispatches *selectImageAction* when any image is clicked
  handleSelectImage = (selectedImage) => {
    const { dispatch } = this.props;
    dispatch(selectImageAction(selectedImage));
  }

  // Dispatches *selectVideoAction* when any video is clicked
  handleSelectVideo = (selectedVideo) => {
    this.props.dispatch(selectVideoAction(selectedVideo));
  }

  // Dispatches *searchMediaAction* with query param. But only if query param is provided.
  handleSearch = (event) => {
    console.log('hi');
    event.preventDefault();
    if (this.query !== null) {
      this.props.dispatch(searchVideoAction(this.query.value));
      this.props.dispatch(searchPhotoAction(this.query.value));
      this.query.value = '';
    }
  }

  render() {
    const { images, selectedImage, videos, selectedVideo } = this.props;
    return (
      <div className="container-fluid">
        {images && selectedImage && videos && selectedVideo ? <div>
          <input
            type="text"
            ref={ref => (this.query = ref)}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value="Search Library"
            onClick={(event) => this.handleSearch(event)}
          />
          <div className="row">
            <PhotoPage
              images={images}
              selectedImage={selectedImage}
              onHandleSelectImage={this.handleSelectImage}
            />
            <VideoPage
              videos={videos}
              selectedVideo={selectedVideo}
              onHandleSelectVideo={this.handleSelectVideo}
            />
          </div>
        </div> : 'No results found...'}
      </div>
    );
  }
}

// Define PropTypes
MediaGalleryPage.propTypes = {
  images: PropTypes.array,
  selectedImage: PropTypes.object,
  videos: PropTypes.array,
  selectedVideo: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

// Subscribe component to redux store and merge the state into component's props
const mapStateToProps = ({ images, videos }) => ({
  images: images[0],
  selectedImage: images.selectedImage,
  videos: videos[0],
  selectedVideo: videos.selectedVideo
});

// Connect method from react-router connects the component with redux store
export default connect(mapStateToProps)(MediaGalleryPage);