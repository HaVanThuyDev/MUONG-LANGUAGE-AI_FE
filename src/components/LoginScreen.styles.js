import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
  },
  loginContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loginLogo: {
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#B45309',
    marginBottom: 32,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginBtn: {
    backgroundColor: '#92400E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});