import { StyleSheet, Platform } from 'react-native';

const BROWN = '#92400E';
const GRAY = '#6B7280';
const GRAY_LIGHT = '#F3F4F6';
const BORDER = '#E5E7EB';
const WHITE = '#FFFFFF';
const CREAM = '#FEF3C7';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  // SafeAreaView chỉ bọc header để tránh notch/status bar
  safeTop: {
    backgroundColor: WHITE,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 10,
  },
  headerInfo: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: '700',
    color: BROWN,
    letterSpacing: 0.2,
  },
  brandSub: {
    fontSize: 11,
    color: GRAY,
    marginTop: 1,
  },
  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
  },
  logoutText: {
    color: GRAY,
    fontSize: 12,
    fontWeight: '500',
  },

  // Region selector
  regionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  regionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: GRAY_LIGHT,
  },
  regionBtnActive: {
    backgroundColor: BROWN,
  },
  regionText: {
    fontSize: 13,
    color: GRAY,
    fontWeight: '500',
  },
  regionTextActive: {
    color: WHITE,
    fontWeight: '600',
  },

  // Chat area
  chat: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatContent: {
    paddingBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 60,
    lineHeight: 22,
  },

  // Message rows
  msgRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
    gap: 8,
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  msgRowAi: {
    justifyContent: 'flex-start',
  },
  avatarImg: {
    borderRadius: 14,
    backgroundColor: CREAM,
  },

  // Bubbles
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleUser: {
    backgroundColor: BROWN,
    borderBottomRightRadius: 4,
  },
  bubbleAi: {
    backgroundColor: WHITE,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  msgText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#111827',
  },
  msgTextUser: {
    color: WHITE,
  },

  // Term tags
  tag: {
    marginTop: 6,
    backgroundColor: CREAM,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 11,
    color: BROWN,
    fontWeight: '500',
  },

  // Typing dots
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },

  // Input area
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    maxHeight: 120,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
    padding: 0,
    margin: 0,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BROWN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
  typingDot: {
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: '#9CA3AF',
},
  sendText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 18,
  },

  typingWrap: {
  backgroundColor: 'transparent',
  borderWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  paddingVertical: 6,
  paddingHorizontal: 4,
}

});
