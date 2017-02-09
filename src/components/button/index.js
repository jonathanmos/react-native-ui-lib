import React, {PropTypes} from 'react';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {BaseComponent} from '../../commons';
import {Colors, Typography, ThemeManager} from '../../style';

/**
 * Basic button component
 */
export default class Button extends BaseComponent {
  static displayName = 'Button';
  static propTypes = {
    /**
     * Text to show inside the button
     */
    label: PropTypes.string,
    /**
     * Actions handler
     */
    onPress: PropTypes.func,
    /**
     * Disable interactions for the component
     */
    disabled: PropTypes.bool,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
    /**
     * Additional styles for label text
     */
    labelStyle: PropTypes.object,
    /**
     * Control shadow visibility
     */
    enableShadow: PropTypes.bool, // iOS-only
    /**
     * Use to identify in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: {},
    labelStyle: {},
  };

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    const shadowStyle = enableShadow ? this.styles.shadowStyle : {};
    const {label, onPress, disabled, containerStyle, labelStyle, enableShadow, testId} = this.props;
    return (
      <TouchableOpacity
        style={[this.styles.container, shadowStyle, disabled && this.styles.disabled, containerStyle]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[this.styles.text, labelStyle]} testID={testId}>
          {Constants.isAndroid ? _.toUpper(label) : label}
        </Text>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: ThemeManager.CTABackgroundColor,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      height: 54,
      borderRadius: Platform.OS === 'ios' ? 27 : 3,
      minWidth: 160,
    },
    shadowStyle: {
      shadowColor: '#3082C8',
      shadowOffset: {height: 5, width: 0},
      shadowOpacity: 0.35,
      shadowRadius: 9.5,
    },
    text: {
      flex: 0,
      flexDirection: 'row',
      color: ThemeManager.CTATextColor,
      ...Typography.text70,
      fontWeight: '100',
    },
    disabled: {
      backgroundColor: Colors.dark60,
    },
  });

  return styles;
}
