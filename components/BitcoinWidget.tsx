import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBitcoinPrice } from '../helper/bitcoinSlice';
import { RootState } from '../helper/store';

const BitcoinWidget = () => {
  const dispatch = useDispatch();
  const bitcoinPrice = useSelector((state: RootState) => state.bitcoin.bitcoinPrice);
  const lastUpdated = useSelector((state: RootState) => state.bitcoin.lastUpdated);
  const error = useSelector((state: RootState) => state.bitcoin.error);


  const [usdAmount, setUsdAmount] = useState<string>('1');
  const [btcAmount, setBtcAmount] = useState<string>('--');

  useEffect(() => {
    dispatch(fetchBitcoinPrice());
  }, [dispatch]);

  useEffect(() => {
    if (bitcoinPrice) {
      setBtcAmount((parseFloat(usdAmount.replace(/,/g, '')) / bitcoinPrice).toFixed(6));
    }
  }, [bitcoinPrice, usdAmount]);

  const handleInputChange = (value: string) => {

    const numericValue = parseFloat(value.replace(/,/g, ''));

 
    const formattedValue = numericValue.toLocaleString();
    setUsdAmount(formattedValue);


    if (bitcoinPrice && numericValue) {
      setBtcAmount((numericValue / bitcoinPrice).toFixed(6));
    } else {
      setBtcAmount('--');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin Price Widget</Text>
      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 30, marginVertical: 10}}>
            <View style={{display: 'flex', flexDirection: 'column', backgroundColor: '#0093E9' , padding: 10, borderRadius: 6}} >
                <Text style={styles.price}>
                    Current Price: 
                </Text>
                <Text style={styles.value}>{bitcoinPrice ? `$${bitcoinPrice.toLocaleString()}` : '--'}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'column',backgroundColor: '#0093E9', padding: 5, borderRadius: 6}}>
                <Text style={styles.price}>
                    Last Updated: 
                </Text>
                <Text style={styles.value}>{lastUpdated || '--'}</Text>
            </View>
            
          </View>
          <Text style={styles.converted}>
            Enter amoun in USD below:
          </Text>
          <TextInput
            style={styles.input}
            value={usdAmount}
            onChangeText={handleInputChange}
            placeholder="Enter USD"
            keyboardType="numeric"
            
          />

          <Text style={styles.converted}>
            Converted BTC:
          </Text>
          <TextInput
            style={styles.input}
            value={btcAmount}
            editable={false}            
          />
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 450,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginVertical: 10,
    color: '#FFFFFF'
  },
  timestamp: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '70%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  converted: {
    fontSize: 16,
  },
  value: {
    color: '#FFFFFF'
  },
  error: {
    color: 'red',
  },
});

export default BitcoinWidget;
