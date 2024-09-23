import { NativeEventEmitter, NativeModules } from 'react-native';
import { Observable } from 'rxjs';

const { RNNoke } = NativeModules;
const NokeEmitter = new NativeEventEmitter(RNNoke);

export const onEvent = function (eventName, callback) {
  return NokeEmitter.addListener(eventName, callback);
};

export const onEventOnce = function (eventName, callback) {
  const subscription = onEvent(eventName, (...args) => {
    callback(...args);
    subscription.remove();
  });
  return subscription;
};

export const offEvent = function (subscription) {
  if (subscription?.remove) {
    subscription.remove();
  }
};

export const removeAllListeners = function (eventName) {
  return NokeEmitter.removeAllListeners(eventName);
};

export const fromNokeEvents = () => {
  if (!Observable) {
    return {
      message: 'Missing rxjs'
    };
  }

  const events = [
    'onServiceConnected',
    'onNokeDiscovered',
    'onNokeConnecting',
    'onNokeConnected',
    'onNokeSyncing',
    'onNokeUnlocked',
    'onNokeDisconnected',
    'onNokeShutdown',
    'onBluetoothStatusChanged',
    'onError'
  ];

  let lastEvent = '';

  return new Observable((observer) => {
    onEvent('onServiceConnected', (data) => {
      observer.next({
        name: 'onServiceConnected',
        data
      });
      lastEvent = 'onServiceConnected';
    });
    
    onEvent('onNokeDiscovered', (data) => {
      observer.next({
        name: 'onNokeDiscovered',
        data
      });
      lastEvent = 'onNokeDiscovered';
    });

    onEvent('onNokeConnecting', (data) => {
      observer.next({
        name: 'onNokeConnecting',
        data
      });
      lastEvent = 'onNokeConnecting';
    });

    onEvent('onNokeConnected', (data) => {
      //clearTimeout(timer)
      if (lastEvent !== 'onNokeUnlocked') {
        observer.next({
          name: 'onNokeConnected',
          data
        });
        lastEvent = 'onNokeConnected';
      }
    });

    onEvent('onNokeSyncing', (data) => {
      observer.next({
        name: 'onNokeSyncing',
        data
      });
      lastEvent = 'onNokeSyncing';
    });

    onEvent('onNokeUnlocked', (data) => {
      //clearTimeout(timer)
      observer.next({
        name: 'onNokeUnlocked',
        data
      });
      lastEvent = 'onNokeUnlocked';
    });

    onEvent('onNokeDisconnected', (data) => {
      observer.next({
        name: 'onNokeDisconnected',
        data
      });
      lastEvent = 'onNokeDisconnected';
    });

    onEvent('onNokeShutdown', (data) => {
      observer.next({
        name: 'onNokeShutdown',
        data
      });
      lastEvent = 'onNokeShutdown';
    });

    onEvent('onError', (data) => {
      observer.next({
        name: 'onError',
        data
      });
      lastEvent = 'onError';
    });
  });
};
