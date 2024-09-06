import React from 'react';
import { Provider } from 'react-redux';  // Import Redux provider
import store from '../helper/store';  // Import the Redux store
import BitcoinWidget from '../components/BitcoinWidget';  // Import the BitcoinWidget component
import { SafeAreaView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <BitcoinWidget />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10
  },
});

export default App;
