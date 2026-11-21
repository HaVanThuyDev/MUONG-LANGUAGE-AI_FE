import { StyleSheet, Platform } from 'react-native';

const CLAUDE_TEXT = '#2E2C29';
const CLAUDE_MUTED = '#78756E';
const CLAUDE_BORDER = '#E5E3DD';
const CLAUDE_TERRACOTTA = '#C2673B';

export default StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#FBFBF9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loginCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      },
    }),
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 14,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: CLAUDE_TEXT,
    marginBottom: 4,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 13,
    color: CLAUDE_MUTED,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 320,
  },

  // SEGMENTED TABS WITH SLIDING INDICATOR
  authTabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#F3F2EE',
    borderRadius: 10,
    padding: 3,
    marginTop: 18,
    marginBottom: 18,
    position: 'relative',
    height: 40,
    alignItems: 'center',
  },
  slidingPill: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  authTabBtn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  authTabText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: CLAUDE_MUTED,
  },
  authTabTextActive: {
    fontWeight: '600',
    color: CLAUDE_TEXT,
  },

  // SUB-MODE: TÊN ĐĂNG NHẬP / SỐ ĐIỆN THOẠI
  methodToggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 14,
  },
  methodToggleText: {
    fontSize: 12.5,
    color: CLAUDE_MUTED,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  methodToggleTextActive: {
    color: CLAUDE_TERRACOTTA,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // FORM GROUPS
  formContainer: {
    width: '100%',
  },
  formGroup: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 12.5,
    color: '#44403C',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    color: CLAUDE_TEXT,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
  },

  // PRIMARY BUTTON
  submitBtn: {
    backgroundColor: CLAUDE_TERRACOTTA,
    borderRadius: 9,
    paddingVertical: 11,
    width: '100%',
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14.5,
  },

  // DIVIDER
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: CLAUDE_BORDER,
  },
  dividerText: {
    fontSize: 12,
    color: '#A8A29E',
  },

  // GOOGLE LOGIN BUTTON
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: CLAUDE_BORDER,
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
    width: '100%',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      },
    }),
  },
  googleBtnText: {
    color: CLAUDE_TEXT,
    fontSize: 13.5,
    fontWeight: '500',
  },

  // GUEST EXPERIENCE LINK
  guestLink: {
    marginTop: 16,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  guestLinkText: {
    fontSize: 12.5,
    color: CLAUDE_MUTED,
    textDecorationLine: 'underline',
  },
});
