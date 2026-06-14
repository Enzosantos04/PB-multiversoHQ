import { StyleSheet, Platform } from 'react-native';

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#9896b0',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#12121a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1c1c2e',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  input: {
    backgroundColor: '#0a0a0f',
    borderWidth: 1,
    borderColor: '#1c1c2e',
    borderRadius: 10,
    color: '#e8e6f0',
    fontSize: 15,
    marginBottom: 12,
    height: 52,
    paddingHorizontal: 14,
    paddingVertical: 0,
    textAlignVertical: 'center',

    ...Platform.select({
      ios: {
        paddingVertical: 14,
        paddingHorizontal: 14,
        height: 50,
      },
      android: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        height: 52,
        textAlignVertical: 'center',
      },
    }),
  },
  error: {
    color: '#f87171',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#dc2626',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default registerStyles;
