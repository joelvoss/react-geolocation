import React from 'react';
import * as PropTypes from 'prop-types';

/**
 * Geolocation Component
 * 
 * This component querys the native browser geolocation api for the current
 * position of the user. The following options can be set as props:
 *  - enableHighAccuracy: Higher accuracy, but slower and power consuming.
 *  - maximumAge: Defines how old the cached position is allowed to be before returning a new position.
 *  - timeout: Time before the query times out.
 *  - watch: Defines if the geolocation should be watched.
 *  - errorMessages: Array of error messages corrensponding to the three error codes (1, 2, 3).
 *  - onChange: Subscription callback, which gets called every time the location changes or an error is thrown.
 */
class Geolocation extends React.PureComponent {
  // Components propTypes
  static propTypes = {
    enableHighAccuracy: PropTypes.bool,
    maximumAge: PropTypes.number,
    timeout: PropTypes.number,
    watch: PropTypes.bool,
    errorMessages: PropTypes.array,
    onChange: PropTypes.func
  };
  // Components default props
  static defaultProps = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 5000,
    watch: true,
    errorMessages: [
      `Geolokalisierung nicht möglich!
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation" target="_blank">(mehr erfahren)</a>`,
      `Geolokalisierung fehlgeschlagen.`,
      `Geolokalisierung fehlgeschlagen (Zeitüberschreitung)`
    ],
    onChange: null
  };

  // Components state
  state = {
    loading: false,
    position: null,
    error: null
  };

  /**
   * When the component mounts, get current geolocation or watch it, depending on the settings.
   * If no geolocation provider is available, throw an error.
   * @returns {void}
   */
  componentDidMount() {
    this.provider = typeof navigator !== 'undefined' && navigator.geolocation;

    if (!this.provider) {
      this.onError({ code: 2 });
      return;
    }

    this.setState({ loading: true });

    const options = {
      enableHighAccuracy: this.props.enableHighAccuracy,
      maximumAge: this.props.maximumAge,
      timeout: this.props.timeout
    };

    if (this.props.watch) {
      this.watchId = this.provider.watchPosition(this.onSuccess, this.onError, options);
    } else {
      this.provider.getCurrentPosition(this.onSuccess, this.onError, options);
    }
  }

  /**
   * When the component unmounts, clear the geolocation listener,
   * if we are watching the current geolocation.
   * @returns {void}
   */
  componentWillUnmount() {
    if (this.props.watch) {
      this.provider.clearWatch(this.watchId);
    }
  }

  /**
   * When the component updates, call the onChange prop, if it is
   * provided.
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('rerender Geolocation', this.state);
    if (
      (this.props.onChange && prevState.loading !== this.state.loading) ||
      prevState.position !== this.state.position ||
      prevState.error !== this.state.error
    ) {
      this.props.onChange({ ...this.state });
    }
  }

  /**
   * On success handler.
   * Sets loading to false, error to null and position to the position object.
   * @returns {void}
   */
  onSuccess = position => {
    this.setState({ loading: false, position, error: null });
  };

  /**
   * On error handler.
   * Sets loading to false, position to null and the error to one
   * of the error messages.
   * @returns {void}
   */
  onError = err => {
    this.setState({
      loading: false,
      position: null,
      error: this.props.errorMessages[err.code - 1]
    });
  };

  /**
   * We dont render anything
   * @returns {null}
   */
  render() {
    return null;
  }
}

export default Geolocation;
